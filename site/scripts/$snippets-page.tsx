import { Typography } from "../components/$typography.js";
import { Reactive } from "./$reactive.js";
import { createSearch, findWithinMarkdown, highlight } from "./$searchlist.js";
import { randomElement, sleep } from "./$util.js";
import { SnippetJson } from "./data/snippets.json.js";

const snippetsFetch = fetch('/scripts/data/snippets.json').then<SnippetJson[]>(res => res.json());
await sleep(.1);
const snippets = await snippetsFetch;

const tags = [...new Set(snippets.flatMap(s => s.tags))].sort();

const currentTag = new Reactive(new URL(window.location.href).searchParams.get('tag') ?? '_any');
const lengthFilter = new Reactive('');
const searchTerm = new Reactive('');

const { results, matchingItems } = createSearch({
  data: snippets,
  searchTerm,
  filters: [
    {
      source: currentTag,
      matches: (snippet: SnippetJson) => {
        if (currentTag.val === '_any') return true;
        if (currentTag.val === '_some') return snippet.tags.length > 0;
        if (currentTag.val === '_none') return snippet.tags.length === 0;
        return snippet.tags.includes(currentTag.val);
      },
    },
    {
      source: lengthFilter,
      matches: (snippet: SnippetJson) => {
        switch (lengthFilter.val) {
          case 'short': return snippet.mins < 3;
          case 'medium': return snippet.mins >= 3 && snippet.mins <= 5;
          case 'long': return snippet.mins >= 6 && snippet.mins <= 8;
          case 'very-long': return snippet.mins >= 9;
          case '': default: return true;
        }
      },
    },
    {
      source: searchTerm,
      matches: (snippet: SnippetJson) => (
        snippet.title.toLowerCase().includes(searchTerm.val) ||
        snippet.markdown.toLowerCase().includes(searchTerm.val) ||
        snippet.bookAuthor.toLowerCase().includes(searchTerm.val) ||
        snippet.bookTitle.toLowerCase().includes(searchTerm.val)
      ),
    },
  ],
  viewForItem: (snippet, search) => {
    const matchedBody = findWithinMarkdown(snippet.markdown, search);
    return (
      <li>
        <p>
          <a href={snippet.route}>{highlight(snippet.title, search)}</a>
          <br />
          {snippet.mins} min &bull; {highlight(snippet.bookTitle, search)}
        </p>
        {matchedBody && <>
          <Typography style='font-size:smaller' deindent>
            <blockquote innerHTML={matchedBody} />
          </Typography>
        </>}
      </li>
    );
  },
});

document.querySelector('.search-results')!.replaceChildren(results);

matchingItems.onChange(() => {
  document.querySelector('.search-count')!.textContent = matchingItems.val.length.toFixed();
});

const randomSnippetLink = <a href='#' onclick={function (this: HTMLAnchorElement, e: Event) {
  if (matchingItems.val.length === 0) {
    e.preventDefault();
    return;
  }

  this.href = randomElement(matchingItems.val).route;
}}>Random Snippet</a> as HTMLAnchorElement;

matchingItems.onChange(() => {
  randomSnippetLink.toggleAttribute('disabled', matchingItems.val.length === 0);
});

const searchInput = <input style='width: 100%' placeholder='Search' autofocus type="text" oninput={updateFromSearchInput} /> as HTMLInputElement;

if (window.location.hash) {
  searchInput.value = decodeURIComponent(window.location.hash.slice(1));
  updateFromSearchInput();
}

function updateFromSearchInput() {
  const term = searchInput.value.trim().toLowerCase();
  searchTerm.set(term);
  window.location.hash = '#' + encodeURIComponent(term);
}

document.querySelector('.filters-container')!.replaceChildren(<>
  <p>
    {searchInput}
  </p>
  <div class='snippets-filters'>

    <span class='label'>tag</span>
    <select onchange={function (this: HTMLSelectElement) { currentTag.set(this.value) }}>
      <optgroup label='Whether it has tags'>
        <option value='_any' selected={currentTag.val === '_any'}>Any</option>
        <option value='_some' selected={currentTag.val === '_some'}>Some</option>
        <option value='_none' selected={currentTag.val === '_none'}>None</option>
      </optgroup>
      <optgroup label='Tags'>
        {tags.map(tag =>
          <option value={tag} selected={currentTag.val === tag}>{tag}</option>
        )}
      </optgroup>
    </select>

    <span class='label'>minutes</span>
    <span class='radios'>
      <label><input type='radio' name='snippet-length' onclick={() => lengthFilter.set('')} checked />Any</label>
      <label><input type='radio' name='snippet-length' onclick={() => lengthFilter.set('short')} />1-2</label>
      <label><input type='radio' name='snippet-length' onclick={() => lengthFilter.set('medium')} />3-5</label>
      <label><input type='radio' name='snippet-length' onclick={() => lengthFilter.set('long')} />6-8</label>
      <label><input type='radio' name='snippet-length' onclick={() => lengthFilter.set('very-long')} />9+</label>
    </span>

  </div>
  <hr />
  <p>
    Not sure what to read?<br />
    Try a {randomSnippetLink} from these.
  </p>
</>);
