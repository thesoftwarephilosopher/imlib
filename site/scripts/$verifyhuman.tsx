import { randomElement } from "./$util.js";

export default 0;

class VerifyHuman {

  #quitting = false;
  #screen = <div style='position:fixed;top:0;left:0;bottom:0;right:0;z-index:99;transition:background-color 1s ease' /> as HTMLDivElement;
  #wholeArea = <p id='verifyhuman' /> as HTMLParagraphElement;
  #wordArea = <span /> as HTMLSpanElement;
  #cursorArea = <span /> as HTMLSpanElement;

  async run(phrases: string[]) {
    const restore = this.#attach();
    await this.#type(phrases);
    restore();
  }

  #attach() {
    this.#screen.onclick = (e) => this.#quitting = true;
    this.#wholeArea.append(this.#wordArea, this.#cursorArea);

    const keyListener = (e: KeyboardEvent) => {
      e.preventDefault();
      this.#quitting = true;
    };

    window.addEventListener('keydown', keyListener);

    document.body.children[0]!.append(this.#screen, this.#wholeArea);
    setTimeout(() => this.#screen.style.backgroundColor = '#000c', 100);

    const documentOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', keyListener);

      document.documentElement.style.overflow = documentOverflow;

      this.#screen.style.backgroundColor = 'unset';
      setTimeout(() => this.#screen.remove(), 1100);

      this.#wholeArea.classList.add('disappearing');
      setTimeout(() => this.#wholeArea.remove(), 450);
    };
  }

  async #type(phrases: string[]) {
    for (const phrase of phrases) {
      for (let i = 0; i <= phrase.length; i++) {
        if (phrase[i] === '\r') {
          await this.#wait(0.33);
          if (this.#quitting) return;
        }
        else {
          this.#wordArea.textContent = phrase.slice(0, i + 1);
          await this.#sleep(0.05);
          if (this.#quitting) return;
        }
      }

      for (let i = phrase.length - 1; i >= 0; i--) {
        this.#wordArea.textContent = phrase.slice(0, i);
        await this.#sleep(0.01);
        if (this.#quitting) return;
      }
    }
  }

  async #wait(sec: number) {
    this.#cursorArea.classList.add('pulsing');
    await this.#sleep(sec);
    this.#cursorArea.classList.remove('pulsing');
  }

  async #sleep(sec: number) {
    const startedAt = this.#getCurrentTime();
    const endTime = startedAt + (sec * 1000);

    return new Promise<void>(resolve => {
      const checkIfDone = () => {
        const currentTime = this.#getCurrentTime();
        if (this.#quitting || currentTime >= endTime) {
          resolve();
        }
        else {
          setTimeout(checkIfDone, 10)
        };
      };
      checkIfDone();
    });
  }

  #getCurrentTime() {
    return +document.timeline.currentTime!;
  }

}

async function checkIfHuman(phrase: string[]) {
  const v = new VerifyHuman();
  await v.run(phrase);
}

if (Math.random() < 0.05) {
  const phrases = [
    [
      `Hi.\r Are you a robot?\r\r\r`,
      `If you're not a robot,\r then why do you look like one?\r\r`,
      `Haha\r just kidding\r, that was a test.\r\r\r You passed.\r Good job.\r\r\r\r\r`,
    ],
    [
      `Hi\r, are you a human?\r\r\r`,
      `Wait,\r how do you know if you're a human?\r\r`,
      `I mean\r, aren't there scifi tropes\r where someone isn't a human\r, but thinks they are?\r\r\r`,
      `This is too confusing.\r Let's just say you are human.\r Don't tell my boss.\r\r\r`,
    ],
    [
      `Hi\r, just need to check if you're a robot.\r\r\r`,
      `No offense or anything\r, not saying you look like a robot.\r.\r.\r.\r.\r.\r.\r.\r.\r.\r.\r.\r.\r.\r.\r.\r.\r.\r.\r`,
      `Yeah\r that got awkward quick.\r You're free to go\r, sorry for the inconvenience.\r\r\r`,
    ],
    [
      `Checking if you're a robot...\r\r\r`,
      `Hey I'm going to the store, do you need anything?\r\r Maybe, some wires or circuit boards or anything?\r\r.\r.\r.\r.\r.\r`,
      `So what's your favorite magazine, maybe wired?\r 👁️👄👁️\r\r\r\r\r\r.\r.\r.\r.\r.\r.\r.\r.\r`,
      `Okay fine\r, you're free to go\r\r, for now.......\r\r\r`,
    ],
  ];

  checkIfHuman(randomElement(phrases));
}
