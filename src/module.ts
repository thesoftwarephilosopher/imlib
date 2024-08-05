import * as path from "path/posix";
import { pathToFileURL } from "url";
import * as vm from "vm";
import { compileTSX } from "./file";
import { Runtime } from "./runtime";

export class Module {

  #fn: (() => void) | undefined;
  #exports: object | undefined;

  constructor(
    private content: string,
    public filepath: string,
    private runtime: Runtime
  ) { }

  require(): any {
    if (!this.#exports) {
      this.#exports = Object.create(null);
      this.#run();
    }
    return this.#exports;
  }

  resetExports() {
    this.#exports = undefined;
  }

  #run() {
    if (!this.#fn) {
      const realFilePath = this.runtime.realPathFor(this.filepath);
      const transformed = compileTSX(this.content, realFilePath);
      const sourceCode = transformed.code;
      // const sourceMapBase64 = Buffer.from(JSON.stringify(transformed.sourceMap)).toString('base64url');
      // const sourceMap = `\n//# sourceMappingURL=data:application/json;base64,${sourceMapBase64}`;

      // this.content = sourceCode + sourceMap;
      this.content = sourceCode;

      const fn = vm.compileFunction(this.content, ['require', 'exports'], {
        filename: pathToFileURL(realFilePath).href,
      });

      const require = (path: string) => this.#require(path);
      this.#fn = () => fn(require, this.#exports);
    }
    this.#fn();
  }

  #require(toPath: string) {
    if (toPath === 'handlers!') return this.runtime.handlers;

    if (!toPath.match(/^[./]/)) {
      const requirePaths = [
        path.join(process.cwd(), 'node_modules'),
        ...(require.resolve.paths(toPath) ?? []),
      ];

      const reqPath = require.resolve(toPath, { paths: requirePaths });
      return require(reqPath);
    }

    const absPath = path.resolve(path.dirname(this.filepath), toPath);

    const module = this.runtime.files.get(absPath)?.module;
    if (module) {
      this.runtime.addDeps(this.filepath, module.filepath);
      return module.require();
    }

    if (toPath.endsWith('/')) {
      const dirPath = absPath.endsWith('/') ? absPath : absPath + '/';
      this.runtime.addDeps(this.filepath, dirPath);
      const files = [...this.runtime.files.values()]
        .filter(file => file.path.startsWith((dirPath)));
      return files;
    }

    throw new Error(`Can't find file at path: ${toPath}`);
  }

}
