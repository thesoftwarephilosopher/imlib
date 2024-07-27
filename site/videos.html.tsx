import { Typography } from "./components/$typography.js";
import { Spaced, SplitColumn } from "./components/column.js";
import { VideosList } from "./components/movies-sidebar.js";
import { TypicalPage } from "./components/page.js";
import { MovieTabs } from "./movies.html.js";

export default <>
  <TypicalPage page="Movies" title={<MovieTabs index={1} /> as string} image='/img/movies/passion-of-the-christ-big.jpg'>

    <Spaced>
      <SplitColumn>

        <Typography>
          <h2>Fulton Sheen Videos</h2>
          <p>
            Venerable Fulton Sheen was a passionate and powerful
            speaker who explained the Catholic faith in terms
            that made complicated topics easy to understand
            and often ignited the faithful with a passion for God.
          </p>
        </Typography>

        <VideosList />

      </SplitColumn>
    </Spaced>

  </TypicalPage>
</>;
