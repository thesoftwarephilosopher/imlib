import * as swc from '@swc/core';
import { Module } from "./module";
import { Runtime } from "./runtime";

export class File {

  module?: Module;

  constructor(
    public path: string,
    public content: Buffer | string,
    runtime: Runtime,
  ) {
    if (path.match(/\.tsx?$/)) {
      const code = content.toString('utf8');
      this.module = new Module(code, this.path, runtime);
      this.content = compileTSX(code, undefined, path).code;
      this.path = convertTsExts(path);
    }
  }

}

export function compileTSX(code: string, realFilePath?: string, browserFilePath?: string) {
  let prefix = '';
  if (browserFilePath && !browserFilePath.startsWith('/@imlib/')) {
    const levels = browserFilePath.match(/\//g)!.length - 1;
    prefix = '.' + '/..'.repeat(levels);
  }

  const opts: swc.Options = {
    sourceMaps: 'inline',
    module: { type: 'es6' },
    jsc: {
      parser: {
        syntax: 'typescript',
        tsx: true,
      },
      target: 'esnext',
      transform: {
        react: {
          runtime: 'automatic',
          importSource: '/@imlib',
          throwIfNamespace: false,
        }
      }
    }
  };

  if (realFilePath) {
    opts.module!.type = 'commonjs';
    opts.sourceFileName = realFilePath;
    // options.sourceMapOptions = { compiledFilename: realFilePath };
    // options.filePath = pathToFileURL(realFilePath).href;
  }
  const result = swc.transformSync(code, opts);
  if (realFilePath) {
    result.code = result.code.replace(/"\/@imlib\/jsx-runtime"/g, `"/@imlib/jsx-node.js"`);
  }
  else {
    result.code = result.code.replace(/"\/@imlib\/jsx-runtime"/g, `"${prefix}/@imlib/jsx-browser.js"`);
  }
  return result;
}

export function convertTsExts(path: string) {
  return path.replace(/\.tsx?$/, '.js');
}
