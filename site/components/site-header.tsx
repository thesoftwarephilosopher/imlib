import { NavPage, Navlinks } from "./navlinks.js";

export const SiteHeader: JSX.Component<{ title: string, image: string, page: NavPage }> = (attrs, children) => <>
  <link rel="stylesheet" href='/css/components/site-header.css' />

  <header id="page-hero">
    <section style={`background-image: url(${attrs.image});`} />
    <div>
      <Navlinks page={attrs.page} />
    </div>
    <div style='text-align:center'>
      <section>
        {attrs.title.includes('<h1')
          ? attrs.title
          : <h1>{attrs.title}</h1>
        }
      </section>
    </div>
  </header>
</>;
