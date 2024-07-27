import MarkdownIt from 'https://cdn.jsdelivr.net/npm/markdown-it@13.0.2/+esm';
import { mdOptions } from '../../components/$markdown.js';
import { SnippetJson } from '../../scripts/data/snippets/[snippet].json.js';
import { loadMonaco } from '../util/$monaco.js';

const monaco = await loadMonaco();

const md = MarkdownIt(mdOptions);

const params = new URLSearchParams(window.location.search);
const slug = params.get('snippet')!;
const snippet = await fetch(`/scripts/data/snippets/${slug}.json`).then<SnippetJson>(res => res.json());

document.querySelector('iframe')!.src = snippet.archiveLink;

const contentInput = document.querySelector<HTMLTextAreaElement>('textarea[name=markdownContent]')!;
const previewArea = document.getElementById('previewarea') as HTMLDivElement;

const editor = monaco.editor.create(document.getElementById('editorarea')!, {
  value: snippet.content,
  theme: 'vs-dark',
  language: 'markdown',
  wordWrap: 'on',
  tabSize: 2,
});

processInput(snippet.content);
editor.getModel()!.onDidChangeContent(() => {
  processInput(editor.getModel()!.getValue());
});

function processInput(content: string) {
  const quotes = getQuotes(content);
  contentInput.value = JSON.stringify(quotes);
  previewArea.innerHTML = md.render(quotes.map(q => [
    `# ${q.book} ${q.chapter}:${q.verse}`,
    `### ${q.gospelQuote}`,
    `${q.commentaryQuotes}`,
  ].join('\n')).join('\n---\n---\n---\n'));
}

export interface Quote {
  book: string;
  chapter: number;
  verse: number;
  gospelQuote: string;
  commentaryQuotes: string;
}

function getQuotes(content: string): Quote[] {
  const parts = content.split('\n---\n');

  const book = parts.shift()!;
  const match = book.match(/^(\w+) (\d+):(\d+)$/);
  if (!match) return [];

  return parts.map((part, i) => {
    const lines = part.split(/\n/);
    const gospelQuote = lines.shift()!;
    if (!match[1] || !match[2] || !match[3]) return null;
    return {
      book: match[1],
      chapter: +match[2],
      verse: +match[3] + i,
      gospelQuote,
      commentaryQuotes: lines.join('\n'),
    };
  }).filter(p => p !== null);
}

let wordWrap = true;
editor.addAction({
  id: 'toggle-word-wrap',
  label: 'Toggle word wrap',
  keybindings: [monaco.KeyMod.Alt | monaco.KeyCode.KeyZ],
  run: () => {
    wordWrap = !wordWrap;
    editor.updateOptions({
      wordWrap: wordWrap ? 'on' : 'off',
    });
  }
});
