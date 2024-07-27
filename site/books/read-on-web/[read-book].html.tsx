import handlers from "handlers!";
import { LoadingLine, LoadingParagraph } from "../../components/$loading.js";
import { Typography } from "../../components/$typography.js";
import { Navlinks } from "../../components/navlinks.js";
import { EmptyPage } from "../../components/page.js";
import { Rating } from "../../components/rating.js";
import { SiteFooter } from "../../components/site-footer.js";
import { allBooks } from "../../model/books.js";
import { allSnippets } from "../../model/snippets.js";
import { markdown, sortBy } from "../../util/helpers.js";

handlers.set('/reorder-snippets-in-book', (body) => {
  const json = JSON.parse(body) as { slug: string, i: number }[];
  for (const { i, slug } of json) {
    const s = allSnippets.find(s => slug === s.slug)!;
    s.data.sortOrder = i;
    s.save();
  }
  return '/';
});

export default allBooks.filter(book => book.data.complete).map(book => {
  const orderedSnippets = [...book.snippets];
  orderedSnippets.sort(sortBy(s => s.data.sortOrder ?? 0));

  const file = book.data.files[0]!;

  return [book.slug, <>
    <EmptyPage>

      <link rel="stylesheet" href='/css/page/read-book.css' />
      <script type='module' src='./$read-whole-book.js' data-book={book.slug} />

      <main>

        <Navlinks page="Books" />

        <section>

          <div id='link-scroll-area'>

            <Typography>
              <h2><a href={book.route}>{book.data.title}</a></h2>
              <p class="subtitle">{book.data.subtitle}</p>
              <p>By <span class="author">{book.data.author}</span></p>
              <p><Rating n={book.data.rating} /></p>
              {markdown.render(book.content)}
            </Typography>

            <hr />

            <h3>Chapter Index</h3>
            <div id="readonline-chapters">
              <LoadingLine width="3em" />
              <LoadingLine width="20em" />
              <LoadingLine width="3em" />
              <LoadingLine width="20em" />
              <LoadingLine width="3em" />
              <LoadingLine width="20em" />
            </div>

          </div>

          <div id='chapter-bodies'>
            <Typography>
              <LoadingLine width="20em" />
              <blockquote>
                <LoadingParagraph lines={4} />
                <LoadingParagraph lines={4} />
                <LoadingParagraph lines={4} />
              </blockquote>
            </Typography>
          </div>

          <iframe src={`https://archive.org/details/${file.archiveId}?view=theater`} />

        </section>

        <SiteFooter thin />

      </main>

    </EmptyPage>
  </>];
});
