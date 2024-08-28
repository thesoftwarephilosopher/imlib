import * as babel from '@babel/core';
import { readFileSync } from 'fs';
import { babelPluginVanillaJSX } from './vanillajsx.js';

export class Compiler {

  packageJson = JSON.parse(readFileSync('package.json').toString('utf8'));

  compile(code: string, realFilePath?: string, browserFilePath?: string) {
    const plugins: babel.PluginItem[] = [
      [require('@babel/plugin-transform-typescript'), { isTSX: true }],
      babelPluginVanillaJSX,
      this.#makeImportRenamer(!!browserFilePath),
    ];

    if (realFilePath) {
      plugins.unshift(require('@babel/plugin-transform-modules-commonjs'));
    }

    return {
      code: babel.transformSync(code, {
        filename: realFilePath ?? browserFilePath,
        plugins,
      })!.code!,
    };
  }

  #makeImportRenamer(inBrowser: boolean): babel.PluginItem {
    return {
      visitor: {
        ImportDeclaration: {
          enter: (path) => {
            const dep = path.node.source.value;
            if (inBrowser) {
              const version: string | undefined = (
                this.packageJson.devDependencies[dep] ??
                this.packageJson.dependencies[dep]
              );
              let m;
              if (m = version?.match(/^github:(?<user>.+?)\/(?<repo>.+?)(?:#(?<ver>.+))?$/)) {
                const ver = m.groups!['ver'] ? `@${m.groups!['ver']}` : '';
                path.node.source.value = `https://cdn.jsdelivr.net/gh/${m.groups!['user']}/${m.groups!['repo']}${ver}/index.js`;
                console.log(path.node.source.value)
              }
              else if (version) {
                path.node.source.value = `https://cdn.jsdelivr.net/npm/${dep}@${version}/+esm`;
              }
              else {
                const typeDep = '@types/' + dep.replace(/^@(.+?)\/(.+)/, '$1__$2');
                if (this.packageJson.devDependencies[typeDep]) {
                  path.node.source.value = `https://cdn.jsdelivr.net/npm/${dep}/+esm`;
                }
              }
            }
          }
        }
      }
    };
  }

}
