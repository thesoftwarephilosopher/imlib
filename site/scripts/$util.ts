export function sleep(sec: number) {
  return new Promise(r => setTimeout(r, sec * 1000));
}

export function randomElement<T>(array: T[]) {
  const i = Math.floor(Math.random() * array.length);
  return array[i]!;
}
