const formatter = new Intl.DateTimeFormat('en-EN', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

export function formatDate(date: string) {
  const [y, m, d] = date.split('-');
  return formatter.format(new Date(+y!, +m! - 1, +d!));
}
