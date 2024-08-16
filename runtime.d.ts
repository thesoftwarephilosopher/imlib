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

  export type HtmlAttrs = { lang?: string };
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
  export type TextAreaAttrs = ElementAttrs & { name?: string; rows?: string };
  export type SelectAttrs = ElementAttrs & { name?: string; onchange?: string | Function };
  export type OptionAttrs = ElementAttrs & { value?: string; selected?: boolean };
  export type OptgroupAttrs = ElementAttrs & { label: string };
  export type IFrameAttrs = ElementAttrs & { src: string; allowfullscreen?: boolean | 'allowfullscreen' | ''; width?: string; height?: string; frameborder?: string; loading?: 'lazy'; allow?: string };
  export type SvgAttrs = ElementAttrs & { viewBox: string; height?: string };
  export type PathAttrs = ElementAttrs & { d: string };

  type IntrinsicElements = {
    [tag: string]: Record<string, string | boolean | Function>;
    html: HtmlAttrs, head: ElementAttrs, body: ElementAttrs, title: {},
    meta: MetaAttrs, link: LinkAttrs, script: ScriptAttrs, iframe: IFrameAttrs, style: {},
    a: AnchorAttrs, b: ElementAttrs, i: ElementAttrs, span: ElementAttrs, em: ElementAttrs, small: ElementAttrs,
    img: ImgAttrs, hr: ElementAttrs, br: ElementAttrs,
    div: ElementAttrs, p: ElementAttrs, blockquote: ElementAttrs, li: ElementAttrs, ul: ElementAttrs, ol: ElementAttrs,
    header: ElementAttrs, footer: ElementAttrs, main: ElementAttrs, section: ElementAttrs, aside: ElementAttrs, nav: ElementAttrs, details: ElementAttrs, summary: ElementAttrs,
    form: FormAttrs, button: ButtonAttrs, input: InputAttrs, textarea: TextAreaAttrs, select: SelectAttrs, option: OptionAttrs, label: ElementAttrs, optgroup: OptgroupAttrs,
    h1: ElementAttrs, h2: ElementAttrs, h3: ElementAttrs, h4: ElementAttrs, h5: ElementAttrs, h6: ElementAttrs,
    svg: SvgAttrs, path: PathAttrs,
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
