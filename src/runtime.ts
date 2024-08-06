import * as fs from "fs";
import * as path from "path/posix";
import { convertTsExts, File } from "./file.js";

export type SiteProcessor = (files: Iterable<File>) => Map<string, Buffer | string>;

const jsxDom = fs.readFileSync(__dirname + '/../src/jsx-dom.ts');
const jsxStrings = fs.readFileSync(__dirname + '/../src/jsx-strings.ts');

export class Runtime {

  files = new Map<string, File>();
  #deps = new Map<string, Set<string>>();

  handlers = new Map<string, (body: string) => string>();

  constructor(private config: {
    siteDir: string,
    processor: SiteProcessor,
    jsxContentSsg?: string | Buffer,
    jsxContentBrowser?: string | Buffer,
  }) {
    this.#loadDir('/');
  }

  build() {
    this.#putFileIfNeeded('/@imlib/jsx-browser.js', this.config.jsxContentBrowser ?? jsxDom);
    this.#putFileIfNeeded('/@imlib/jsx-node.js', this.config.jsxContentSsg ?? jsxStrings);

    const processor = (
      this.files.get('/@imlib/processor.js')?.module?.require().default ??
      this.config.processor
    );

    const start = Date.now();
    const outfiles = processor(this.files.values());
    console.log(`Time: ${Date.now() - start} ms`);
    return outfiles;
  }

  pathsUpdated(...paths: string[]) {
    const filepaths = paths.map(p => p.slice(this.config.siteDir.length));

    for (const filepath of filepaths) {
      if (fs.existsSync(this.realPathFor(filepath))) {
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
      if (name.endsWith('.d.ts')) continue;

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
    this.#putFile(filepath, content);
  }

  #putFile(filepath: string, content: string | Buffer) {
    const file = new File(filepath, content, this);
    this.files.set(file.path, file);
  }

  #putFileIfNeeded(filepath: string, content: string | Buffer) {
    if (!this.files.has(filepath)) {
      this.#putFile(filepath, content);
    }
  }

  realPathFor(filepath: string) {
    return path.join(this.config.siteDir, filepath);
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
