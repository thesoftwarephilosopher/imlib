import * as fs from "fs";
import * as path from "path/posix";
import { Compiler } from "./compiler.js";
import { convertTsExts, File } from "./file.js";
import { processSite, SiteProcessor } from "./ssp.js";

export class Runtime {

  files = new Map<string, File>();
  #deps = new Map<string, Set<string>>();
  handlers = new Map<string, (body: string) => string>();
  compiler = new Compiler();

  constructor(
    private siteDir: string = 'site',
    private processor: SiteProcessor = processSite,
  ) {
    this.rebuildAll();
  }

  build() {
    const processor = (
      this.files.get('/@imlib/processor.js')?.module?.require().default ??
      this.processor
    );

    const start = Date.now();
    const outfiles = new Map<string, Buffer | string>();
    processor(this.files.values(), outfiles);
    console.log(`Time: ${Date.now() - start} ms`);
    return outfiles;
  }

  rebuildAll() {
    this.compiler = new Compiler();
    this.#loadDir('/');
  }

  pathsUpdated(...paths: string[]) {
    if (paths.includes('package.json')) {
      console.log('rebuilding all')
      this.rebuildAll();
      return;
    }

    const filepaths = paths.map(p => p.slice(this.siteDir.length));

    for (const filepath of filepaths) {
      if (fs.existsSync(this.realPathFor(filepath))) {
        this.#createFile(filepath);
      }
      else {
        this.files.delete(convertTsExts(filepath));
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
    this.#putFile(filepath, fs.readFileSync(this.realPathFor(filepath)));
  }

  #putFile(filepath: string, content: string | Buffer) {
    const file = new File(filepath, content, this);
    this.files.set(file.path, file);
  }

  realPathFor(filepath: string) {
    return path.join(this.siteDir, filepath);
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
