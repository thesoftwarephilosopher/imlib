import * as path from "path";
import dirFiles from './';

const fontFiles = dirFiles.filter(f => f.path.endsWith('.woff'));
const fontGroups = Map.groupBy(fontFiles, f => f.path.split('/')[2]!);

export function Font(attrs: { name: string }, children: any) {
  const dir = fontGroups.get(attrs.name)!;
  return <>
    <div style={`font-family: ${attrs.name}`}>
      {dir.map(file =>
        <link rel="preload" href={file.path} as="font" type="font/woff" crossorigin />
      )}
      <link rel="stylesheet" href={`/fonts/${attrs.name}.css`} />
      {children}
    </div>
  </>;
}

export default [...fontGroups].map(([name, dir]) => {
  const lines = dir.map(file => {
    const route = file.path;
    const weight = path.basename(file.path).match(/\d+/)![0];
    return /*css*/ `@font-face {
      font-display: block;
      font-family: ${name};
      font-weight: ${weight};
      src: url(${route});
      font-display: fallback;
    }`;
  });
  return [name, lines.join('\n')];
});
