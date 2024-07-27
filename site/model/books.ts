import allBookFiles from "../data/books/";
import { DataFile } from "../util/data-files.js";
import { sortBy } from "../util/helpers.js";
import { Category } from "./categories.js";
import * as relations from "./relations.js";
import { Snippet } from "./snippets.js";

interface BookFile {
  title: string;
  subtitle: string;
  dateAdded: string;
  feastday?: string;
  author: string;
  translator: string;
  score: number;
  rating: number;
  files: {
    archiveId: string;
    pdfFile: string;
  }[];
  storeLinks: {
    link: string;
    title: string;
  }[];
  complete?: boolean;
  frontpage?: {
    image: string;
    why: string;
  },
}

export class Book extends DataFile<BookFile> {

  static override modelDir = 'books';

  route: string;

  constructor(slug: string, content: string, data: BookFile) {
    super(slug, content, data);
    this.route = `/books/${this.slug}.html`;
  }

  get categories(): Category[] {
    return relations.categories().forBook.get(this)!;
  }

  get imageBig(): string {
    return relations.categories().forBook.get(this)![0]!.imageBig;
  }

  get snippets(): Snippet[] {
    return relations.snippets().inBook.get(this)!;
  }

}

export const allBooks = (allBookFiles
  .map(file => Book.fromFile(file))
  .sort(sortBy(b => `${b.data.dateAdded} ${b.slug}`)));

export const booksBySlug = new Map(allBooks.map(book => [book.slug, book]));
