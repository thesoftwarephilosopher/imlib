import { Typography } from "./components/$typography.js";
import { Spaced, SplitColumn } from "./components/column.js";
import { MoviesList } from "./components/movies-sidebar.js";
import { TypicalPage } from "./components/page.js";
import { makeTabs } from "./components/tabs.js";

export const MovieTabs = makeTabs([
  { href: '/movies.html', title: 'Catholic Movies' },
  { href: '/videos.html', title: 'Fulton Sheen' },
]);

export default <>
  <TypicalPage title={<MovieTabs index={0} /> as string} image='/img/movies/passion-of-the-christ-big.jpg' page="Movies">

    <Spaced>
      <SplitColumn>

        <Typography>
          <h2>Holy Movies</h2>
          <p>
            Books are not the only way to experience the
            lives of the saints! Movies can be a great way
            to increase our devotion and love for God through
            his Saints. This page contains a roughly priotized
            list of recommended and reviewed Catholic movies.
          </p>
        </Typography>

        <MoviesList />

      </SplitColumn>
    </Spaced>

  </TypicalPage>
</>;
