import handlers from 'handlers!';
import { Typography } from "../../components/$typography.js";
import { EmptyPage } from "../../components/page.js";
import { Snippet } from '../../model/snippets.js';

handlers.set('/create-snippet', body => {
  const params = new URLSearchParams(body);

  const date = new Date().toLocaleDateString('sv');
  const slug = `${date}-${params.get('slug')!}`;

  const snippet = new Snippet(slug, params.get('markdownContent')!, {
    published: true,
    title: params.get('title')!,
    archivePage: params.get('archivePage')!,
    archiveSlug: params.get('archiveSlug')!,
    bookSlug: params.get('bookSlug')!,
    tags: params.getAll('tags').filter(t => t),
  });

  snippet.save();

  return snippet.route;
});

export default <>
  <EmptyPage>
    <link rel='stylesheet' href='./new-book-snippet.css' />
    <script src='./$new-book-snippet.js' type='module'></script>

    <main>
      <div id='left-panel'>
        <form method='POST' action='/create-snippet'>
          <span>Page</span>  <input autocomplete='off' name='archivePage' autofocus />
          <span>Link</span>  <input autocomplete='off' name='archiveSlug' />
          <span>Book</span>  <input autocomplete='off' name='bookSlug' />
          <span>Title</span> <input autocomplete='off' name='title' />
          <span>Slug</span>  <input autocomplete='off' name='slug' />
          <span>Text</span>  <textarea name='markdownContent' />
          <span>Tags</span>  <ul id='tags'><li><button id='addtag'>Add</button></li></ul>

          <span id='readingmins' />
          <span style='display:grid; gap:0.25em; grid-template-columns: 1fr 1fr'>
            <button>Create</button>
            <button id='fixup-button'>Fixup</button>
          </span>
        </form>
        <Typography>
          <div id='old-body'></div>
        </Typography>
      </div>
      <div id='editorarea'></div>
      <div style='padding-right:1em'>
        <Typography>
          <div id='previewarea'></div>
        </Typography>
      </div>
      <div style='overflow:hidden'>
        <iframe />
      </div>
    </main>

  </EmptyPage>

</>;
