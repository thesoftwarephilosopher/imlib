import { Typography } from "../components/$typography.js";
import { Spaced, SplitColumn } from "../components/column.js";
import { VideosList } from "../components/movies-sidebar.js";
import { TypicalPage } from "../components/page.js";
import { allVideos } from "../model/videos.js";
import { MovieTabs } from "../movies.html.js";
import { markdown } from "../util/helpers.js";

export default allVideos.map(video => {
  return [video.slug, <>
    <TypicalPage page="Movies" title={<MovieTabs index={1} /> as string} image={`/img/categories/blessed-sacrament-big.jpg`}>

      <Spaced>
        <SplitColumn>

          <Typography>
            <h2>{video.data.title}</h2>

            <link rel='stylesheet' href='/css/page/video.css' />

            <div class="embed-container">
              <iframe allowfullscreen="allowfullscreen" frameborder="0" src={video.data.youtube} data-ruffle-polyfilled="" />
            </div>

            <p>By {video.data.author}</p>

            {video.data.desc &&
              <p>{video.data.desc}</p>
            }

            <hr />

            {video.content
              ? markdown.render(video.content)
              : <p><em>No transcript available yet.</em></p>}

          </Typography>

          <VideosList />

        </SplitColumn>
      </Spaced>

    </TypicalPage>
  </>];
});
