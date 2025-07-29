import { EventEmitter } from "events"
import * as fs from "fs"
import type { RegisterHooksOptions } from "module"
import * as posix from "path/posix"
import { relative } from "path/posix"
import { fileURLToPath, pathToFileURL } from "url"

/**
 * `path` always the same as its key in the map
 * 
 * `content` always a buffer (see `Pipeline`)
 * 
 * `version` increments with changes for decaching
 * 
 * `requiredBy` is used for invalidation
 */
export type TreeFile = {
  path: string,
  content: Buffer,
  version: number,
  requiredBy: (requiredBy: string) => void,
}

export type ShouldExcludeFile = (path: string, stat: fs.Stats) => any
export type FileTreeChange = { path: string, change: 'add' | 'dif' | 'rem' }

export class FileTree {

  /** The full file URL, i.e. `parentDir` + `path`. Never ends with `'/'` */
  public root: string
  private exclude?: ShouldExcludeFile | undefined

  /**
   * A list of all files (recursively) at the given path.
   * 
   * ```ts
   * const tree = new FileTree('site', import.meta.dirname)
   * 
   * // if cwd contains:
   * //   ./site/index.html
   * //   ./site/about.html
   * //   ./site/pages/welcome.md
   * //   ./site/styles/main.css
   * 
   * assertMatches(tree.files, {
   *   '/index.html':       { path: '/index.html',       content: Buffer },
   *   '/about.html':       { path: '/about.html',       content: Buffer },
   *   '/pages/welcome.md': { path: '/pages/welcome.md', content: Buffer },
   *   '/styles/main.css':  { path: '/styles/main.css',  content: Buffer },
   * })
   * ```
   */
  public files = new Map<string, TreeFile>();

  /**
   * Loads the tree from disk into memory immediately.
   * 
   * @param path e.g. `"site"` or `"."`
   * @param parentDir usually `import.meta.dirname`
   * @param opts 
   */
  public constructor(path: string, parentDir: string, opts?: {
    exclude?: ShouldExcludeFile,
  }) {
    const filePath = posix.join(parentDir, path)
    this.root = pathToFileURL(filePath).href.replace(/\/+$/, '')
    this.exclude = opts?.exclude
    this.loadDir('/')
  }

  private loadDir(base: string, meta?: { changes: FileTreeChange[], invalidated: Set<string> }) {
    const dirRealPath = this.realPathFor(base)
    const files = fs.readdirSync(dirRealPath)
    for (const name of files) {
      const normalizedPath = posix.join(base, name)
      const realFilePath = posix.join(dirRealPath, name)
      const stat = fs.statSync(realFilePath)
      this.maybeAdd(normalizedPath, stat, meta)
    }
  }

  private maybeAdd(path: string, stat: fs.Stats, meta?: { changes: FileTreeChange[], invalidated: Set<string> }) {
    if (stat.isDirectory()) {
      if (this.exclude?.(path + '/', stat)) return
      this.loadDir(path, meta)
    }
    else if (stat.isFile()) {
      if (this.exclude?.(path, stat)) return
      this.createFile(path, meta)
    }
  }

  private createFile(path: string, meta?: { changes: FileTreeChange[], invalidated: Set<string> }) {
    const content = fs.readFileSync(this.realPathFor(path))
    const existing = this.files.get(path)
    if (existing) {
      if (content.equals(existing.content)) {
        return
      }
      meta?.changes.push({ path, change: 'dif' })
    }
    else {
      meta?.changes.push({ path, change: 'add' })
    }

    this.invalidateModule(path, meta?.invalidated)

    const version = Date.now()
    const requiredBy = (by: string) => this.addDependency(by, path)
    this.files.set(path, { path, content, version, requiredBy })
  }

  private moduleInvalidated = new EventEmitter()

  private invalidateModule(path: string, invalidated?: Set<string>) {
    // No way to delete it from module cache yet
    // See https://github.com/nodejs/node/issues/57696

    if (invalidated?.has(path)) return
    invalidated?.add(path)

    this.fsevents?.emit('moduleInvalidated', path)
    this.moduleInvalidated.emit(path)
  }

  /**
   * Calls `fn` once when the module is invalidated, directly or indirectly.
   * 
   * * Requires `moduleHooks()` to be registered first.
   * * Must be called *from within module*, passing `import.meta.url`.
   */
  public onModuleInvalidated(importMetaUrl: string, fn: () => void) {
    this.moduleInvalidated.once(importMetaUrl.slice(this.root.length).replace(/\?.+/, ''), fn)
  }

  private realPathFor(filepath: string) {
    return fileURLToPath(new URL(filepath.slice(1), this.root + '/'))
  }

  private deps = new Map<string, Set<string>>();

  /**
   * Makes changes to file at `requiring` invalidate module at `requiredBy`.
   * 
   * **NOTE:** You should *not* usually need to call this directly.
   * * It's used internally by [useTree](module-hooks.md#usetree).
   * * It's only made public so you can use it for *non-module* files.
   * * This allows you to invalidate a module when a data file changes.
   */
  public addDependency(requiredBy: string, requiring: string) {
    if (requiredBy.startsWith('file://')) requiredBy = requiredBy.slice(this.root.length)
    requiredBy = requiredBy.replace(/\?ver=\d+$/, '')
    let list = this.deps.get(requiring)
    if (!list) this.deps.set(requiring, list = new Set())
    list.add(requiredBy)
  }

