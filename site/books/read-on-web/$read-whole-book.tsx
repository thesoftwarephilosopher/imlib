import MarkdownIt from 'https://cdn.jsdelivr.net/npm/markdown-it@13.0.2/+esm';
import { mdOptions } from '../../components/$markdown.js';
import { Typography } from '../../components/$typography.js';
import { SnippetJson } from "../../scripts/data/snippets.json.js";

const isDev = (window.location.hostname === 'localhost');

const markdown = MarkdownIt(mdOptions);

const bookSlug = document.querySelector<HTMLScriptElement>('script[data-book]')!.dataset['book']!;
const allSnippets = await fetch('/scripts/data/snippets.json').then<SnippetJson[]>(res => res.json());
const snippetSlugsInBook = await fetch(`/scripts/data/snippets/in-book-${bookSlug}.json`).then<string[]>(res => res.json());

const linksDiv = document.getElementById('readonline-chapters') as HTMLDivElement;
const bodiesDiv = document.getElementById('chapter-bodies') as HTMLDivElement;
const iframe = document.querySelector('iframe')!;

const snippetsInBook = snippetSlugsInBook.map(slug => {
  const snippet = allSnippets.find(s => s.slug === slug)!;
  return { ...snippet, content: markdown.render(snippet.markdown) };
});

function render() {
  linksDiv.replaceChildren(<>
    {snippetsInBook.map((bookSnippet, i) => <span class='chapter-link'>
      <span>Ch.{i + 1}</span>
      <a href={`#snippet-${bookSnippet.slug}`} onclick={(e: Event) => {
        e.preventDefault();
        localStorage.setItem(bookSlug, i.toString());
        navigateTo(i, { scrollBody: true });
      }}>
        {bookSnippet.title}
      </a>
    </span>)}
  </>);

  bodiesDiv.replaceChildren(<>
    <Typography>
      {snippetsInBook.map((bookSnippet, i) => <>
        <div class='chapter' id={`snippet-${bookSnippet.slug}`}>
          <h3 class='chapter-header'>
            Chapter {i + 1} &mdash; { }
            <a href={bookSnippet.route}>
              {bookSnippet.title}
            </a>
          </h3>
          <p><a href='#' onclick={(e: Event) => {
            e.preventDefault();
            iframe.src = bookSnippet.archiveLink;
          }}>(View in book reader)</a></p>
          {isDev &&
            <span>
              <button style='margin-left:2px' onclick={() => moveSnippet(i, -1)}>Move up</button>
              <button style='margin-left:2px' onclick={() => moveSnippet(i, +1)}>Move down</button>
            </span>
          }
          <div innerHTML={bookSnippet.content} />
          <hr />
        </div>
      </>)}
    </Typography>
  </>);
}

render();

const last = localStorage.getItem(bookSlug);
if (last !== null) {
  const i = +last;
  navigateTo(i, { scrollBody: false });

  iframe.onload = () => {
    iframe.onload = null;
    iframe.src = snippetsInBook[i]!.archiveLink;
  };
}

iframe.contentWindow?.addEventListener('message', (e) => {
  alert('Finally got Internet Archive BookReader.js iframe message, after all these years!');
});

function navigateTo(i: number, options: { scrollBody: boolean }) {
  const linksScroller = document.querySelector<HTMLDivElement>('#link-scroll-area')!;
  const link = document.querySelectorAll<HTMLDivElement>('#readonline-chapters a')[i]!;
  const linkY = link.offsetTop - linksScroller.offsetTop - (linksScroller.offsetHeight / 2) + (link.offsetHeight / 2);
  linksScroller.scrollTo({ top: linkY, behavior: 'smooth' });

  const bodyDiv = document.querySelectorAll<HTMLDivElement>('#chapter-bodies .chapter')[i]!;
  const bodyY = bodyDiv.offsetTop - bodiesDiv.offsetTop;
  bodiesDiv.scrollTo({ top: bodyY, behavior: options.scrollBody ? 'smooth' : 'instant' });

  for (const span of document.querySelectorAll('.chapter-link')) {
    span.classList.toggle('current', span === link.parentElement);
  }
}

function moveSnippet(i: number, by: number) {
  const j = i + by;
  if (j < 0 || j > snippetsInBook.length) return;

  const s = snippetsInBook[i]!;
  snippetsInBook.splice(i, 1);
  snippetsInBook.splice(j, 0, s);
  render();

  navigateTo(j, { scrollBody: false });

  saveOrder();
}

function saveOrder() {
  const json = snippetsInBook.map(({ slug }, i) => ({ slug, i }));
  fetch('/reorder-snippets-in-book', {
    method: 'POST',
    body: JSON.stringify(json),
  });
}
