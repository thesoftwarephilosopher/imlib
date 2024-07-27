const CurrentYear = () => <script>{`document.write(new Date().getFullYear())`}</script>;
const Copyright = () => <>2020-<CurrentYear /> &copy; All Rights Reserved</>;
const Email = () => <a href='mailto:immaculatalibrary@gmail.com'>Email</a>;

export const SiteFooter: JSX.Component<{ thin?: boolean }> = (attrs, children) => <>
  <footer id='site-footer' class={attrs.thin ? 'thin' : ''}>
    <link rel="stylesheet" href='/css/components/site-footer.css' />
    <p><span><Copyright /> &bullet; <Email /></span></p>
  </footer>
</>;
