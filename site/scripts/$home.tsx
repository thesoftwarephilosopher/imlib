import MarkdownIt from 'https://cdn.jsdelivr.net/npm/markdown-it@13.0.2/+esm';
import { HomeLoading } from '../components/$loading.js';
import { mdOptions } from '../components/$markdown.js';
import { formatDate } from "../util/$format-date.js";
import { randomElement, sleep } from './$util.js';
import { SnippetJson } from './data/snippets/[snippet].json.js';

const snippetIds = fetch('/scripts/data/snippet-ids.json').then<string[]>(res => res.json());

const markdown = MarkdownIt(mdOptions);

const doRandomBookSnippetReal = (e: Event) => {
  e.preventDefault();
  doRandomBookSnippet(randomElement);
};

let alreadyLoaded = false;

window.addEventListener('popstate', e => {
  if (e.state) {
    reflectUrl(e.state);
  }
});

if (window.location.hash) {
  reflectUrl(window.location.hash.slice(1));
}
else {
  const yearStart = new Date(new Date().getFullYear(), 0, 1).getTime();
  const yearDuration = (1000 * 60 * 60 * 24 * 365);
  const now = Date.now();
  const percent = (now - yearStart) / yearDuration;
  doRandomBookSnippet(slugs => slugs[Math.floor(percent * slugs.length)]!);
}

async function reflectUrl(slug: string) {
  const container = document.getElementById('random-book-snippet') as HTMLDivElement;

  container.replaceChildren((<HomeLoading />));

  const fetching = fetch(`/scripts/data/snippets/${slug}.json`).then<SnippetJson>(res => res.json());

  await sleep(alreadyLoaded ? .3 : 1);
  alreadyLoaded = true;

  const snippet = await fetching;

  const renderedBody = markdown.render(snippet.content);

  const PREVIEW_LINES = 15;
  const AVERAGE_LINE_LENGTH = 50;
  let previewMarkdown;
  const previewSplitSpot = snippet.content.indexOf(' ', PREVIEW_LINES * AVERAGE_LINE_LENGTH);
  if (previewSplitSpot !== -1) {
    previewMarkdown = snippet.content.slice(0, previewSplitSpot) + ' ...';
  }

  container.replaceChildren(<>
    <p>(Read <a href='#' onclick={doRandomBookSnippetReal}>another</a>)</p>

    <h3><a href={snippet.route}>{snippet.renderedTitle}</a></h3>
    <p><small>{snippet.mins} min &bull; Digitized on {formatDate(snippet.date)}</small></p>
    <p>
      From <a href={snippet.bookRoute}>{snippet.bookTitle}</a>
      , page <a rel="noopener" target='_blank' href={snippet.archiveLink}>{snippet.archivePage}</a>
      <br />
      <small>By {snippet.bookAuthor}</small>
    </p>
    <div>
      {previewMarkdown
        ? <>
          <div innerHTML={markdown.render(previewMarkdown)} />
          <p><a href='#' onclick={(function (this: HTMLAnchorElement, e: Event) {
            e.preventDefault();
            this.parentElement!.parentElement!.innerHTML = renderedBody;
          }) as any}><i>Continue reading...</i></a></p>
        </>
        : <div innerHTML={renderedBody} />}
    </div>
  </>);
}

async function doRandomBookSnippet(fn: (slugs: string[]) => string) {
  const slug = fn(await snippetIds);
  history.pushState(slug, '');
  reflectUrl(slug);
}
