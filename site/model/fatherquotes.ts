import allFatherQuoteFiles from "../data/fatherquotes/";
import { DataFile } from '../util/data-files.js';

interface FatherQuoteFile {
  gospelQuote: string;
}

export class FatherQuote extends DataFile<FatherQuoteFile> {

  static override modelDir = 'fatherquotes';

  route: string;

  book: string;
  chapter: number;
  verse: number;

  constructor(slug: string, content: string, data: FatherQuoteFile) {
    super(slug, content, data);
    const [book, chapter, verse] = this.slug.split('-');
    this.book = book!;
    this.chapter = +chapter!;
    this.verse = +verse!;
    this.route = `/fathers/${this.slug}.html`;
  }

}

export const allFatherQuotes = (allFatherQuoteFiles
  .map(file => FatherQuote.fromFile(file)));
