import { LoadingLine, LoadingParagraph } from "./$loading.js";

export function LatestSnippetsArea() {
  return <>
    <div id='latest-book-snippets-area'>
      <p>
        <LoadingLine width="24em" />
      </p>
      <ul>
        <li><LoadingParagraph lines={2} /></li>
        <li><LoadingParagraph lines={2} /></li>
        <li><LoadingParagraph lines={2} /></li>
        <li><LoadingParagraph lines={2} /></li>
        <li><LoadingParagraph lines={2} /></li>
        <li><LoadingParagraph lines={2} /></li>
        <li><LoadingParagraph lines={2} /></li>
      </ul>
    </div>
    <script type='module' src='/scripts/$latest-book-snippets.js' />
  </>;
}
