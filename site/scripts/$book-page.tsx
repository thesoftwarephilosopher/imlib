import { Typography } from "../components/$typography.js";
import { Reactive } from "./$reactive.js";
import { createSearch, findWithinMarkdown, highlight } from "./$searchlist.js";
import { randomElement, sleep } from "./$util.js";
import { SnippetJson } from "./data/snippets.json.js";

const snippetsFetch = fetch('/scripts/data/snippets.json').then<SnippetJson[]>(res => res.json());
await sleep(0.3);
const allSnippets = await snippetsFetch;

const container = document.getElementById('snippets-in-book') as HTMLDivElement;
const bookSlug = container.dataset['book'];
const snippetsInBook = allSnippets.filter(s => s.book === bookSlug);

if (snippetsInBook.length > 0) {
  const searchTerm = new Reactive('');

  const { results } = createSearch({
    data: snippetsInBook,
    perPage: 10,
    filters: [{
      source: searchTerm,
      matches: (snippet: SnippetJson) => (
        snippet.title.toLowerCase().includes(searchTerm.val) ||
        snippet.markdown.toLowerCase().includes(searchTerm.val) ||
        snippet.bookAuthor.toLowerCase().includes(searchTerm.val) ||
        snippet.bookTitle.toLowerCase().includes(searchTerm.val)
      )
    }],
    searchTerm,
    viewForItem: (snippet, search) => {
      const matchedBody = findWithinMarkdown(snippet.markdown, search);
      return <li>
        <p>
          p.{snippet.archivePage} { }
          <a href={snippet.route}>{highlight(snippet.title, search)}</a>
        </p>
        {matchedBody &&
          <Typography style='font-size:smaller' deindent>
            <blockquote innerHTML={matchedBody} />
          </Typography>
        }
      </li>;
    },
  });

  container.replaceChildren(<>
    <p>
      <a href='#' onclick={function (this: HTMLAnchorElement) {
        this.href = randomElement(snippetsInBook).route;
      }}>Random in book</a>
    </p>
    <input
      placeholder='Search within book'
      style='width: 100%'
      oninput={function (this: HTMLInputElement) {
        searchTerm.set(this.value.trim().toLowerCase())
      }}
    />
    {results}
  </>);
}
else {
  container.replaceChildren(
    <em>No snippets have been digitized for this book yet.</em>
  );
}
