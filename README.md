# imlib

*Simple TypeScript/JSX SSG*

### Benefits

1. JSX in SSG side, return strings
2. JSX in browser side, returns plain DOM elements
3. Extremely fast and efficient

### Setup

1. `npm i @imlib/core`
2. `imlib dev` and load http://localhost:8080
3. `imlib generate` to generate files to `docs`
4. Add `"@imlib/core"` to `"types"` in tsconfig
5. Set `jsx` to anything in tsconfig

### Usage

1. **Structure:**  
   All files under `site` are processed and turned into the website.  
   Only files that match the patterns below have any special processing.  
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

4. **Browser-side scripts:**  
   Files containing `$` in the filename are transformed into `.js` for the browser.  
   This allows browser-side scripts to be conveniently written in JSX and TypeScript.  
   Note that these are compiled using ESM, so they must be imported/src'd as modules.  
   JSX in these files are able to attach event handlers directly to the attributes.

5. **Shared-side modules:**  
   Technically, browser-side scripts can *also* be imported on the SSG side.  
   The caveat is that they have different JSX semantics, and can't access Node modules.  
   In practice, this is useful for shared helpers, shared types, and non-dynamic JSX components.

### Example

See https://github.com/sdegutis/immaculatalibrary.com for a practical real-world example.
