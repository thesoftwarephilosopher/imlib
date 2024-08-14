import * as swc from '@swc/core';
import { readFileSync } from 'fs';
import { Module } from "./module";
import { Runtime } from "./runtime";

"https://cdn.jsdelivr.net/npm/@swc/wasm-web@1.7.10/+esm"
"https://cdn.jsdelivr.net/npm/eases@1.0.8/+esm"
"https://cdn.jsdelivr.net/npm/markdown-it@13.0.2/+esm"

const tsconfig = JSON.parse(readFileSync('package.json').toString('utf8'));

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
    plugin: (program) => {
      if (browserFilePath) {
        for (const imp of program.body) {
          if (imp.type === 'ImportDeclaration') {
            const dep = imp.source.value;
            const version = (
              tsconfig.devDependencies[dep] ??
              tsconfig.dependencies[dep]
            );
            if (version) {
              delete imp.source.raw;
              imp.source.value = `https://cdn.jsdelivr.net/npm/${dep}@${version}/+esm`;
            }
            else {
              const typeDep = '@types/' + dep.replace(/^@(.+?)\/(.+)/, '$1__$2');
              if (tsconfig.devDependencies[typeDep]) {
                delete imp.source.raw;
                imp.source.value = `https://cdn.jsdelivr.net/npm/${dep}/+esm`;
              }
            }
          }
        }
      }
      return program;
    },
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
