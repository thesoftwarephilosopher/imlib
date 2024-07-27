document.body.style.position = 'relative';

let notice: HTMLElement | undefined;
let clearFn: (() => void) | undefined;

export function notify(msg: string) {
  console.log(msg);

  notice?.remove();
  clearFn?.();

  notice = <div id='notice'>
    {msg}
  </div> as HTMLDivElement;

  notice.classList.add('fading-out');

  let removeTimer = setTimeout(() => {
    notice?.remove();
    clearFn = undefined;
    notice = undefined;
  }, 1950);
  clearFn = () => clearTimeout(removeTimer);

  document.body.append(notice);
}
