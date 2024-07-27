import handlers from "handlers!";
import { Typography } from "../../components/$typography.js";
import { EmptyPage } from "../../components/page.js";
import { FatherQuote } from "../../model/fatherquotes.js";
import { Quote } from "./$document-client.js";

handlers.set('/create-father-quotes', body => {
  const params = new URLSearchParams(body);
  const quotes = JSON.parse(params.get('markdownContent')!) as Quote[];

  const files = quotes.map(quote => {
    const file = new FatherQuote(`${quote.book}-${quote.chapter}-${quote.verse}`, quote.commentaryQuotes, {
      gospelQuote: quote.gospelQuote,
    });
    file.save();
    return file;
  });

  return files[0]!.route;
});

export default <>
  <EmptyPage>
    <link rel='stylesheet' href='./document.css' />
    <script src='./$document-client.js' type='module'></script>

    <main>
      <form id='left-panel' method='POST' action='/create-father-quotes'>
        <textarea name='markdownContent' />
        <button>Create</button>
      </form>
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
