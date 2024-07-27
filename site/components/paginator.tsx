import { LoadingLine } from "./$loading.js";

export const PaginatorLoading = () => <p class='loader' style='display:flex; gap:2.4em; align-items:center'>
  <LoadingLine width='2em' height='2.4em' />
  <LoadingLine width='4.2em' height='1em' />
  <LoadingLine width='2em' height='2.4em' />
</p>;
