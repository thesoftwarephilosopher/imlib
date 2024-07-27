import { BookTabs } from './books.html.js';
import { LoadingLine, LoadingParagraph } from './components/$loading.js';
import { Spaced, SplitColumn } from './components/column.js';
import { TypicalPage } from './components/page.js';
import { PaginatorLoading } from './components/paginator.js';

export default <>
  <TypicalPage title={<BookTabs index={1} /> as string} image='/img/categories/reference-big.jpg' page='Books'>

    <Spaced>
      <SplitColumn>

        <div>

          <script type='module' src='/scripts/$snippets-page.js' />
          <link rel="stylesheet" href='/css/page/snippets.css' />

          <h2>Find Book Snippets</h2>
          <div class='filters-container'>
            <LoadingLine width="100%" height="2em" />
            <div class='snippets-filters' style='align-items:center'>
              <LoadingLine width="2em" />
              <LoadingLine width="100%" height="2em" />
              <LoadingLine width="4em" />
              <LoadingLine width="12em" height="2em" />
            </div>
            <hr />
            <br /><LoadingLine width="12em" />
            <br /><LoadingLine width="12em" />
          </div>

        </div>

        <div>

          <h2>Showing <span class='search-count' /> book snippets</h2>
          <div class='search-results'>
            <PaginatorLoading />
            <ul>
              <li><LoadingParagraph lines={3} /></li>
              <li><LoadingParagraph lines={3} /></li>
              <li><LoadingParagraph lines={3} /></li>
              <li><LoadingParagraph lines={3} /></li>
              <li><LoadingParagraph lines={3} /></li>
              <li><LoadingParagraph lines={3} /></li>
              <li><LoadingParagraph lines={3} /></li>
            </ul>
          </div>

        </div>

      </SplitColumn>
    </Spaced>

  </TypicalPage>
</>;
