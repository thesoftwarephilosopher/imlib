import { Spaced, SplitColumn } from "../components/column.js";
import { FathersSearchbar } from "../components/fathers-search.js";
import { TypicalPage } from "../components/page.js";
import { allFatherQuotes } from "../model/fatherquotes.js";
import { markdown } from "../util/helpers.js";

export default allFatherQuotes.map(q => [q.slug, <>

  <TypicalPage title="Fathers of the Church" image='/img/page/articles.jpg' page="Fathers">

    <Spaced>
      <SplitColumn>

        <div>

          <h2>{q.book} {q.chapter}:{q.verse}</h2>
          <h3>{q.data.gospelQuote}</h3>
          <p>{markdown.render(q.content)}</p>

        </div>

        <div>
          <FathersSearchbar />
        </div>

      </SplitColumn>
    </Spaced>

  </TypicalPage>

</>]);
