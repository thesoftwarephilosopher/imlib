import * as fs from "fs";
import * as path from "path";
import { File } from "./file.js";

/** @deprecated */
export const postProcessors: Record<string, PostProcessor> = {
  html: hoistHtml,
  json: JSON.stringify,
};

/** @deprecated */
export function hoistHtml(jsx: string) {
  const hoisted = new Set<string>();
  return (jsx
    .replace(/<script .+?><\/script>|<link .+?>/g, (s, s2) => {
      hoisted.add(s);
      return '';
    })
    .replace(/<\/head>/, [...hoisted, '</head>'].join('')));
}

/** @deprecated */
export type PostProcessor = (s: any) => string;

/** @deprecated */
export function postProcess(f: Outfile): Outfile {
  const ext = f.path.match(/\.(.+)$/)![1];
  if (ext && ext in postProcessors) {
    const fn = postProcessors[ext] ?? (s => s);
    f.content = fn(f.content);
  }
  return f;
}

/** @deprecated */
export interface Outfile {
  path: string;
  content: string | Buffer;
}

/** @deprecated */
export type ProcFn = (file: File, captureGroups: Record<string, string>) => Outfile | Outfile[];
/** @deprecated */
export type Processor = [RegExp, ProcFn];

/** @deprecated */
export const skip: ProcFn = () => [];
/** @deprecated */
export const asIs: ProcFn = (f) => f;

/** @deprecated */
export const ProcessTsArrayFile: Processor = [/\/.*(?<slug>\[.+\]).*\.(?<ext>.+)\.js$/, (file, groups) => {
  const array = file.module!.require().default as [string, string][];
  return array.map(([slug, content]) => {
    const filepath = file.path.replace(groups["slug"]!, slug);
    return postProcess({ path: filepath.slice(0, -3), content });
  });
}];

/** @deprecated */
export const ProcessTsFile: Processor = [/\.(?<ext>.+)\.js$/, (file, groups) => {
  const content = file.module!.require().default;
  return postProcess({ path: file.path.slice(0, -3), content });
}];

/** @deprecated */
export const ProcessAnyFile: Processor = [/./, asIs];

/** @deprecated */
export const defaultProcessors: Processor[] = [
  ProcessTsArrayFile,
  ProcessTsFile,
  ProcessAnyFile,
];

/** @deprecated */
export type SiteProcessor = (files: Iterable<File>, processors?: Processor[]) => Map<string, Buffer | string>;

export const processSite: SiteProcessor = (files, processors = defaultProcessors) => {
  const outfiles = new Map<string, Buffer | string>();

  for (const file of files) {
    const proc = processors.find(([r]) => file.path.match(r))!;
    const [r, fn] = proc;

    const match = file.path.match(r)!;
    const processed = fn(file, match.groups!);
    const normalized = Array.isArray(processed) ? processed : [processed];

    for (const { path, content } of normalized) {
      outfiles.set(path, content);
    }
  }

  return outfiles;
};

/**
 * Place all files under `from` into `to` in the emitted website.
 * @param from pwd-relative dir to emit files from, e.g. "node_modules/@tabler/icons-sprite/dist/" or "site/some-data/"
 * @param to absolute out dir to emit all files to, e.g. "/vendor/tabler-sprites/"
 * @param out a map to place files into (e.g. output of `processSite`)
 */
export function vendor(from: string, to: string, out: Map<string, string | Buffer>) {
  const all = fs.readdirSync(from, { recursive: true, encoding: 'utf8' });
  for (const base of all) {
    const full = path.join(from, base);
    const inpath = full.split(path.sep).join(path.posix.sep);
    if (fs.statSync(inpath).isFile()) {
      const content = fs.readFileSync(inpath);
      const outpath = path.posix.join('/', to, ...base.split(path.sep));
      out.set(outpath, content);
    }
  }
}
