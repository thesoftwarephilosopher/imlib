import * as fs from "fs";
import * as path from "path/posix";
import { File, convertTsExts } from "./file.js";

const siteBase = process.env["IMLIB_SITEBASE"];

const ARRAY_FILE_REGEX = /\[.+\]/;

const extFns = {
  html: hoist,
  json: JSON.stringify,
};

export class Runtime {

  files = new Map<string, File>();
  #deps = new Map<string, Set<string>>();

  handlers = new Map<string, (body: string) => string>();

  constructor(private realBase: string) {
    this.#loadDir('/');
    this.#shimFile('/core/$jsx.ts');
    this.#shimFile('/core/jsx.ts');
  }

  build() {
    const start = Date.now();
    const outfiles = this.#build();
    console.log(`Time: ${Date.now() - start} ms`);
    return outfiles;
  }

  #build() {
    const outfiles = new Map<string, Buffer | string>();
    const isDev = !!process.env['DEV'];

    for (const { path, content } of this.files.values()) {
      if (!isDev && path.startsWith('/admin/')) continue;

      let match;
      if (match = path.match(/\.(.+)\.js$/)) {
        const ext = match[1] as keyof typeof extFns;
        const process = extFns[ext] ?? ((s: string) => s);

        const filepath = path.slice(0, -3);

        const exported = this.files.get(path)!.module?.require().default;

        if (path.match(ARRAY_FILE_REGEX)) {
          for (const [slug, jsx] of exported) {
            const filename = filepath.replace(ARRAY_FILE_REGEX, slug);
            outfiles.set(filename, process(jsx));
          }
        }
        else {
          outfiles.set(filepath, process(exported));
        }
      }
      else {
        if (path.endsWith('.md')) {
          // skip
        }
        else if (path.endsWith('.js') && !path.includes('$')) {
          // skip
        }
        else {
          outfiles.set(path, content);
        }
      }
    }

    outfiles.set('/sitemap.xml', makeSitemap(outfiles));

    return outfiles;
  }

  pathsUpdated(...paths: string[]) {
    const filepaths = paths.map(p => p.slice(this.realBase.length));

    for (const filepath of filepaths) {
      const realFilePath = this.realPathFor(filepath);

      if (fs.existsSync(realFilePath)) {
        this.#createFile(filepath);
      }
      else {
        this.files.delete(filepath);
      }
    }

    const resetSeen = new Set<string>();
    for (const filepath of filepaths) {
      this.#resetDepTree(filepath, resetSeen);
    }
  }

  #loadDir(base: string) {
    const dirRealPath = this.realPathFor(base);
    const files = fs.readdirSync(dirRealPath);
    for (const name of files) {
      if (name.startsWith('.')) continue;

      const realFilePath = path.join(dirRealPath, name);
      const stat = fs.statSync(realFilePath);

      if (stat.isDirectory()) {
        this.#loadDir(path.join(base, name));
      }
      else if (stat.isFile()) {
        const filepath = path.join(base, name);
        this.#createFile(filepath);
      }
    }
  }

  #createFile(filepath: string) {
    const realFilePath = this.realPathFor(filepath);
    let content = fs.readFileSync(realFilePath);
    const file = new File(filepath, content, this);
    this.files.set(file.path, file);
  }

  #shimFile(filepath: string) {
    let content = fs.readFileSync('runtime' + filepath);
    const file = new File(filepath, content, this);
    this.files.set(file.path, file);
  }

  realPathFor(filepath: string) {
    return path.join(this.realBase, filepath);
  }

  addDeps(requiredBy: string, requiring: string) {
    let list = this.#deps.get(requiring);
    if (!list) this.#deps.set(requiring, list = new Set());
    list.add(requiredBy);
  }

  #resetDepTree(path: string, seen: Set<string>) {
    if (seen.has(path)) return;
    seen.add(path);

    for (const [requiring, requiredBy] of this.#deps) {
      if (path.startsWith(requiring)) {
        this.#deps.delete(requiring);
        for (const dep of requiredBy) {
          const module = this.files.get(convertTsExts(dep))?.module;
          module?.resetExports();
          this.#resetDepTree(dep, seen);
        }
      }
    }
  }

}

function hoist(jsx: string) {
  const hoisted = new Set<string>();
  return (jsx
    .replace(/<script .+?><\/script>|<link .+?>/g, (s, s2) => {
      hoisted.add(s);
      return '';
    })
    .replace(/<\/head>/, [...hoisted, '</head>'].join('')));
}

function makeSitemap(outfiles: Map<string, string | Buffer>) {
  return `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset 
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    >
      ${[...outfiles.keys()]
      .filter(filepath => filepath.endsWith('.html'))
      .map(filepath => {
        const name = path.basename(filepath);
        const date = name.match(/^(\d{4}-\d{2}-\d{2})-/)?.[1];
        return `
          <url>
            <loc>${siteBase}${filepath}</loc>
            ${date ? `<lastmod>${date}</lastmod>` : ''}
          </url>
        `;
      }).join('')}
    </urlset>
  `.trim();
}
