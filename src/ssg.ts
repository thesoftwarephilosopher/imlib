import * as path from "path/posix";
import { File } from "./file";

const siteBase = process.env["IMLIB_SITEBASE"];

const extFns = {
  html: hoist,
  json: JSON.stringify,
};

const ARRAY_FILE_REGEX = /\[.+\]/;

export function processSite(files: Map<string, File>) {
  const outfiles = new Map<string, Buffer | string>();
  const isDev = !!process.env['DEV'];

  for (const { path, content } of files.values()) {
    if (!isDev && path.startsWith('/admin/')) continue;

    let match;
    if (match = path.match(/\.(.+)\.js$/)) {
      const ext = match[1] as keyof typeof extFns;
      const process = extFns[ext] ?? ((s: string) => s);

      const filepath = path.slice(0, -3);

      const exported = files.get(path)!.module?.require().default;

      if (path.match(ARRAY_FILE_REGEX)) {
        for (const [slug, jsx] of exported) {
          const filename = filepath.replace(ARRAY_FILE_REGEX, slug);
          outfiles.set(filename, process(jsx));
        }
      }
      else {
        outfiles.set(filepath, process(exported));
      }
    }
    else {
      if (path.endsWith('.md')) {
        // skip
      }
      else if (path.endsWith('.js') && !path.includes('$')) {
        // skip
      }
      else {
        outfiles.set(path, content);
      }
    }
  }

  outfiles.set('/sitemap.xml', makeSitemap(outfiles));

  return outfiles;

}

function hoist(jsx: string) {
  const hoisted = new Set<string>();
  return (jsx
    .replace(/<script .+?><\/script>|<link .+?>/g, (s, s2) => {
      hoisted.add(s);
      return '';
    })
    .replace(/<\/head>/, [...hoisted, '</head>'].join('')));
}

function makeSitemap(outfiles: Map<string, string | Buffer>) {
  return `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset 
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    >
      ${[...outfiles.keys()]
      .filter(filepath => filepath.endsWith('.html'))
      .map(filepath => {
        const name = path.basename(filepath);
        const date = name.match(/^(\d{4}-\d{2}-\d{2})-/)?.[1];
        return `
          <url>
            <loc>${siteBase}${filepath}</loc>
            ${date ? `<lastmod>${date}</lastmod>` : ''}
          </url>
        `;
      }).join('')}
    </urlset>
  `.trim();
}
