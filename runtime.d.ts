declare namespace JSX {

  type Element = {
    tag: string | any,
    attrs?: Record<string, any>,
  } & ({ child?: any } | { children?: any[] });

}

type FsFile = {
  path: string;
  content: Buffer;
  module?: FsModule;
};

type FsModule = {
  require(): any;
  source: string;
};

declare module '*/' {
  const dir: FsFile[];
  export default dir;
}

declare module 'handlers!' {
  export const handlers: Map<string, (body: string) => string>;
  export default handlers;
}
