import { Typography } from "../components/$typography.js";
import { Spaced, SplitColumn } from "../components/column.js";
import { MusicSidebar } from "../components/music-sidebar.js";
import { TypicalPage } from "../components/page.js";
import { allMusics } from "../model/musics.js";
import { markdown } from "../util/helpers.js";

function EmbedYoutube(attrs: { youtube: string }) {
  return (
    <div class="embed-container">
      <iframe
        allowfullscreen="allowfullscreen"
        frameborder="0"
        src={attrs.youtube}
      />
    </div>
  );
}

function EmbedSpotify(attrs: { spotify: string }) {
  return (
    <iframe
      style="border-radius:12px"
      src={`https://open.spotify.com/embed/track/${attrs.spotify}?utm_source=generator`}
      width="100%"
      height="352"
      frameBorder="0"
      allowfullscreen=""
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy" />
  );
}

export default allMusics.map(song => {
  return [song.slug, <>
    <TypicalPage title="Music" image='/img/page/music.jpg' page="Music">

      <link rel="stylesheet" href='/css/page/song.css' />

      <Spaced>
        <SplitColumn>

          <Typography>
            <h2>{song.data.title}</h2>
            {song.data.youtube && <EmbedYoutube youtube={song.data.youtube} />}
            {song.data.spotify && <EmbedSpotify spotify={song.data.spotify} />}
            {markdown.render(song.content)}
          </Typography>

          <MusicSidebar />

        </SplitColumn>
      </Spaced>

    </TypicalPage >
  </>];
});
