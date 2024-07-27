import handlers from 'handlers!';
import { Typography } from "../../components/$typography.js";
import { EmptyPage } from "../../components/page.js";
import { Article } from "../../model/articles.js";

handlers.set('/create-article', body => {
  const params = new URLSearchParams(body);

  const date = new Date().toLocaleDateString('sv');
  const slug = `${date}-${params.get('slug')!}`;

  const article = new Article(slug, params.get('markdownContent')!, {
    title: params.get('title')!,
  });

  article.save();

  return article.route;
});

export default <>
  <EmptyPage>
    <link rel='stylesheet' href='./new-article.css' />
    <script src='./$new-article.js' type='module'></script>

    <main>
      <div id='left-panel'>
        <form method='POST' action='/create-article'>
          <span>Title</span>        <input autocomplete='off' name='title' />
          <span>Slug</span>         <input autocomplete='off' name='slug' />
          <span>Text</span>         <textarea name='markdownContent' />
          <span id='readingmins' /> <button>Create</button>
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
      <div />
    </main>

  </EmptyPage>
</>;
