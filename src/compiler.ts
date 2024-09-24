import * as babel from '@babel/core';
import { readFileSync } from 'fs';
import { babelPluginVanillaJSX } from './vanillajsx.js';

export class Compiler {

  packageJson = JSON.parse(readFileSync('package.json').toString('utf8'));

  compile(code: string, realFilePath?: string, browserFilePath?: string) {
    return {
      code: babel.transformSync(code, {
        filename: realFilePath ?? browserFilePath,
        plugins: [
          ...(realFilePath ? [require('@babel/plugin-transform-modules-commonjs')] : []),
          [require('@babel/plugin-transform-typescript'), { isTSX: true }],
          [require('@babel/plugin-syntax-import-attributes')],
          babelPluginVanillaJSX,
        ],
      })!.code!,
    };
  }

}
