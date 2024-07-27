import MarkdownIt from 'https://cdn.jsdelivr.net/npm/markdown-it@13.0.2/+esm';
import { mdOptions } from '../../components/$markdown.js';
import { calculateReadingMins } from '../../util/$helpers.js';
import { slugify } from '../util/$helpers.js';
import { loadMonaco } from '../util/$monaco.js';

const monaco = await loadMonaco();

window.addEventListener('beforeunload', (e) => {
  e.returnValue = 'Abandon all changes!?';
});

const md = MarkdownIt(mdOptions);

const titleInput = document.querySelector<HTMLInputElement>('input[name=title]')!;
const slugInput = document.querySelector<HTMLInputElement>('input[name=slug]')!;
const contentInput = document.querySelector<HTMLTextAreaElement>('textarea[name=markdownContent]')!;
const previewArea = document.getElementById('previewarea') as HTMLDivElement;
const readingMinsEl = document.getElementById('readingmins') as HTMLSpanElement;

titleInput.addEventListener('input', (e) => {
  slugInput.value = slugify(titleInput.value);
});

const editor = monaco.editor.create(document.getElementById('editorarea')!, {
  value: '',
  theme: 'vs-dark',
  language: 'markdown',
  wordWrap: 'on',
  tabSize: 2,
  suggest: {
    showWords: false,
  },
});

editor.focus();

editor.getModel()!.onDidChangeContent(() => {
  const content = editor.getModel()!.getValue();
  contentInput.value = content;
  previewArea.innerHTML = md.render(content);
  readingMinsEl.innerHTML = calculateReadingMins(content) + ' min';
});
