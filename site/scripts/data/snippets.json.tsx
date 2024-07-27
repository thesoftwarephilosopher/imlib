import { Snippet, allSnippets } from "../../model/snippets.js";

export type SnippetJson = ReturnType<typeof snippetToJson>;

function snippetToJson(snippet: Snippet) {
  return {
    slug: snippet.slug,
    route: snippet.route,
    title: snippet.renderedTitle,
    mins: snippet.mins,
    bookTitle: snippet.book.data.title,
    bookAuthor: snippet.book.data.author,
    tags: snippet.data.tags,
    markdown: snippet.content,
    book: snippet.data.bookSlug,
    archivePage: snippet.data.archivePage,
    archiveLink: snippet.archiveLink,
  };
}

export default allSnippets.map(snippetToJson);
