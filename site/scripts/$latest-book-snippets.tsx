import { SnippetJson } from "./data/snippets.json.js";
import { randomElement, sleep } from "./$util.js";

const snippetsFetch = fetch('/scripts/data/snippets.json').then<SnippetJson[]>(res => res.json());
await sleep(location.pathname === '/' ? 1 : .3);
const allSnippets = await snippetsFetch;
const latestSnippets = allSnippets.slice(0, 7);

document.getElementById('latest-book-snippets-area')!.replaceChildren(<>
  <p>Read a <a href='#' onclick={function (this: HTMLAnchorElement) {
    this.href = randomElement(allSnippets).route;
  }}>random snippet</a> or <a href='/snippets.html'>see all digitized snippets</a>.</p>
  <ul>
    {latestSnippets.map(snippet =>
      <li>
        <p>
          <a href={snippet.route}>{snippet.title}</a>
          <br />
          {snippet.mins} min &bull; {snippet.bookTitle}
        </p>
      </li>
    )}
  </ul>
</>);
