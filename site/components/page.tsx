import { Font } from '../fonts/[font].css.js';
import { NavPage } from './navlinks.js';
import { QuickLinks } from './quicklinks.js';
import { SiteFooter } from './site-footer.js';
import { SiteHeader } from './site-header.js';

const Meta: JSX.Component<{ favicons?: JSX.Element }> = (attrs) => <>
  {attrs.favicons ?? <>
    <link rel="apple-touch-icon" sizes="180x180" href='/meta/apple-touch-icon.png' />
    <link rel="icon" type="image/png" sizes="32x32" href='/meta/favicon-32x32.png' />
    <link rel="icon" type="image/png" sizes="16x16" href='/meta/favicon-16x16.png' />
  </>}
  <link rel="manifest" href='/meta/manifest.json' />
</>;

export const EmptyPage: JSX.Component<{ favicons?: JSX.Element }> = (attrs, children) => <>
  {'<!DOCTYPE html>'}
  <html lang="en">

    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <title>Immaculata Library</title>
      <meta property="og:title" content='Immaculata Library' />
      <meta property="og:locale" content="en_US" />
      {/* {attrs.image && <meta property="og:image" content={`https://www.immaculatalibrary.com${attrs.image}`} />} */}
      <meta name="description" content="Catholic Digital Library" />

      <link rel="stylesheet" href='/css/base.css' />

      <Meta {...attrs} />
    </head>

    <body>
      <Font name='martel'>
        {children}
      </Font>
    </body>

  </html>
</>;

export const TypicalPage: JSX.Component<{ title: string, image: string, page: NavPage }> = (attrs, children) => <>
  <EmptyPage>

    <SiteHeader page={attrs.page} image={attrs.image} title={attrs.title} />

    <main>
      {children}
    </main>

    <QuickLinks />
    <SiteFooter />

  </EmptyPage>
</>;
