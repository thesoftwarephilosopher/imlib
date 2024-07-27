import { allMovies } from '../model/movies.js';
import { allVideos } from '../model/videos.js';

export const MoviesList = () => <div>
  <h2>All Movies</h2>
  <ul>
    {allMovies.map(movie => <li>
      <a href={`/movies/${movie.slug}.html`}>{movie.data.title}</a> ({movie.data.year})
    </li>)}
  </ul>
</div>;

export const VideosList = () => <div>
  <h2>Fulton Sheen Videos</h2>
  <ul>
    {allVideos.map(video => <li>
      <a href={`/videos/${video.slug}.html`}>{video.data.title}</a>
    </li>)}
    <li>
      <a href="https://www.youtube.com/playlist?list=PLHr17i6CU5FgiHD3hI0k0PnCjrxdphNSG">50 Catechisms from 1956</a>
    </li>
  </ul>
</div>;
