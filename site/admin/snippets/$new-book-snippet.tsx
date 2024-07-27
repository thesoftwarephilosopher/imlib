import MarkdownIt from 'https://cdn.jsdelivr.net/npm/markdown-it@13.0.2/+esm';
import { mdOptions } from '../../components/$markdown.js';
import { SnippetJson } from '../../scripts/data/snippets/[snippet].json.js';
import { calculateReadingMins } from '../../util/$helpers.js';
import { slugify } from '../util/$helpers.js';
import { loadMonaco } from '../util/$monaco.js';

const monaco = await loadMonaco();

window.addEventListener('beforeunload', (e) => {
  e.returnValue = 'Abandon all changes!?';
});

const md = MarkdownIt(mdOptions);

const params = new URLSearchParams(window.location.search);
const slug = params.get('snippet');

if (slug) {
  const snippet = await fetch(`/scripts/data/snippets/${slug}.json`).then<SnippetJson>(res => res.json());
  const snippet2 = snippet.nextSnippet ? await fetch(`/scripts/data/snippets/${snippet.nextSnippet}.json`).then<SnippetJson>(res => res.json()) : null;

  document.querySelector<HTMLInputElement>('input[name=archivePage]')!.value = snippet.archivePage;
  document.querySelector<HTMLInputElement>('input[name=archiveSlug]')!.value = snippet.archiveSlug;
  document.querySelector<HTMLInputElement>('input[name=bookSlug]')!.value = snippet.bookSlug;
  document.querySelector('iframe')!.src = snippet.archiveLink;
  document.getElementById('old-body')!.replaceChildren(
    <>
      {snippet.archivePage}
      <div innerHTML={md.render(snippet.content)} />
      <hr />
      <hr />
      <hr />
      {snippet2 && <>
        {snippet2.archivePage}
        <div innerHTML={md.render(snippet2.content)} />
      </>}
    </>
  );
}
else {
  document.querySelector<HTMLInputElement>('input[name=bookSlug]')!.value = params.get('book')!;
  document.querySelector<HTMLInputElement>('input[name=archiveSlug]')!.value = params.get('scan')!;
  document.querySelector('iframe')!.src = `https://archive.org/details/${params.get('scan')}?view=theater`;
}


const addTagButton = document.getElementById('addtag')!;

const tags = await fetch('../util/tags.json').then(res => res.json());
for (const tag of tags) {
  addTagButton.parentElement!.insertAdjacentElement('beforebegin',
    <li>
      <label>
        <input type='checkbox' name='tags' value={tag} /> {tag}
      </label>
    </li> as HTMLLIElement
  );
}

addTagButton.onclick = (e) => {
  e.preventDefault();
  const li = <li>
    <label>
      <input type='input' name='tags' />
    </label>
  </li> as HTMLLIElement;
  addTagButton.parentElement!.insertAdjacentElement('beforebegin', li);
  li.querySelector('input')!.focus();
};

const titleInput = document.querySelector<HTMLInputElement>('input[name=title]')!;
const slugInput = document.querySelector<HTMLInputElement>('input[name=slug]')!;
const contentInput = document.querySelector<HTMLTextAreaElement>('textarea[name=markdownContent]')!;
const previewArea = document.getElementById('previewarea') as HTMLDivElement;
const readingMinsEl = document.getElementById('readingmins') as HTMLSpanElement;

const fixupButton = document.getElementById('fixup-button')!;

fixupButton.onclick = (e) => {
  e.preventDefault();

  editor.getModel()!.pushStackElement();

  let sels = editor.getSelections()!;
  if (sels.every((sel: any) => sel.isEmpty())) {
    sels = [editor.getModel()!.getFullModelRange() as any];
  }

  editor.executeEdits('admin', sels.map((sel: any) => {
    const content = editor.getModel()!.getValueInRange(sel);
    const fixedContent = (content
      .trimEnd()
      .replace(/ {2,}/g, ' ')
      .replace(/ ;/g, ';')
      .replace(/ ?— ?/g, '—')
      .replace(/ :/g, ';')
      .replace(/- /g, '')
      .replace(/ !/g, '!')
      .replace(/ \?/g, '?')
      .replace(/(\r?\n)+/gm, '\n\n')
      .replace(/^/gm, '> ')
      .replace(/ aud /g, " and ")
      + '\n');

    return {
      range: sel,
      text: fixedContent,
    };
  }));
}

titleInput.addEventListener('input', (e) => {
  slugInput.value = slugify(titleInput.value);
});

let wordWrap = true;

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

editor.addAction({
  id: 'toggle-word-wrap',
  label: 'Toggle Word Wrap',
  keybindings: [monaco.KeyMod.Alt | monaco.KeyCode.KeyZ],
  run: () => {
    wordWrap = !wordWrap;
    editor.updateOptions({
      wordWrap: wordWrap ? 'on' : 'off',
    });
  }
});

editor.addAction({
  id: 'make-italic',
  label: 'Make Italic',
  keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyI],
  run: () => {
    editor.getModel()!.pushStackElement();

    let sels = editor.getSelections()!;
    if (sels.every((sel: any) => sel.isEmpty())) {
      sels = [editor.getModel()!.getFullModelRange() as any];
    }

    editor.executeEdits('admin', sels.map((sel: any) => ({
      range: sel,
      text: `*${editor.getModel()!.getValueInRange(sel)}*`,
    })));
  }
});

editor.addAction({
  id: 'make-bold',
  label: 'Make Bold',
  keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyB],
  run: () => {
    editor.getModel()!.pushStackElement();

    let sels = editor.getSelections()!;
    if (sels.every((sel: any) => sel.isEmpty())) {
      sels = [editor.getModel()!.getFullModelRange() as any];
    }

    editor.executeEdits('admin', sels.map((sel: any) => ({
      range: sel,
      text: `**${editor.getModel()!.getValueInRange(sel)}**`,
    })));
  }
});

editor.getModel()!.onDidChangeContent(() => {
  const content = editor.getModel()!.getValue();
  contentInput.value = content;
  previewArea.innerHTML = md.render(content);
  readingMinsEl.innerHTML = calculateReadingMins(content) + ' min';
});
