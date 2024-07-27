import { animateTo, nextEase } from "./$animate.js";
import { Nav, Navable } from "./$nav.js";
import { changeNavButtons, Tab, tabBodies } from "./$tab.js";

class Line implements Navable<Line> {

  prev?: Line;
  next?: Line;

  constructor(
    public element: HTMLSpanElement,
    public panel: Panel,
  ) {
    element.onclick = (e) => {
      e.preventDefault();
      this.focus();
    };
  }

  focus() {
    this.panel.lineNav.current.element.classList.remove('active');
    this.panel.lineNav.current = this;
    this.panel.lineNav.current.element.classList.add('active');

    const currentLine = this.panel.lineNav.current.element;
    animateTo(this.panel.panelBodyDiv, 300, {
      x: this.panel.panelBodyDiv.scrollLeft,
      y: currentLine.offsetTop - this.panel.panelBodyDiv.offsetHeight / 2 + currentLine.offsetHeight / 2,
    });

  }

}

export class Panel implements Navable<Panel> {

  public prev?: Panel;
  public next?: Panel;

  lineNav = new Nav<Line>;

  constructor(
    public panelDiv: HTMLDivElement,
    public panelBodyDiv: HTMLDivElement,
    public tab: Tab,
  ) {
    for (const lineElement of this.panelBodyDiv.querySelectorAll<HTMLElement>('.highlightable-line')) {
      this.lineNav.add(new Line(lineElement, this));
    }

    this.panelBodyDiv.onwheel = (e) => {
      e.preventDefault();
      if (e.deltaY > 0)
        this.nextLine();
      else if (e.deltaY < 0)
        this.prevLine();
    };

    this.panelBodyDiv.setAttribute('tabindex', '0');
    this.panelBodyDiv.onkeydown = (e) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); this.prev?.focus(); }
      if (e.key === 'ArrowRight') { e.preventDefault(); this.next?.focus(); }
      if (e.key === 'Enter' && e.ctrlKey) { e.preventDefault(); changeNavButtons(); }
      if (e.key === ' ' && e.ctrlKey) { e.preventDefault(); nextEase(); }
      if (e.key === ' ') { e.preventDefault(); this.nextLine(); }
      if (e.key === 'Home') { e.preventDefault(); this.lineNav.first.focus(); }
      if (e.key === 'End') { e.preventDefault(); this.lineNav.last.focus(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); this.prevLine(); }
      if (e.key === 'ArrowDown') { e.preventDefault(); this.nextLine(); }
    };

  }

  focus() {
    animateTo(tabBodies, 700, {
      x: this.panelDiv.offsetLeft - tabBodies.offsetLeft,
      y: this.panelDiv.offsetTop - tabBodies.offsetTop,
    });
    this.panelBodyDiv.focus({ preventScroll: true });
    this.tab.panels.current = this;

    this.lineNav.current.focus();
  }

  nextLine() {
    this.lineNav.current.next?.focus();
  }

  prevLine() {
    this.lineNav.current.prev?.focus();
  }

}
