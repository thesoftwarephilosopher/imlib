import { Spaced, SplitColumn } from "./components/column.js";
import { TypicalPage } from "./components/page.js";
import { markdown } from "./util/helpers.js";

export function Markdown(attrs: any, children: any) {
  children = String(children);
  return markdown.render(children);
}

export default <>
  <TypicalPage title="Fathers of the Church" image='/img/page/articles.jpg' page="Fathers">

    <Spaced>
      <SplitColumn>

        <div>

          <h3>The Fathers Gospel Commentary</h3>
          <p>
            The <a href='/books/catena-aurea.html'>Catena Aurea</a> contains
            commentary on every verse in the Gospels by the Fathers of the Church.
          </p>

          <h3>Notable Works by Church Fathers</h3>
          <ul>
            <li><a href='/books/catena-aurea.html'>Catena Aurea</a>: Gospel Commentary by the Fathers</li>
            <li><a href='/books/morals-on-the-book-of-job.html'>Morals on the Book of Job</a> by St. Gregory the Great</li>
            <li><a href='/books/confessions.html'>Confessions</a> by St. Augustine</li>
            <li><a href='/books/augustine-on-the-psalms.html'>Exposition on the Psalms</a> by St. Augustine</li>
            <li><a href='/books/works-of-justin-martyr.html'>The Works of St. Justin Martyr</a> by St. Justin Martyr</li>
            <li><a href='/books/commentary-on-the-gospel-of-john.html'>Commentary on John</a> by St. Cyril of Alexandria</li>
            <li><a href='/books/venerable-bedes-ecclesiastical-history-of-england.html'>Ecclesiastical History of England</a> by St. Bede</li>
          </ul>

          <h3>Why not use CatenaBible.com?</h3>
          <p>
            They're missing a huge number of quotes from the Church Fathers
            on the gospels, which are found in the Catena Aurea. It's also
            run by some Orthodoxes, who may be biased toward Greek fathers.
          </p>

          <h3>Why not use New Advent?</h3>
          <Markdown>
            The edition of the Church Fathers they digitized was translated
            by anti-Catholics. This site uses the previous English translation
            of the Church Fathers that was deemed "too Catholic" for them.
          </Markdown>

        </div>

        <div>
          <h3>What the Apostles Taught about Mary</h3>
          <p>Proves through the Bible and Church Fathers that Mary was conceived sinlessly.</p>
          <p><a href="https://a.co/d/17K0yf7" target='_blank'>Buy it on Amazon.</a></p>
          <p><a href="https://a.co/d/17K0yf7" target='_blank'><img src='https://m.media-amazon.com/images/I/611Njn+smlL._SY466_.jpg' /></a></p>
        </div>

      </SplitColumn>
    </Spaced>

  </TypicalPage>
</>;
