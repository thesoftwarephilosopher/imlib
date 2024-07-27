import { booksBySlug } from "./books.js";

export const featuredBooks = [
  'introduction-to-the-devout-life',
  'imitation-of-christ',
  'the-spiritual-combat',
  'the-sinners-guide',
  'st-john-henry-newman-reply-to-eirenicon',
  'the-glories-of-mary',
  'catena-aurea',
  // 'catholic-encyclopedia',
].map(id => booksBySlug.get(id)!)
