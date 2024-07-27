import MarkdownIt from 'markdown-it';
import { mdOptions } from '../components/$markdown.js';

export const isDev = !!process.env['DEV'];

export const markdown = new MarkdownIt(mdOptions);

export function sortBy<T>(fn: (o: T) => string | number) {
  return (l: T, r: T) => {
    const a = fn(l);
    const b = fn(r);
    return a < b ? -1 : a > b ? 1 : 0;
  };
}
