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
      this.content = runtime.compiler.compile(code, undefined, path).code;
      this.path = convertTsExts(path);
    }
  }

}

export function convertTsExts(path: string) {
  return path.replace(/\.tsx?$/, '.js');
}
