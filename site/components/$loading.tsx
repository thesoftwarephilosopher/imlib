const sizes = [80, 90, 70, 95, 75, 60, 85];

export const LoadingParagraph: JSX.Component<{ lines: number, fullWidth?: boolean }> = ({ lines, fullWidth }) => <p>
  {fullWidth
    ? Array(lines).fill(0).map((_, i) =>
      <LoadingLine width={`${i < (lines - 1) ? 100 : 70}%`} />
    )
    : sizes.slice(0, lines).map(size =>
      <LoadingLine width={`${size}%`} />
    )
  }
</p>;

export const LoadingLine: JSX.Component<{ width: string, height?: string }> = ({ width, height = '1em' }) => <>
  <link rel='stylesheet' href='/css/components/loading.css' />
  <span style={`width: ${width}; height: ${height}`} class='loading-item' />
</>;

export const HomeLoading = () => <>
  <LoadingLine width="7em" />
  <h4><LoadingLine width="18em" height="1.2em" /></h4>
  <p><LoadingLine width="14em" /></p>
  <p>
    <LoadingLine width="70%" /><br />
    <LoadingLine width="40%" />
  </p>
  <blockquote>
    <LoadingParagraph lines={7} fullWidth />
    <LoadingParagraph lines={7} fullWidth />
    <LoadingParagraph lines={7} fullWidth />
  </blockquote>
  <LoadingLine width="7em" />
</>;
