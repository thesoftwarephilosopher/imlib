# imlib

*Simple TypeScript/JSX SSG*

* [Live demo](https://sdegutis.github.io/imlib-template/)
* [Live demo's source code](https://github.com/sdegutis/imlib-template/tree/main/site)
* [Template repo](https://github.com/sdegutis/imlib-template)
* [Real world usage](https://github.com/sdegutis/immaculatalibrary.com/tree/main/site)

### Benefits

1. Simple TypeScript SSG
2. Custom JSX implementation (can return DOM nodes, strings, etc)
3. Extremely fast and efficient (processes 1500+ files in ~700ms)

### Try it out

1. Clone the [template repo](https://github.com/sdegutis/imlib-template)
2. `imlib dev` (or press F5 in VSCode)
3. Open http://localhost:8080
4. Change something
5. Reload the browser

### Docs to eventually clean up

1. **Structure:**  
   All files under `site` are processed and turned into the website.  
   Only files that match the patterns below have any special processing.  
   Files under `/admin/` are only visible in `imlib dev` (for site self-editing).  
   Files ending with `.d.ts` is skipped, so you can ducktype CDN imports.  
   All other files are left as-is in the site.

2. **Dynamic single-files:**  
   Files matching `*.<ext>.(ts|tsx)` are processed in Node.js at SSG time.  
   Its default export becomes the contents of the file at `*.<ext>`.  
   All files should export strings, except json files, which export objects.  
   Inside `.tsx` files, JSX expressions return strings, but otherwise work as usual.  
   Example: `index.html.tsx` containing `export default <b>hello world</b>;`

3. **Dynamic array-files:**  
   Files matching `[*].<ext>.(ts|tsx)` are processed as above but as arrays:  
   Its default export should be an array of `[filename, exported]`.  
   For each pair, the `[*]` filename portion is replaced with the first element.  
   The second element becomes the file's contents, in the same way as above.  
   Example: `[article].html.tsx` containing `export default ['hello-world', <b>hello world</b>];`  
   This will produce `hello-world.html` containing `<b>hello world</b>`.

4. **Importing directories**:
   In the SSG side, you can `import files from './'` or any dir ending with `/`.  
   The return value of import is `{ path: string, content: Buffer }[]`.  
   This allows processing and transforming basically any data in any way.

5. **Browser-side scripts:**  
   TS/TSX files that don't start with `_` are transformed into `.js` for the browser.  
   This allows browser-side scripts to be conveniently written in JSX and TypeScript.  
   Note that these are compiled using ESM, so they must be imported/src'd as modules.  
   JSX in these files are able to attach event handlers directly to the attributes.

6. **Shared-side modules:**  
   Technically, browser-side scripts can *also* be imported on the SSG side.  
   The caveat is that they have different JSX semantics, and can't access Node modules.  
   In practice, this is useful for shared helpers, shared types, and non-dynamic JSX components.

7. **Custom JSX implementations:**
   By default, imlib sites will render JSX as strings on the ssg side and DOM nodes in the browser.
   You can run the site directly and specify a TypeScript implementation for each JSX impl.
   Or you can implement `site/@imlib/jsx-{browser,node}.ts` in your own site.
   See [site/jsx-dom.ts]() and [site/jsx-strings.ts]() for examples of implementing each side.
