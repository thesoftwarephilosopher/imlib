declare module JSX {
  export type IntrinsicElements = {
    [tag: string]: Record<string, string | boolean | Function>;
  };
  export type Element = HTMLElement | SVGElement | DocumentFragment | string;
  export type Component<T extends Record<string, any> = {}> =
    (attrs: T, children: any) => Element;
}

type FsFile = {
  path: string;
  content: Buffer;
};

declare module '*/' {
  const dir: FsFile[];
  export default dir;
}

declare module 'handlers!' {
  export const handlers = new Map<string, (body: string) => string>();
  export default handlers;
}

declare module 'https://cdn.jsdelivr.net/npm/markdown-it@13.0.2/+esm' {
  import MarkdownIt = require('markdown-it/lib');
  export default MarkdownIt;
}

declare module 'markdown-it' {
  import MarkdownIt = require('markdown-it/lib');
  export default MarkdownIt;
}

declare module 'https://cdn.jsdelivr.net/npm/eases@1.0.8/+esm' {
  const eases = await import('eases');
  export default eases;
}
