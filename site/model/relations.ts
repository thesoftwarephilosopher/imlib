import { sortBy } from "../util/helpers.js";
import { Book, allBooks, booksBySlug } from "./books.js";
import { Category, allCategories } from "./categories.js";
import { Snippet, allSnippets } from "./snippets.js";

export const categories = cached(() => {
  const books = new Map<Category, Book[]>();
  const forBook = new Map<Book, Category[]>();

  for (const category of allCategories) {
    for (const bookSlug of category.data.books) {
      const book = booksBySlug.get(bookSlug)!;

      let categories = forBook.get(book);
      if (!categories) forBook.set(book, categories = []);
      categories.push(category);

      let booksInCategory = books.get(category);
      if (!booksInCategory) books.set(category, booksInCategory = []);
      booksInCategory.push(book);
    }
  }

  return { books, forBook };
});

export const snippets = cached(() => {
  const inBook = new Map<Book, Snippet[]>();
  const book = new Map<Snippet, Book>();

  for (const book of allBooks) {
    inBook.set(book, []);
  }

  for (const snippet of allSnippets) {
    const bookForSnippet = booksBySlug.get(snippet.data.bookSlug)!;
    book.set(snippet, bookForSnippet);
    inBook.get(bookForSnippet)!.push(snippet);
  }

  for (const snippets of inBook.values()) {
    snippets.sort(sortBy(s => {
      if (s.data.sortOrder !== undefined)
        return s.data.sortOrder;

      return s.data.archivePage.startsWith('n')
        ? +s.data.archivePage.slice(1) - 1000
        : +s.data.archivePage;
    }));

    for (let i = 1; i < snippets.length; i++) {
      const s1 = snippets[i - 1];
      const s2 = snippets[i];
      s1!.nextSnippet = s2!;
      s2!.prevSnippet = s1!;
    }
  }

  return { inBook, book };
});

function cached<T>(fn: () => T): () => T {
  let d: T;
  return () => {
    if (!d) d = fn();
    return d;
  };
}
