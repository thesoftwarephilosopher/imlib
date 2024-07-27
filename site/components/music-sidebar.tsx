import { allMusics } from '../model/musics.js';

const categories = [
  'Gregorian Chant',
  'Christmas',
  'Accidentally Christian',
  // 'Wordless Christian',
  'Purgatory',
];

export const MusicSidebar: JSX.Component = (attrs, children) => <>
  <div>

    {categories.map(cat => <>
      <h4>{cat} Music</h4>
      <ul>
        {allMusics.filter(s => s.data.category === cat).map(song => <>
          <li>
            <a href={`/music/${song.slug}.html`}>{song.data.title}</a>
          </li>
        </>)}
      </ul>
    </>)}

  </div>
</>;
