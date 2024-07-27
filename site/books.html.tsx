import { LoadingLine, LoadingParagraph } from './components/$loading.js';
import { Admin } from './components/admin.js';
import { Spaced, SplitColumn } from './components/column.js';
import { TypicalPage } from './components/page.js';
import { PaginatorLoading } from './components/paginator.js';
import { makeTabs } from './components/tabs.js';

export const BookTabs = makeTabs([
  { href: '/books.html', title: 'Books' },
  { href: '/snippets.html', title: 'Book Snippets' },
]);

export default <>
  <TypicalPage title={<BookTabs index={0} /> as string} image='/img/categories/reference-big.jpg' page='Books'>

    <Spaced>
      <SplitColumn>

        <div>

          <script src='/scripts/$books-page.js' type='module'></script>
          <link rel="stylesheet" href='/css/page/books.css' />

          <h2>Find Books</h2>
          <div class='filters-container'>
            <LoadingLine width="100%" height='2.4em' />
            <div class='books-filters'>
              <LoadingLine width="4em" />
              <LoadingLine width="9em" />
              <LoadingLine width="2em" />
              <LoadingLine width="14em" />
              <LoadingLine width="4em" />
              <LoadingLine width="100%" height='2em' />
              <LoadingLine width="4em" />
              <LoadingLine width="100%" height='2em' />
            </div>
            <hr />
            <br /><LoadingLine width="12em" />
            <br /><LoadingLine width="12em" />
          </div>

          <Admin>
            <p><a href='/admin/books/new-book.html'>New book</a></p>
          </Admin>

        </div>

        <div>

          <h2>Showing <span class='search-count' /> books</h2>
          <div class='search-results'>
            <PaginatorLoading />
            <ul>
              <li><LoadingParagraph lines={2} /></li>
              <li><LoadingParagraph lines={2} /></li>
              <li><LoadingParagraph lines={2} /></li>
              <li><LoadingParagraph lines={2} /></li>
              <li><LoadingParagraph lines={2} /></li>
              <li><LoadingParagraph lines={2} /></li>
              <li><LoadingParagraph lines={2} /></li>
            </ul>
          </div>

        </div>

      </SplitColumn>
    </Spaced>

  </TypicalPage>
</>;
