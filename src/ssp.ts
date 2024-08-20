import { File } from "./file.js";

export const contentProcessors: Record<string, (s: any) => string> = {
  '.html': hoistHtml,
  '.json': JSON.stringify,
};

function hoistHtml(jsx: string) {
  const hoisted = new Set<string>();
  return (jsx
    .replace(/<script .+?><\/script>|<link .+?>/g, (s, s2) => {
      hoisted.add(s);
      return '';
    })
    .replace(/<\/head>/, [...hoisted, '</head>'].join('')));
}

const isArrayFile = matcher<'ext' | 'slug'>(/\/.*(?<slug>\[.+\]).*(?<ext>\..+)\.js$/);
const isSingleFile = matcher<'ext'>(/(?<ext>\..+)\.js$/);

export type SiteProcessor = (files: Iterable<File>) => Map<string, Buffer | string>;

export const processSite: SiteProcessor = (files) => {
  const outfiles = new Map<string, Buffer | string>();

  for (const file of files) {
    let producedFiles: {
      path: string,
      content: string | Buffer,
      dynamic?: {
        ext: string,
      },
    }[] | undefined;

    let match;
    if (match = isArrayFile(file.path)) {
      const { slug, ext } = match;
      const exportedArray = file.module!.require().default as [string, string][];
      producedFiles = exportedArray.map(([name, content]) => {
        const filepath = file.path.replace(slug, name);
        return { path: filepath, content, special: { ext } };
      });
    }
    else if (match = isSingleFile(file.path)) {
      const { ext } = match;
      const content = file.module!.require().default;
      producedFiles = [{ path: file.path, content, dynamic: { ext } }];
    }
    else {
      producedFiles = [file];
    }

    for (const file of producedFiles) {
      if (file.dynamic) {
        file.path = file.path.slice(0, -3);

        const fn = contentProcessors[file.dynamic.ext];
        if (fn) file.content = fn(file.content);
      }

      outfiles.set(file.path, file.content);
    }
  }

  return outfiles;
};

function matcher<T extends string>(regex: RegExp) {
  return (str: string) => {
    return str.match(regex)?.groups as { [key in T]: string };
  }
}
