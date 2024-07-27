import { Column } from "./column.js";

const links = {
  Home: { href: '/', title: 'Immaculata Library' },
  Books: { href: '/books.html', title: 'Books' },
  Fathers: { href: '/fathers.html', title: 'Fathers' },
  Movies: { href: '/movies.html', title: 'Movies' },
  Music: { href: '/music.html', title: 'Music' },
  Prayers: { href: '/prayers/', title: 'Prayers' },
  Articles: { href: '/articles.html', title: 'Articles' },
  Resources: { href: '/resources.html', title: 'Resources' },
} as const;

export type NavPage = keyof typeof links;

export const Navlinks = (attrs: { page: NavPage }) => {
  return <>
    <Column>
      <div style='flex-wrap:wrap; margin:2em 0' class='tab-links'>
        {Object.entries(links).map(([name, link]) => (
          <a href={link.href} class={attrs.page === name ? 'active' : ''}>{link.title}</a>
        )).join(' ')}
      </div>
    </Column>
  </>;
};
