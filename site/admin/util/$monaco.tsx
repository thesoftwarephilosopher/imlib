export type Monaco = typeof import('monaco-editor');

export function loadMonaco(): Promise<Monaco> {
  return new Promise<Monaco>(resolve => {
    function resolveMonacoEventually() {
      const monaco = (window as any).monaco;
      if (monaco) {
        resolve(monaco);
      }
      else {
        setTimeout(resolveMonacoEventually, 100);
      }
    }

    const scripts = [
      "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.43.0/min/vs/loader.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.43.0/min/vs/editor/editor.main.nls.js",
      "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.43.0/min/vs/editor/editor.main.js",
    ];

    let count = scripts.length;
    function loaded() {
      count--;
      if (count === 0) {
        resolveMonacoEventually();
      }
    }

    (window as any).require = { paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.43.0/min/vs' } };
    document.body.append(<>
      <link rel="stylesheet" data-name="vs/editor/editor.main" href="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.43.0/min/vs/editor/editor.main.min.css" />
      {scripts.map(src =>
        <script onload={loaded} src={src} />
      )}
    </>);
  });
}
