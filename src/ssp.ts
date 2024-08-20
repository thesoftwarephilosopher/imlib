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

function processContent(content: any, ext: string) {
  const fn = contentProcessors[ext];
  return fn ? fn(content) : content;
}

export type InFiles = ReturnType<Map<string, FsFile>['values']>;
export type SiteProcessor = (files: InFiles) => Map<string, Buffer | string>;

export const processSite: SiteProcessor = (files) => {
  const outfiles = new Map<string, Buffer | string>();

  for (const file of files) {
    let match;
    if (match = isArrayFile(file.path)) {
      const exportedArray = file.module!.require().default as [string, string][];
      for (const [name, content] of exportedArray) {
        const filepath = file.path.replace(match.slug, name);
        outfiles.set(filepath.slice(0, -3), processContent(content, match.ext));
      }
    }
    else if (match = isSingleFile(file.path)) {
      const exportedContent = file.module!.require().default;
      outfiles.set(file.path.slice(0, -3), processContent(exportedContent, match.ext));
    }
    else {
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
