declare module JSX {
  export type ElementAttrs = {
    id?: string;
    class?: string;
    style?: string;
    title?: string;
    innerHTML?: string;
    hidden?: boolean;
    onclick?: string | Function,
  };

  export type AnchorAttrs = ElementAttrs & { href?: string; rel?: 'noopener'; target?: string };
  export type MetaAttrs = { 'http-equiv'?: string; content?: string; name?: string; charset?: string; property?: string; };
  export type LinkAttrs = { href: string } & (
    { rel: 'stylesheet' } |
    { rel: 'icon'; type: string; sizes: string } |
    { rel: 'apple-touch-icon'; sizes: string } |
    { rel: 'preload'; as: 'font'; type: 'font/woff'; crossorigin: boolean } |
    { rel: 'manifest' });
  export type ScriptAttrs = ElementAttrs & { type?: 'module'; src?: string };
  export type ImgAttrs = ElementAttrs & { src: string; loading?: 'lazy', alt?: '' };
  export type FormAttrs = ElementAttrs & { method: string; action: string };
  export type ButtonAttrs = ElementAttrs & { type?: string };
  export type InputAttrs = ElementAttrs & { type?: string; name?: string; value?: string; checked?: boolean; autofocus?: boolean; placeholder?: string; oninput?: string | Function; autocomplete?: string };

  type IntrinsicElements = {
    [tag: string]: Record<string, string | boolean | Function>;
    meta: MetaAttrs, link: LinkAttrs, script: ScriptAttrs,
    a: AnchorAttrs, b: ElementAttrs, span: ElementAttrs, em: ElementAttrs, img: ImgAttrs,
    div: ElementAttrs, p: ElementAttrs, main: ElementAttrs, blockquote: ElementAttrs,
    form: FormAttrs, button: ButtonAttrs, input: InputAttrs,
    h1: ElementAttrs, h2: ElementAttrs, h3: ElementAttrs, h4: ElementAttrs, h5: ElementAttrs, h6: ElementAttrs,
    hr: ElementAttrs, br: ElementAttrs,
    li: ElementAttrs, ul: ElementAttrs, ol: ElementAttrs,
  };

  export type Element = HTMLElement | SVGElement | DocumentFragment | string;
  export type Component<T extends Record<string, any> = {}> = (attrs: T, children: any) => Element;
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
  export const handlers: Map<string, (body: string) => string>;
  export default handlers;
}
