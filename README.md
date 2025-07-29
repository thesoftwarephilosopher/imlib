# Immaculata

*Node.js developer conveniences geared towards web dev*

* Use [Module reloading (HMR) hooks](#module-hmr-in-nodejs) in Node.js's native module system
* Use [JSX module transpilation hooks](#native-jsx-in-nodejs) in Node.js's native module system
* Use [FileTree](src/filetree.ts) to load a file tree from disk into memory
* Use [DevServer](src/dev-server.ts) to serve an in-memory file tree
* Use [generateFiles](src/file-generator.ts) to write an in-memory file tree to disk
* Use [Pipeline](src/pipeline.ts) to conveniently transform an in-memory file tree

# Module HMR in Node.js

```ts
import { FileTree, hooks } from 'immaculata'
import { registerHooks } from 'module'

// keep an in-memory version of file tree under "./src"
const tree = new FileTree('src', import.meta.dirname)

// load modules under "src" from memory
// and add query string to load latest version
registerHooks(tree.moduleHooks())

// keep tree up to date
// and re-import main module when any file changes
tree.watch().on('filesUpdated', doStuff)
doStuff()

// importing modules under 'src' now re-executes them
async function doStuff() {
  const { stuff } = await import("src/dostuff.js")
  // "stuff" is never stale
}
```

# Native JSX in Node.jS

```ts
import { hooks } from 'immaculata'
import { registerHooks } from 'module'

// compile jsx using something like swc or tsc
registerHooks(hooks.compileJsx(compileJsxSomehow))

// remap "react-jsx/runtime" to any import you want (optional)
registerHooks(hooks.mapImport('react/jsx-runtime', 'immaculata/jsx-strings.js'))

// you can now import tsx files!
const { template } = await import('./site/template.tsx')
```

# Comparing immaculata to Vite

Vite and immaculata have somewhat different goals, with a little overlap.

*Caution:* This is a more technical article than most comparison articles you find.

## Philosophies

Vite prefers kitchen sinkness, bundling code and assets, and ease of use.
Aiming for a fast development cycle of cookie cutter front-end websites,
it offers almost every feature you might need in a bundled website,
just in case you use them, and even if you don't.

Immaculata prefers surgicality, vanilla imports and assets, and flexibility.
Aiming for a fast development cycle of custom or experimental websites,
it offers a small set of orthogonal primitives to solve problems,
preferring well engineered solutions even if they take time.

Some of the differences are fundamental. Some are just because immaculata is newer.

## Features

Vite's feature set centers around its decision to bundle everything.

* TypeScript/JSX support
* Bundling of modules and assets
  * Specialized import resolution
  * Specialized front-end shims
  * Specialized HTML scanning
  * Specialized CSS scanning
  * Code splitting probably
* HMR (hot module replacement)
  * Browser-side through shims
  * Node.js-side through a module system built on top of Node's

Immaculata has a few small features that make Node.js more convenient to develop in.

* Node.js [module hooks](../api/module-hooks.md#module-hooks) for
  * [compiling JSX](../api/module-hooks.md#compilejsx)
  * [remapping imports](../api/module-hooks.md#mapimport)
  * [using .ts/tsx/jsx import paths](../api/module-hooks.md#tryaltexts)
  * [loading files from memory](../api/module-hooks.md#usetree)
  * [stale module invalidation](../api/module-hooks.md#usetree)
* [FileTree](../api/filetree.md#filetree) to keep a recursive file tree in memory
  * [fileTree.watch](../api/filetree.md#watch) to auto-update its contents
* [DevServer](../api/dev-server.md#devserver) to serve files from a file map
* [generateFiles](../api/generate-files.md#generatefiles) to write a file map to disk
* [Pipeline](../api/pipeline.md#pipeline) as a convenient way to turn a file tree into a file map
* [jsx-strings](../guides/enabling-jsx.md#simple-jsx-string-builder) to optionally turn JSX into an efficient string builder

## The bundling war

Vite is centered around bundling, citing performance issues when using ESM *nested* imports,
even with HTTP2. At least half of Vite's features and code would disappear if it didn't bundle.

Immaculata does not bundle, offering you two solutions:

* Just accept browser-side ESM imports, which for most of us is plenty fast enough
* Use a function that scans all imports and injects [modulepreloads](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/modulepreload) into the HTML

This gives two main benefits:

* Immaculata's implementation and feature set are both greatly simplified
* You get *much* finer grained control over how to transform local files into your site

## Hot module reloading (HMR)

### Browser-side

Vite offers a kitchen sink, at the cost of scanning all your front-end files for paths.

Immaculata offers *minimal* browser-side HMR support via a triggerable SSE path in [DevServer](../api/dev-server.md#devserver).
Look for `reload()` and `hmrPath` in the docs.

### Node.js-side

Vite offers Node-side HMR, but at the cost of
[*creating an entire module system* on top of Node's](https://github.com/vitest-dev/vitest/blob/165fb0e8ae398440fc62cd95992e1ea97a1d2388/packages/vite-node/src/client.ts).
Internally, it uses `node:vm` to create second-class modules that are somewhat limited in how they are able to participate in Node's native module system.

Immaculata hooks into Node's native module system to create real, first-class modules.
On top of this, it loads them from memory to speed up development,
and issues `filesUpdated` and `moduleInvalidated` events so you can reload your modules via import.
See [Enabling HMR](../guides/enabling-hmr.md#enabling-hmr-in-nodejs).

Incidentally, immaculata actually *also* used to use `node:vm`,
but as of a month or so ago I had an epiphany of how to use Node's
relatively new module hooks (especially the sync variant)
to get all the same benefits but with none of the downsides.


## Dependencies

Vite offers multiple packages, each having multiple dependencies.

Immaculata only depends on `mime-types`, and only for [DevServer](../api/dev-server.md#devserver).


## Complexity

Vite is multiple moderately sized packages.

Immaculata is 487 lines of highly readable and maintainable code.

For perspective, [*all* of immaculata](https://github.com/thesoftwarephilosopher/immaculata/tree/main/src) is smaller than [vite-node's custom module system](https://github.com/vitest-dev/vitest/blob/165fb0e8ae398440fc62cd95992e1ea97a1d2388/packages/vite-node/src/client.ts).


## "Which should I use?"

Use Vite if

* You want to make a cookie cutter front-end
* You want to have an out of the box solution

Use most of immaculata if

* You want to make a highly customized front-end
* You want to have surgical control over your front-end output
* You want to experiment with making bundle-less sites

Use *some* of immaculata if

* You want to use HMR in Node.js for a faster development cycle
* You want to use JSX in Node.js with your own custom implementation
* You want to use JSX in Node.js as a simple string builder
* You want to remap specific imports in Node.js
* You want to write a map of files to disk conveniently
* You want to load a file tree from disk into memory
* You want to serve a map of in-memory files over HTTP


# HMR natively in Node.js (technical write up)

One of the key factors in rapid development is
discarding as little state as possible.
In Node.js, this means the new `--watch` flags
are not that useful, since they throw everything away.
The ideal is to simply invalidate a module when it changes
or when a module it depends on changes.
This way, all imports and data are always fresh,
but only partial module trees get re-evaluated.

Previously, immaculata did the same thing Vite does now:
use the built-in `node:vm` functionality to create
an ad hoc module system that sits on top of Node's,
and glues these systems together using custom logic.
This effectively creates second class modules.

The main drawbacks are that logic is duplicated and separated.
Duplication happens in finding and loading files, parsing them,
evaluating and storing their module objects, and gluing all these
together with each other and with Node's own module system.
And these systems are inherently separate, so that
native Node module hooks will have no effect on the ad hoc system.

By adding module hooks using Node's built-in `node:module` module,
it's now possible to implement "hot module" functionality natively.

First, we load source files from disk and keep them in memory.
This won't hit memory limits for most projects and dev machines.
To handle this need, we have a [FileTree] class,
which does nothing other than load a file tree into memory,
and optionally keep it up to date via [.watch()][watch],
which returns an `EventEmitter` with a `filesUpdated` event.
Node's native file watcher is now disk efficient,
and returns all the information we need,
so we don't need `chokidar` for this.

Next, we have the [useTree] dual-hook which does two key things.
First, it implements a loader hook that returns the source `string`
using `tree.files.get` instead of `fs.readFileSync`.
Second, it implements a resolver hook that appends `?ver=${file.version}`
to the URL of any given module.

What ties all of this together is the fact that
the [FileTree] constructor and the [watch] method
both set each file's `version` to `Date.now()`.
This becomes an automatic query busting string,
which works because Node internally uses URLs
to represent all modules.

In practice, this means that we can import a module file initially,
and import the same file again after the `filesUpdated` event,
and either the cached module object will be returned,
or the file will be re-evaluated if it was updated.

The one missing piece of this puzzle was dependency trees.
Because module hooks are called during import,
we can use this information to register dependencies,
which is done internally within [FileTree].
Each time a dependency of a module changes,
the parent module itself also has its version updated.
This works recursively, so that modules are always fresh,
and updated even if a single deep dependency changes.

The code to use these hooks is relatively short and simple.

```ts
import { FileTree } from "immaculata"
import { useTree } from "immaculata/hooks.js"
import { registerHooks } from 'node:module'

const tree = new FileTree('src', import.meta.dirname)
registerHooks(useTree(tree))

const myModule = await import('src/myModule.js')
// src/myModule.js is executed

const myModule2 = await import('src/myModule.js')
// src/myModule.js is NOT executed a second time

tree.watch().on('filesUpdated', async () => {
  const myModule = await import('src/myModule.js')
  // src/myModule.js IS executed again iff invalidated
})
```

As a consequence of having a dependency tree,
we can easily send a `moduleInvalidated` event
at the same time that we update its `version`.
And because trees are just objects,
we can import them from a module that
needs to cleanup resources on invalidation.

This site uses Shiki for syntax highlighting,
which requires that you use it as a singleton.
Calling its `dispose` method on invalidation
allows me to edit the syntax highlighting file
without having to restart the whole process.
(This code is taken verbatim from this site.)

```ts
import * as ShikiMd from '@shikijs/markdown-it'
import type MarkdownIt from 'markdown-it'
import * as Shiki from 'shiki'
import { tree } from '../../static.ts'

const highlighter = await Shiki.createHighlighter({
  themes: ['dark-plus'],
  langs: ['tsx', 'typescript', 'json', 'yaml', 'bash'],
})

export function highlightCode(md: MarkdownIt) {
  md.use(ShikiMd.fromHighlighter(highlighter, { theme: 'dark-plus' }))
}

tree.onModuleInvalidated(import.meta.url, () => {
  highlighter.dispose()
})
```

[FileTree]: ../api/filetree.md#filetree
[watch]: ../api/filetree.md#watch
[useTree]: ../api/module-hooks.md#usetree


# A new way to vendor

We are close to the future of bundle-less front-end development. ESM modules are
prevalent in browsers. [JSON](https://caniuse.com/?search=import%20type%20json)
and [CSS](https://caniuse.com/?search=import%20type%20css) imports are standard
and almost baseline.

In my 5 years of not using bundles, I've streamlined a way to generate files for
front-ends in the simplest possible way, while maintaining flexibility so that I
don't have to maintain a complex, opinionated framework, which would burn me out.

## Mapping rather than bundling

One of the techniques I came up with is keeping a live in-memory copy of a local
file tree, transforming it to a new file tree representing a front-end website,
and repeating this step if any file changes. So if I have a folder called
`./site/`, which contains HTML, TypeScript, and Sass files, I could copy them to
an out tree, transpiling and renaming as needed:

```ts
import { FileTree, generateFiles } from "immaculata"

const tree = new FileTree('site', import.meta.dirname)

tree.watch().on('filesUpdated', process)
process()

function process() {
  let files = tree.files.values().toArray()
  
  files = files.filter(isTypeScript).forEach(transpileAndRenameTsx)
  files = files.filter(isSass).forEach(transpileAndRenameSass)
  
  const out = new Map(files.map(f => [f.path, f.content]))
  
  server.files = out // update dev server
  generateFiles(out) // or write to disk
}
```

So far, this has been a very convenient workflow for me, and met all my needs.

## Vendoring as part of mapping

But then I used a web font. And my page flickered *every time* the site loaded.

The modern solution to this is vendoring web font files and adding `<link
rel="preload" ...>` to each HTML file. It turns out this is *really easy* to add
to the above workflow, even without a bundler:

1. Install a font like `npm i @fontsource-variable/monda`

2. Create a tree for `node_modules/@fontsource-variable/monda`

3. Graft this onto the output tree at `/fonts/monda/`

4. Add `<link rel="stylesheet" href="/fonts/monda/index.css" />` to each HTML file

5. Scan each CSS file for `url(...)` and add those as a `<link rel="preload"
   href={url} ...>`

Because web fonts are only one recursion deep, this is all that's needed. If
they used imports, we'd have to have a more recursive solution. But they don't,
so it *just works*.

## Real world example

In fact, that's how the page you're reading right now was generated:

```tsx
import { Pipeline, FileTree } from 'immaculata'
import { Head, Html, Main, Navbar, Sidebar } from "../template/core.tsx"
import { md, type Env } from "./markdown.ts"
import { tocToHtml } from './toc.ts'

const tree = new FileTree('site', import.meta.dirname)

const martel = new FileTree('node_modules/@fontsource/martel', import.meta.dirname)
const exo2 = new FileTree('node_modules/@fontsource-variable/exo-2', import.meta.dirname)
const monda = new FileTree('node_modules/@fontsource-variable/monda', import.meta.dirname)

export function processSite() {
  const files = Pipeline.from(tree.files)

  // ...

  const fonts = vendorFonts([
    { tree: martel, root: '/fonts/martel', files: ['/index.css', '/700.css'] },
    { tree: monda, root: '/fonts/monda', files: ['/index.css'] },
    { tree: exo2, root: '/fonts/exo2', files: ['/index.css'] },
  ])

  files.with('\.md$').do(f => {
    f.path = f.path.replace('.md', '.html')
    const env: Env = { /* ... */ }
    const result = md.render(f.text, env)
    f.text = <Html>
      <Head files={fonts.links} />
      <body>
        <Navbar pages={pages} />
        <Main content={result} />
        <Sidebar toc={tocToHtml(env.toc!)} />
      </body>
    </Html>
  })

  files.with(/\.tsx?$/).do(f => {
    // ...
    f.text = out.outputText
    f.path = jsPath
  })

  fonts.subtrees.forEach(t => {
    files.graft(t.root, t.files)
  })

  return files.results()
}

function vendorFonts(fonts: {
  tree: FileTree,
  root: string,
  files: string[],
}[]) {
  const links: string[] = []
  const subtrees: { root: string, files: Pipeline }[] = []

  for (const font of fonts) {
    const pipeline = new Pipeline()
    subtrees.push({ root: font.root, files: pipeline })

    for (const file of font.files) {
      const content = font.tree.files.get(file)?.content.toString()!

      for (const match of content.matchAll(/url\(\.(.+?)\)/g)) {
        const path = match[1]!
        pipeline.add(path, font.tree.files.get(path)!.content)
        links.push(<link
          rel="preload"
          href={font.root + path}
          as="font"
          type="font/woff"
          crossorigin
        />)
      }

      pipeline.add(file, content)
      links.push(<link rel="stylesheet" href={font.root + file} />)
    }
  }

  return { subtrees, links }
}
```

### A note on the JSX

The JSX in the above is just a string builder. It's enabled by:

```ts
import { compileJsx, mapImport } from 'immaculata/hooks.js'
import { registerHooks } from 'module'

registerHooks(mapImport('react/jsx-runtime', 'immaculata/jsx-strings.js'))
registerHooks(compileJsx((src, url) => myCompileJsx(src, url)))
```

This allows it to have type-checking and auto-completion.

The functions `<Html>`, `<Navbar pages={pages}>` etc. above are just ordinary
TypeScript functions that return strings (often via more JSX).

But this is just how I personally made this site. The beauty of immaculata is
that you can use it to build any kind of build chain you want. (You could
probably use it to turn JSX into React SSR.)

## Preloading ESM files

The performance you get with bundling is available through [module preloads](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/modulepreload) too.

The same technique above is useful for preloading ESM files:

1. Scan your `files` for all `.js` files

2. For each one, add `<link rel="modulepreload" href={jsUrl}/>` to all HTML files

3. For extra efficiency, scan each HTML/JS file for imports and only include those

## Conclusion

Overall, this technique has served me well for several sites including [the one
you're on](https://github.com/thesoftwarephilosopher/immaculata.dev/blob/main/site/build/process.tsx).

Pros:

* Just as fast and efficient as bundling
* Don't need an opaque, heavyweight bundler
* Preloading is tailored to your specific needs

Cons:

* Needs slightly more code per project
* Code needed might be disproportionately complex (e.g. scanning HTML/JS files)

Mitigations:

* Things like `vendorFonts` above (or `scanForImports`) can become NPM libraries
* Healthy library competition can produce ideal vendor functions


# API Examples

## transformExternalModuleNames

```ts
import ts from 'typescript'


function transform(text: string, path: string) {
  return ts.transpileModule(text, {
    fileName: path,
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ESNext,
      jsx: ts.JsxEmit.ReactJSX,
      sourceMap: true,
    },
    transformers: {
      after: [transformExternalModuleNames(import.meta.dirname, {
        // replacements
      })]
    }
  })
}
```

```ts
// given
const replacements = {
  'bar/qux': '/_barqux.js',
}

import qux from "bar/qux"

// becomes

import qux from "/_barqux.js";
```

```ts
// given
const replacements = {
  'foo': 'https://example.com/foo123',
}

import foo from "foo"
import foosub from "foo/sub"
import withext from "foo/sub.js"

// becomes

import foo from "https://example.com/foo123";
import foosub from "https://example.com/foo123/sub";
import withext from "https://example.com/foo123/sub.js";
```

### Package lookup

```ts
// node_modules/foo/package.json
{
  "homepage": "http://example.com/api/foo/"
}

// replacements isn't needed when "homepage" is set

import foo from 'foo'
import foobar from 'foo/bar.js'

// becomes

import foo from 'http://example.com/api/foo/'
import foobar from 'http://example.com/api/foo/bar.js'
```

### Using React

```ts
const replacements = {
  'react': 'https://esm.sh/react',
  'react-dom': 'https://esm.sh/react-dom',
}

import React from 'react'
import { createRoot } from 'react-dom/client'

// becomes

import React from "https://esm.sh/react";
import { createRoot } from "https://esm.sh/react-dom/client";
import { jsx as _jsx } from "https://esm.sh/react/jsx-runtime";
```
