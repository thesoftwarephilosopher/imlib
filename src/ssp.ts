export type InFiles = ReturnType<Map<string, FsFile>['values']>;
export type SiteProcessor = (files: InFiles, outfiles: Map<string, Buffer | string>) => void;

export const processSite: SiteProcessor = (files, outfiles) => {
  for (const file of files) {
    for (const { path, content } of processFile(file)) {
      outfiles.set(path, content);
    }
  }
};

const isArrayFile = /\/.*(?<slug>\[.+\]).*\..+\.js$/;
const isSingleFile = /\.js$/;

export function processFile(file: FsFile): { path: string, content: string | Buffer }[] {
  const out = [];

  let match;
  if (match = file.path.match(isArrayFile)) {
    const exportedArray = file.module!.require().default as [string, any][];
    for (const [name, content] of exportedArray) {
      const filepath = file.path.replace(match.groups!["slug"]!, name);
      out.push({ path: filepath.slice(0, -3), content });
    }
  }
  else if (file.path.match(isSingleFile)) {
    const exportedContent = file.module!.require().default;
    out.push({ path: file.path.slice(0, -3), content: exportedContent });
  }
  else {
    out.push({ path: file.path, content: file.content });
  }

  return out;
}
