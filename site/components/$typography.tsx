export const Typography: JSX.Component<{ deindent?: boolean, [key: string]: any }> = (attrs, children) => <>
  <div class={`typography${attrs.deindent ? ' deindent' : ''}`} {...attrs}>
    <link rel="stylesheet" href='/css/components/typography.css' />
    {children}
  </div>
</>;
