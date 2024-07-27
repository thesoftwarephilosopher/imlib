import handlers from 'handlers!';
import { EmptyPage } from "../../components/page.js";
import { Book } from "../../model/books.js";
import { allCategories, categoriesBySlug } from "../../model/categories.js";
import { slugify } from "../util/$helpers.js";

handlers.set('/create-book', body => {
  const params = new URLSearchParams(body);

  const title = params.get('title')!;
  const slug = slugify(title);

  const date = new Date().toLocaleDateString('sv');

  const book = new Book(slug, params.get('description')!, {
    rating: 0,
    score: 0,
    storeLinks: [],
    translator: '',
    author: params.get('author')!,
    dateAdded: date,
    files: [{
      archiveId: params.get('archiveid')!,
      pdfFile: params.get('pdffile')!,
    }],
    title: title,
    subtitle: params.get('subtitle')!,
  });
  book.save();

  const cat = categoriesBySlug[params.get('category')!]!;
  cat.data.books.push(book.slug);
  cat.save();

  return book.route;
});

export default <>
  <EmptyPage>
    <form method='POST' action='/create-book' style='display:grid; grid-template-columns: auto 1fr; width:30em; margin:1em; gap:1em; align-items:baseline'>
      <span>Title</span>        <input autocomplete='off' name='title' autofocus />
      <span>Subtitle</span>     <input autocomplete='off' name='subtitle' />
      <span>Author</span>       <input autocomplete='off' name='author' />
      <span>Archive ID</span>   <input autocomplete='off' name='archiveid' />
      <span>PDF File</span>     <input autocomplete='off' name='pdffile' />
      <span>Description</span>  <textarea name='description' rows='3' />
      <span>Category</span>     <select name='category'>{allCategories.map(c => <option>{c.slug}</option>)}</select>
      <span /> <button>Create</button>
    </form>
  </EmptyPage>
</>;
