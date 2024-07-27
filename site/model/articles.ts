import allArticleFiles from '../data/articles/';
import { calculateReadingMins } from '../util/$helpers.js';
import { DataFileWithDate } from '../util/data-files.js';
import { sortBy } from '../util/helpers.js';

interface ArticleFile {
  title: string;
  draft?: boolean;
  imageFilename?: string;
  imageCaption?: string;
}

export class Article extends DataFileWithDate<ArticleFile> {

  static override modelDir = 'articles';

  mins: number;
  route: string;

  constructor(slug: string, content: string, data: ArticleFile) {
    super(slug, content, data);
    this.route = `/articles/${this.slug}.html`;
    this.mins = calculateReadingMins(this.content);
  }

}

export const allArticles = (allArticleFiles
  .map(file => Article.fromFile(file))
  .sort(sortBy(article => article.date))
  .filter(s => !s.data.draft)
  .reverse());
