# imlib

*Simple TypeScript/JSX SSG*

Extracted from [sdegutis/immaculatalibrary.com]()

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
   Files containing `$` in the filename are transformed into `.js` for the browser.  
   This allows browser-side scripts to be conveniently written in JSX and TypeScript.  
   Note that these are compiled using ESM, so they must be imported/src'd as modules.  
   JSX in these files are able to attach event handlers directly to the attributes.

6. **Shared-side modules:**  
   Technically, browser-side scripts can *also* be imported on the SSG side.  
   The caveat is that they have different JSX semantics, and can't access Node modules.  
   In practice, this is useful for shared helpers, shared types, and non-dynamic JSX components.

### Example

See https://github.com/sdegutis/immaculatalibrary.com for a practical real-world example.

### Performance

Given this repo:

```
immaculatalibrary.com$ scc
───────────────────────────────────────────────────────────────────────────────
Language                 Files     Lines   Blanks  Comments     Code Complexity
───────────────────────────────────────────────────────────────────────────────
Markdown                  1418     42537     3915         0    38622          0
TypeScript                  98      5467      793        14     4660        368
CSS                         24      1187      197         8      982          0
JSON                         7      1672        0         0     1672          0
TypeScript Typings           1        14        2         0       12          0
YAML                         1        60       11         6       43          0
gitignore                    1         2        0         0        2          0
───────────────────────────────────────────────────────────────────────────────
Total                     1550     50939     4918        28    45993        368
───────────────────────────────────────────────────────────────────────────────
Estimated Cost to Develop (organic) $1,504,602
Estimated Schedule Effort (organic) 16.06 months
Estimated People Required (organic) 8.32
───────────────────────────────────────────────────────────────────────────────
Processed 4259040 bytes, 4.259 megabytes (SI)
───────────────────────────────────────────────────────────────────────────────
```

Initial startup time:

```
> imlib dev

Debugger attached.
Running on http://localhost:8080
Time: 702 ms
```

After saving a file:

```
Rebuilding site...
Time: 95 ms
```
