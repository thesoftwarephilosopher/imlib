import allSnippetFiles from "../data/snippets/";
import { calculateReadingMins } from '../util/$helpers.js';
import { DataFileWithDate } from "../util/data-files.js";
import { markdown, sortBy } from "../util/helpers.js";
import { Book } from './books.js';
import * as relations from "./relations.js";
import { addTags } from './tag.js';

interface SnippetFile {
  published: boolean;
  title: string;
  archiveSlug: string;
  archivePage: string;
  bookSlug: string;
  tags: string[];
  sortOrder?: number;
}

export class Snippet extends DataFileWithDate<SnippetFile> {

  static override modelDir = 'snippets';

  route: string;
  archiveLink: string;
  renderedBody: string;
  renderedTitle: string;
  mins: number;

  prevSnippet?: Snippet;
  nextSnippet?: Snippet;
  tags: string[];

  constructor(slug: string, content: string, data: SnippetFile) {
    super(slug, content, data);

    this.data.tags ??= [];

    this.route = `/snippets/${this.slug}.html`;

    this.archiveLink = `https://archive.org/details/${this.data.archiveSlug}/page/${this.data.archivePage}?view=theater`;
    this.renderedBody = markdown.render(this.content);
    this.renderedTitle = markdown.renderInline(this.data.title);
    this.mins = calculateReadingMins(this.content);

    this.tags = [...this.data.tags].sort();
    addTags(this.tags);
  }

  get book(): Book {
    return relations.snippets().book.get(this)!;
  }

}

export const allSnippets = (allSnippetFiles
  .map(file => Snippet.fromFile(file))
  .filter((s => s.data.published))
  .sort(sortBy(s => s.slug))
  .reverse());
