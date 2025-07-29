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
