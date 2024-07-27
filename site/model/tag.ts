export const allTags: string[] = [];

export function addTags(tags: string[]) {
  for (const tag of tags) {
    if (!allTags.includes(tag)) {
      allTags.push(tag);
    }
  }
  allTags.sort();
}