  private pathsUpdated(...paths: string[]) {
    const changes: FileTreeChange[] = []
    const invalidated = new Set<string>()

    for (const filepath of paths) {
      const realPath = this.realPathFor(filepath)
      const stat = fs.existsSync(realPath) ? fs.statSync(realPath) : undefined

      if (stat) {
        this.maybeAdd(filepath, stat, { changes, invalidated })
      }
      else {
        if (this.files.delete(filepath)) {
          changes.push({ path: filepath, change: 'rem' })
        }
        this.files.keys().forEach(path => {
          if (path.startsWith(filepath + '/')) {
            changes.push({ path, change: 'rem' })
            this.files.delete(path)
          }
        })
      }
    }

    const resetSeen = new Set<string>()
    for (const change of changes) {
      this.resetDepTree(change.path, resetSeen, invalidated)
    }

    return changes
  }

  private resetDepTree(path: string, seen: Set<string>, invalidated: Set<string>) {
    if (seen.has(path)) return
    seen.add(path)

    for (const [requiring, requiredBy] of this.deps) {
      if (path.startsWith(requiring)) {
        this.deps.delete(requiring)
        for (const dep of requiredBy) {
          const file = this.files.get(dep)!
          file.version = Date.now()
          this.invalidateModule(dep, invalidated)
          this.resetDepTree(dep, seen, invalidated)
        }
      }
    }
  }

  private fsevents?: EventEmitter<{
    filesUpdated: [changes: FileTreeChange[]],
    moduleInvalidated: [path: string],
  }>

  /**
   * Begins watching the path recursively for changes, and updates the contents of `files`.
   * 
   * May be called more than once, which are no-ops that just return the same `EventEmitter`.
   * 
   * * `filesUpdated` for detailed list of *any* file changes, including non-modules
   * * `moduleInvalidated` called *before* `filesUpdated` on *each* module that was invalidated
   * 
   * Uses `fs.watch` internally; groups multiple fs events into one via `debounce` (default `100` ms).
   */
  public watch(debounce = 100) {
    if (!this.fsevents) {
      const fsevents = this.fsevents = new EventEmitter()

      const updatedPaths = new Set<string>()
      let reloadFsTimer: NodeJS.Timeout

      fs.watch(fileURLToPath(this.root), { recursive: true }, ((type, filename) => {
        if (!filename) return
        const normalized = '/' + filename.split(posix.win32.sep).join(posix.posix.sep)

        updatedPaths.add(normalized)

        clearTimeout(reloadFsTimer)
        reloadFsTimer = setTimeout(async () => {
          try {
            const changes = this.pathsUpdated(...updatedPaths)
            if (changes.length > 0) fsevents.emit('filesUpdated', changes)
            updatedPaths.clear()
          }
          catch (e) {
            console.error(e)
          }
        }, debounce)
      }))
    }

    return this.fsevents
  }

  /**
   * This actually has two different but inherently correlated purposes:
   * 
   * * Module invalidation
   * * Loading from memory
   * 
   * Returns a hook that hooks into Node.js's
   * built in `import` and `require`
   * and returns the contents from [tree.files](filetree.md#files)
   * instead of loading from disk.
   * 
   * A query string including the current version of the file
   * is appended to the import path to enable cache busting,
   * so that when a file changes under the tree, it can be
   * imported again, and will be re-run.
   * 
   * This cache invalidation also extends to any file that
   * has required the file that has changed, so that there
   * are never stale modules.
   * 
   * ```ts
   * import module from 'node:module'
   * 
   * const tree = new FileTree('site', import.meta.dirname)
   * 
   * module.registerHooks(tree.moduleHooks())
   * 
   * import('site/myfile.js')
   * ```
   */
  moduleHooks(): RegisterHooksOptions {
    return {

      resolve: (spec, context, next) => {
        const got = next(spec, context)

        if (!spec.match(/^(\.|\/|file:\/\/\/)/)) return got

        let path = got.url
        if (!path.startsWith(this.root)) return got

        const found = this.files.get('/' + relative(this.root, path))
        if (!found) return got

        if (context.parentURL?.startsWith(this.root) && !context.parentURL.endsWith('/noop.js')) {
          const depending = context.parentURL.slice(this.root.length)
          const depended = path.slice(this.root.length)
          this.addDependency(depending, depended)
        }

        const newurl = new URL('.' + found.path, this.root + '/')
        newurl.search = `ver=${found.version}`

        return { url: newurl.href, shortCircuit: true }
      },

      load: (url, context, next) => {
        if (url.startsWith(this.root)) {
          url = url.replace(/\?ver=\d+$/, '')

          const found = this.files.get(url.slice(this.root.length))
          if (!found) return next(url, context)

          return {
            shortCircuit: true,
            format: found.path.match(/\.tsx?(\?|$)/) ? 'module-typescript' : 'module',
            source: found.content,
          }
        }
        return next(url, context)
      }

    }
  }

}
