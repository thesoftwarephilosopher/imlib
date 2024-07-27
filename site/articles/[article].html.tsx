import { Typography } from "../components/$typography.js";
import { ArticlesList } from "../components/articles-list.js";
import { Spaced, SplitColumn } from "../components/column.js";
import { TypicalPage } from "../components/page.js";
import { allArticles } from "../model/articles.js";
import { formatDate } from '../util/$format-date.js';
import { markdown } from "../util/helpers.js";

export default allArticles.map(article => [article.slug, <>
  <TypicalPage title="Articles" image={article.data.imageFilename ?? '/img/page/articles.jpg'} page="Articles">

    <Spaced>
      <SplitColumn>

        <div>
          <h2>{markdown.renderInline(article.data.title)}</h2>

          {article.data.imageCaption &&
            <p><small>(Image: {article.data.imageCaption})</small></p>
          }

          <p><small>{article.mins} min &bull; {formatDate(article.date)}</small></p>

          <style>{`.typography > p { text-indent: 1em; }`}</style>
          <Typography>
            {markdown.render(article.content)}
          </Typography>
        </div>

        <ArticlesList />

      </SplitColumn>
    </Spaced>

  </TypicalPage>
</>]);
