export function calculateReadingMins(str: string) {
  return Math.round(str.length / 888);
}
