import { readFileSync } from "fs"
import type { RegisterHooksOptions } from "module"
import { fileURLToPath } from "url"

/** Resolver hook that looks for `.{ts,tsx,jsx}` when `.js` is not found. */
export const tryAltExts: RegisterHooksOptions = {

  resolve: (spec, ctx, next) => {

    const trySpec = (spec: string) => {
      try { return next(spec, ctx) }
      catch (e: any) {
        if (e.code !== 'ERR_MODULE_NOT_FOUND') throw e
        return null
      }
    }

    return (
      trySpec(spec) ??
      trySpec(spec.replace(/\.js(\?|$)/, '.ts$1')) ??
      trySpec(spec.replace(/\.js(\?|$)/, '.tsx$1')) ??
      trySpec(spec.replace(/\.js(\?|$)/, '.jsx$1')) ??
      next(spec, ctx)
    )

  },

}

/**
 * Loader hook for JSX/TSX files which just passes the
 * source code and file URL to your function to compile.
 */
export function compileJsx(fn: (src: string, url: string) => string): RegisterHooksOptions {
  return {

    load: (url, context, next) => {
      const istsx = url.match(/\.tsx(\?|$)/)
      const isjsx = url.match(/\.jsx(\?|$)/)
      if (!isjsx && !istsx) return next(url, context)

      let source: string
      try { source = next(url, context).source!.toString() }
      catch (e: any) {
        if (e.code !== 'ERR_UNKNOWN_FILE_EXTENSION') throw e
        source = readFileSync(fileURLToPath(url), 'utf8')
      }

      return {
        source: fn(source, url),
        format: 'module',
        shortCircuit: true,
      }
    }

  }
}

/**
 * Remaps the given import module specifier to another.
 * 
 * For example:
 * 
 * ```ts
 * import { hooks } from 'immaculata'
 * import { registerHooks } from 'module'
 * registerHooks(hooks.mapImport('react/jsx-runtime', 'immaculata/jsx-strings.js'))
 * ```
 */
export function mapImport(from: string, to: string): RegisterHooksOptions {
  return {
    resolve: (spec, ctx, next) => {
      if (spec === from) spec = to
      return next(spec, ctx)
    }
  }
}
