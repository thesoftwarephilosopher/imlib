import * as path from "path";
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

interface Outfile {
  path: string;
  content: string | Buffer;
}

const ARRAY_FILE = /\/.*(?<slug>\[.+\]).*\.(?<ext>.+)\.js$/;
const FILE = /\.(?<ext>.+)\.js$/;

export type SiteProcessor = (files: Iterable<File>) => Map<string, Buffer | string>;

export const processSite: SiteProcessor = (files) => {
  const outfiles = new Map<string, Buffer | string>();

  for (const file of files) {
    let specialFiles: Outfile[] | undefined;

    let match;
    if (match = file.path.match(ARRAY_FILE)) {
      const groups = match.groups!;
      const exportedArray = file.module!.require().default as [string, string][];
      specialFiles = exportedArray.map(([slug, content]) => {
        const filepath = file.path.replace(groups["slug"]!, slug);
        return { path: filepath, content };
      });
    }
    else if (match = file.path.match(FILE)) {
      const content = file.module!.require().default;
      specialFiles = [{ path: file.path, content }];
    }

    if (specialFiles) {
      for (const file of specialFiles) {
        file.path = file.path.slice(0, -3);

        const ext = path.extname(file.path);
        const fn = contentProcessors[ext];
        if (fn) file.content = fn(file.content);

        outfiles.set(file.path, file.content);
      }
    }
    else {
      outfiles.set(file.path, file.content);
    }
  }

  return outfiles;
};
