import * as sucrase from 'sucrase';
import { pathToFileURL } from "url";
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
      this.content = compileTSX(code).code;
      this.path = convertTsExts(path);
    }
  }

}

export function compileTSX(code: string, realFilePath?: string) {
  const options: sucrase.Options = {
    transforms: ['typescript', 'jsx'],
    jsxRuntime: 'automatic',
    jsxImportSource: '/imlibruntime',
    disableESTransforms: true,
    production: true,
  };
  if (realFilePath) {
    options.transforms.push('imports');
    options.sourceMapOptions = { compiledFilename: realFilePath };
    options.filePath = pathToFileURL(realFilePath).href;
  }
  const result = sucrase.transform(code, options);
  if (realFilePath) {
    result.code = result.code.replace(/"\/imlibruntime\/jsx-runtime"/g, `"/imlibruntime/_jsx.js"`);
  }
  else {
    result.code = result.code.replace(/"\/imlibruntime\/jsx-runtime"/g, `"/imlibruntime/jsx.js"`);
  }
  return result;
}

export function convertTsExts(path: string) {
  return path.replace(/\.tsx?$/, '.js');
}
