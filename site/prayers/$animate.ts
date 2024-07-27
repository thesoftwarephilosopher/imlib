import easesLib from 'https://cdn.jsdelivr.net/npm/eases@1.0.8/+esm';
import { CircularNav, Navable } from './$nav.js';
import { notify } from './$notify.js';

interface Ease extends Navable<Ease> {
  fn: (t: number) => number;
  name: string;
}

const eases = new CircularNav<Ease>([
  { fn: easesLib.expoOut, name: 'expo' },
  { fn: easesLib.cubicOut, name: 'cubic' },
  { fn: easesLib.elasticOut, name: 'elastic' },
  { fn: easesLib.backOut, name: 'back' },
  { fn: easesLib.bounceOut, name: 'bounce' },
  { fn: easesLib.circOut, name: 'circ' },
  { fn: easesLib.linear, name: 'linear' },
  { fn: easesLib.quadOut, name: 'quad' },
  { fn: easesLib.quartOut, name: 'quart' },
  { fn: easesLib.quintOut, name: 'quint' },
  { fn: easesLib.sineOut, name: 'sine' },
]);

export function nextEase() {
  eases.current = eases.current.next!;
  notify(eases.current.name);
}

export function prevEase() {
  eases.current = eases.current.prev!;
  notify(eases.current.name);
}

class Animation {

  running = false;

  constructor(
    private container: HTMLElement,
    private duration: number,
    private to: { x: number, y: number },
  ) { }

  start() {
    this.running = true;

    const startPos = {
      x: this.container.scrollLeft,
      y: this.container.scrollTop,
    };

    const startedAt = +document.timeline.currentTime!;

    const step = () => {
      requestAnimationFrame(time => {
        if (!this.running) return;

        const percentDone = (time - startedAt) / this.duration;
        if (percentDone >= 1) {
          this.container.scrollLeft = this.to.x;
          this.container.scrollTop = this.to.y;
          return;
        }

        const percentToAnimate = eases.current.fn(percentDone);

        const x = (this.to.x - startPos.x) * percentToAnimate + startPos.x;
        const y = (this.to.y - startPos.y) * percentToAnimate + startPos.y;

        this.container.scrollLeft = x;
        this.container.scrollTop = y;

        step();
      });
    };
    step();
  }

  stop() {
    this.running = false;
  }

}

const animations = new Map<HTMLElement, Animation>();

export function animateTo(container: HTMLElement, duration: number, to: { x: number, y: number }) {
  const found = animations.get(container);
  if (found) {
    found.stop();
  }

  const anim = new Animation(container, duration, to);
  anim.start();

  animations.set(container, anim);
}
