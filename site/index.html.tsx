import { HomeLoading } from "./components/$loading.js";
import { Typography } from "./components/$typography.js";
import { CenteredColumn, Spaced, SplitColumn } from "./components/column.js";
import { FadeIn } from "./components/fadein.js";
import { LatestSnippetsArea } from "./components/latest-snippets.js";
import { EmptyPage } from "./components/page.js";
import { QuickLinks } from "./components/quicklinks.js";
import { SiteFooter } from "./components/site-footer.js";
import { SiteHeader } from "./components/site-header.js";
import { VerifyHuman } from "./components/verifyhuman.js";
import { Markdown } from "./fathers.html.js";
import { allBooks } from "./model/books.js";

export default <>
  <EmptyPage>

    <VerifyHuman />

    <main>

      <SiteHeader page="Home" image="/img/page/home.jpg" title={
        <Spaced>
          <CenteredColumn>
            <Typography>
              <FadeIn>
                <h1 style='text-align:left'>Immaculata Library</h1>
                <blockquote style='border:none; padding:0'>
                  <Markdown>
                    "Have always at hand some approved book of devotion, and read a little of them every day with as much devotion as if you
                    were reading a letter which those saints had sent you from heaven to show you the way to it, and encourage you to come."
                  </Markdown>
                  <p style='margin-left:4em'>&mdash; St. Francis de Sales</p>
                  <p style='margin-left:2em'>
                    Introduction to the Devout Life, <a rel="noopener" href="/snippets/2021-06-26-how-we-should-do-holy-reading.html">page 77</a>
                  </p>
                </blockquote>
              </FadeIn>
            </Typography>
          </CenteredColumn>
        </Spaced> as string
      } />

      <Spaced>
        <SplitColumn>

          {/* <img
            srcset={[
              'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/William-Adolphe_Bouguereau_%281825-1905%29_-_Song_of_the_Angels_%281881%29.jpg/410px-William-Adolphe_Bouguereau_%281825-1905%29_-_Song_of_the_Angels_%281881%29.jpg 410w',
              // 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/William-Adolphe_Bouguereau_%281825-1905%29_-_Song_of_the_Angels_%281881%29.jpg/164px-William-Adolphe_Bouguereau_%281825-1905%29_-_Song_of_the_Angels_%281881%29.jpg 164w',
              // 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/William-Adolphe_Bouguereau_%281825-1905%29_-_Song_of_the_Angels_%281881%29.jpg/328px-William-Adolphe_Bouguereau_%281825-1905%29_-_Song_of_the_Angels_%281881%29.jpg 328w',
              // 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/William-Adolphe_Bouguereau_%281825-1905%29_-_Song_of_the_Angels_%281881%29.jpg/525px-William-Adolphe_Bouguereau_%281825-1905%29_-_Song_of_the_Angels_%281881%29.jpg 525w',
              // 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/William-Adolphe_Bouguereau_%281825-1905%29_-_Song_of_the_Angels_%281881%29.jpg/701px-William-Adolphe_Bouguereau_%281825-1905%29_-_Song_of_the_Angels_%281881%29.jpg 701w',
              // 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/William-Adolphe_Bouguereau_%281825-1905%29_-_Song_of_the_Angels_%281881%29.jpg/1401px-William-Adolphe_Bouguereau_%281825-1905%29_-_Song_of_the_Angels_%281881%29.jpg 1401w',
              // 'https://upload.wikimedia.org/wikipedia/commons/0/05/William-Adolphe_Bouguereau_%281825-1905%29_-_Song_of_the_Angels_%281881%29.jpg 3508w',
            ].join(', ')}
            width='400'
          /> */}

          <FadeIn>

            <div>
              <h2>Snippet of the Hour</h2>
              <Typography>
                <div id="random-book-snippet">
                  <HomeLoading />
                </div>
              </Typography>
            </div>
            <script type='module' src='/scripts/$home.js' />
          </FadeIn>

          <div>

            <FadeIn>
              <h2>Latest book snippets</h2>
              <LatestSnippetsArea />
            </FadeIn>

            <FadeIn>
              <h2>Recently added books</h2>
              <ul>
                {allBooks.toReversed().slice(0, 7).map(book => <>
                  <li>
                    <a href={book.route}>{book.data.title}</a> by {book.data.author}
                  </li>
                </>)}
              </ul>
            </FadeIn>

          </div>

        </SplitColumn>
      </Spaced>

    </main>

    <QuickLinks />
    <SiteFooter />

  </EmptyPage>
</>;
