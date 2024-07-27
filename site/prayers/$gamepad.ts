import { nextEase, prevEase } from "./$animate.js";
import { bounceUnderline, tabs } from "./$tab.js";

const enum Button {
  A, B, X, Y,
  L, R, ZL, ZR,
  MINUS, PLUS,
  LTRIGGER, RTRIGGER,
  UP, DOWN, LEFT, RIGHT,
  HOME,
}

let gamepad: Gamepad;

const gamepadActions = new Map<number, () => void>([
  [Button.L, () => { tabs.current.prev?.focus(); }],
  [Button.R, () => { tabs.current.next?.focus(); }],

  [Button.ZL, () => { prevEase(); }],
  [Button.ZR, () => { nextEase(); }],

  [Button.B, () => { bounceUnderline(); }],

  [Button.RIGHT, () => { tabs.current.panels.current.next?.focus(); }],
  [Button.LEFT, () => { tabs.current.panels.current.prev?.focus(); }],

  [Button.DOWN, () => { tabs.current.panels.current.nextLine(); }],
  [Button.UP, () => { tabs.current.panels.current.prevLine(); }],
]);

let ticks = 0;
let lastMovedFromY = 0;

function handleController() {
  const currentMs = ticks++ * (1000 / 33);

  gamepad = navigator.getGamepads().find(c => c)!;

  const [x, y] = gamepad.axes as [number, number];
  const buttons = gamepad.buttons.map(b => b.pressed);

  if (x === 1) buttons[Button.RIGHT] = true;
  if (x === -1) buttons[Button.LEFT] = true;

  for (const [button, fn] of gamepadActions.entries()) {
    if (pressed(buttons, button)) {
      fn();
      return;
    }
  }

  const scaledY = y * y * y;
  const MAX_LINES_PER_SEC = 10;
  const linesToMovePerSec = Math.abs(Math.round(scaledY * MAX_LINES_PER_SEC));

  if (linesToMovePerSec > 0) {
    const msDelayBetweenMoves = 1000 / linesToMovePerSec;
    const enoughTimeHasPassed = (currentMs - lastMovedFromY) > msDelayBetweenMoves;

    if (enoughTimeHasPassed) {
      lastMovedFromY = currentMs;

      if (y > 0) {
        tabs.current.panels.current.nextLine();
      }
      else if (y < 0) {
        tabs.current.panels.current.prevLine();
      }
    }
  }

}

const pressMap = new Map<number, number>();

function pressed(gamepad: boolean[], button: number) {
  if (!gamepad[button]) return false;

  const lastPressed = pressMap.get(button) ?? 0;
  const now = Date.now();

  if (now > lastPressed + 300) {
    pressMap.set(button, now);
    return true;
  }

  return false;
}

export function setupGamepads() {
  let interval: NodeJS.Timeout | undefined;

  window.addEventListener('gamepadconnected', (e) => {
    interval ??= setInterval(handleController, 33);
  });

  window.addEventListener('gamepaddisconnected', (e) => {
    if (navigator.getGamepads().every(gp => gp === null)) {
      clearInterval(interval);
      interval = undefined;
    }
  });
}
