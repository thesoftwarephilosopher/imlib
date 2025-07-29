import * as fs from 'fs'
import * as path from 'path'

/**
 * Creates dirs and files on disk at the given
 * subroot based on the given file map.
 * 
 * Paths are absolute, and made relative to `outDir`.
 * 
 * * `opts?.parent` defaults to cwd
 * * `opts?.dry` defaults to false
 * * `opts?.dir` defaults to `"docs"`
 * 
 * ```typescript
 * import { generateFiles } from 'immaculata'
 * 
 * generateFiles(new Map([
 *   ['/index.html', 'hello world'],
 *   ['/about.html', 'about my site'],
 *   ['/css/main.css', 'body{...}'],
 * ]))
 * 
 * // writefile: docs/index.html
 * // writefile: docs/about.html
 * // mkdir: docs/css
 * // writefile: docs/css/main.css
 * ```
 */
export function generateFiles(out: Map<string, { content: Buffer | string }>, opts?: {
  parent?: string,
  dry?: boolean,
  dir?: string,
}) {
  const dry = opts?.dry ?? false
  const outDir = opts?.dir ?? 'docs'
  const parent = opts?.parent ?? ''

  const madeDirs = new Set<string>()
  const mkdirIfNeeded = (dir: string) => {
    if (madeDirs.has(dir)) return
    madeDirs.add(dir)
    console.log('mkdir    ', dir)
    if (!dry) fs.mkdirSync(dir)
  }

  for (const [filepath, { content }] of out) {
    const relfile = path.join(outDir, filepath)
    const parts = relfile.split(path.sep)
    for (let i = 1; i < parts.length; i++) {
      const dir = path.join(parent, ...parts.slice(0, i))
      mkdirIfNeeded(dir)
    }

    const absfile = path.join(parent, relfile)
    console.log('writefile', absfile)
    if (!dry) fs.writeFileSync(absfile, content)
  }
}
