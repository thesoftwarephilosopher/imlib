export const FadeIn: JSX.Component = (attrs, children) => <>
  <div class='fadein' style='opacity: 0; transform: translateY(2em)'>
    <script type='module' src='/scripts/$fadein.js' />
    {children}
  </div>
</>;
