import { LoadingParagraph } from "../../components/$loading.js";
import { Typography } from "../../components/$typography.js";
import { CenteredColumn, Spaced, SplitColumn } from "../../components/column.js";
import { TypicalPage } from "../../components/page.js";
import { PaginatorLoading } from "../../components/paginator.js";
import { Rating } from "../../components/rating.js";
import { allCategories } from "../../model/categories.js";
import { markdown } from "../../util/helpers.js";

export default allCategories.map(cat => [cat.slug, <>
  <TypicalPage title="Book Categories" image={`/img/categories/${cat.slug}-big.jpg`} page="Books">

    <Spaced>
      <CenteredColumn>
        <Typography>

          <h2>{cat.data.title}</h2>
          {markdown.render(cat.content)}

        </Typography>
      </CenteredColumn>
    </Spaced>

    <Spaced>
      <SplitColumn>

        <script type='module' src='/scripts/$paginate.js' />

        <section>
          <h2>Books</h2>
          <div data-paginate='7'>
            <div>
              <PaginatorLoading />
              <LoadingParagraph lines={3} />
              <LoadingParagraph lines={3} />
              <LoadingParagraph lines={3} />
              <LoadingParagraph lines={3} />
              <LoadingParagraph lines={3} />
              <LoadingParagraph lines={3} />
              <LoadingParagraph lines={3} />
            </div>
            <div hidden>
              {cat.books.map(book => {
                return <div>
                  <p>
                    <a href={book.route}>{book.data.title}</a>
                    {book.data.subtitle && <>: {book.data.subtitle}</>} { }
                    <Rating n={book.data.rating} />
                    <br />
                    <small>{book.data.author}</small>
                  </p>

                  <Typography style='font-size:smaller; margin-left:1em'>
                    {markdown.render(excerpt(book.content))}
                  </Typography>
                </div>;
              })}
            </div>
          </div>
        </section>

        <section>
          <h2>Snippets</h2>
          <div data-paginate='10'>
            <div>
              <PaginatorLoading />
              <LoadingParagraph lines={3} />
              <LoadingParagraph lines={3} />
              <LoadingParagraph lines={3} />
              <LoadingParagraph lines={3} />
              <LoadingParagraph lines={3} />
              <LoadingParagraph lines={3} />
              <LoadingParagraph lines={3} />
            </div>
            <div hidden>
              {cat.books
                .filter(book => book.snippets.length > 0)
                .map(book => <>
                  <h3>{book.data.title}</h3>
                  {book.snippets.map(bookSnippet => <>
                    <p>
                      p.{bookSnippet.data.archivePage} { }
                      <a href={bookSnippet.route}>{bookSnippet.renderedTitle}</a>
                    </p>
                  </>)}
                </>)}
            </div>
          </div>
        </section>

      </SplitColumn>
    </Spaced>

  </TypicalPage >
</>]);

function excerpt(s: string) {
  return s.split(/\r?\n\r?\n/)[0]!;
}
