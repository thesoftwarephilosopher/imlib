export const RatingStar: JSX.Component<{ lit?: boolean }> = ({ lit }) => <>
  <svg class={`rating-star ${lit ? 'lit' : ''}`} viewBox="0 0 16 16" height='10'>
    <path d="M8 1 L10 6 16 6 11 9.5 12.5 15 8 11.5 3.5 15 5 9.5 1 6 6 6 Z"></path>
  </svg>
  <link rel='stylesheet' href='/css/components/rating.css' />
</>;
