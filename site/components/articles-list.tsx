import { allArticles } from "../model/articles.js";
import { formatDate } from "../util/$format-date.js";
import { LoadingParagraph } from "./$loading.js";
import { PaginatorLoading } from "./paginator.js";

export const ArticlesList = () => <>
  <script type='module' src='/scripts/$paginate.js' />
  <div>
    <h2>All Articles</h2>
    <div data-paginate='7'>
      <div>
        <PaginatorLoading />
        <LoadingParagraph lines={2} />
        <LoadingParagraph lines={2} />
        <LoadingParagraph lines={2} />
        <LoadingParagraph lines={2} />
        <LoadingParagraph lines={2} />
        <LoadingParagraph lines={2} />
        <LoadingParagraph lines={2} />
      </div>
      <div hidden>
        {allArticles.map(article => <>
          <p>
            <a class="title" href={article.route}>{article.data.title}</a><br />
            <small>{article.mins} min &bull; {formatDate(article.date)}</small>
          </p>
        </>)}
      </div>
    </div>
  </div>
</>;
