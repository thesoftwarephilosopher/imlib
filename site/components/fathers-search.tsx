import { allFatherQuotes } from "../model/fatherquotes.js";

export function FathersSearchbar() {
  return <>
    <h3>Digital Search</h3>
    <p>(Coming soon.)</p>
    <ul>
      {allFatherQuotes.map(q => <li>
        <a href={q.route}>{q.book} {q.chapter}:{q.verse}</a>
      </li>)}
    </ul>
  </>;
}
