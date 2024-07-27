const adorationLinks = [
  "UCTv8s3mfmdIIXNcw_5Pdv_w",
  "UChmNZQg06jCB5xXHSAQQNpA",
].map(id => {
  const href = `https://www.youtube.com/embed/live_stream?channel=${id}&autoplay=1&mute=1`;
  return <iframe src={href} /> as HTMLIFrameElement;
});

const blessedSacramentImage = <img src="https://upload.wikimedia.org/wikipedia/commons/8/8a/Adoration_du_Saint_Sacrement_%C3%A0_l%27Eglise_du_Sacr%C3%A9-Coeur_de_Monaco.jpg" />;

export function BlessedSacrament() {
  const target = <div id='top2'>
    {adorationLinks[0]}
  </div> as HTMLDivElement;

  return <>
    <link rel='stylesheet' href='./blessedsacrament.css' />
    {target}
    <div id="navlinks" class="box">
      {adorationLinks.map((iframe, i) => (
        <a href='#' onclick={(e: Event) => {
          e.preventDefault();
          target.replaceChildren(iframe);
        }}>Adoration {i + 1}</a>
      ))}
      <a href="#" onclick={(e: Event) => {
        e.preventDefault();
        target.replaceChildren(blessedSacramentImage);
      }}>Static image</a>
    </div>
  </>;
}
