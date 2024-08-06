export default <>

  <h1>Docs</h1>
  <p>These are just super quick docs. I plan to make this a proper website soon.</p>

  <h3>Structure</h3>
  <p>All files under `site` are processed and turned into the website.</p>
  <p>Only files that match the patterns below have any special processing.</p>
  <p>Files under `/admin/` are only visible in `imlib dev` (for site self-editing).</p>
  <p>Files ending with `.d.ts` is skipped, so you can ducktype CDN imports.</p>
  <p>All other files are left as-is in the site.</p>

  <h3>Dynamic single-files</h3>
  <p>Files matching `*.{'<ext>'}.(ts|tsx)` are processed in Node.js at SSG time.</p>
  <p>Its default export becomes the contents of the file at `*.{'<ext>'}`.</p>
  <p>All files should export strings, except json files, which export objects.</p>
  <p>Inside `.tsx` files, JSX expressions return strings, but otherwise work as usual.</p>
  <p>Example: `index.html.tsx` containing `export default <b>hello world</b>;`</p>

  <h3>Dynamic array-files</h3>
  <p>Files matching `[*].{'<ext>'}.(ts|tsx)` are processed as above but as arrays:</p>
  <p>Its default export should be an array of `[filename, exported]`.</p>
  <p>For each pair, the `[*]` filename portion is replaced with the first element.</p>
  <p>The second element becomes the file's contents, in the same way as above.</p>
  <p>Example: `[article].html.tsx` containing `export default ['hello-world', <b>hello world</b>];`</p>
  <p>This will produce `hello-world.html` containing `<b>hello world</b>`.</p>

  <h3>Importing directori</h3>
  <p>In the SSG side, you can `import files from './'` or any dir ending with `/`.</p>
  <p>The return value of import is `{'{'}path: string, content: Buffer {'}'}[]`.</p>
  <p>This allows processing and transforming basically any data in any way.</p>

  <h3>Browser-side scripts</h3>
  <p>TS/TSX files that don't start with `_` are transformed into `.js` for the browser.</p>
  <p>This allows browser-side scripts to be conveniently written in JSX and TypeScript.</p>
  <p>Note that these are compiled using ESM, so they must be imported/src'd as modules.</p>
  <p>JSX in these files are able to attach event handlers directly to the attributes.</p>

  <h3>Shared-side modules</h3>
  <p>Technically, browser-side scripts can *also* be imported on the SSG side.</p>
  <p>The caveat is that they have different JSX semantics, and can't access Node modules.</p>
  <p>In practice, this is useful for shared helpers, shared types, and non-dynamic JSX components.</p>

  <h3>Custom JSX implementatio</h3>
  <p>By default, imlib sites will render JSX as strings on the ssg side and DOM nodes in the browser.</p>
  <p>You can run the site directly and specify a TypeScript implementation for each JSX impl.</p>
  <p>Or you can implement `site/@imlib/jsx-{'{'}browser, node{'}'}.ts` in your own site.</p>
  <p>See [site/jsx-dom.ts]() and [site/jsx-strings.ts]() for examples of implementing each side.</p>

</>;
