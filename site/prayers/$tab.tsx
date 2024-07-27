import { LeftArrow, RightArrow } from "../scripts/$arrows.js";
import { CircularNav, Nav, Navable } from "./$nav.js";
import { Panel } from "./$panel.js";

export const tabBodies = document.getElementById('tabs-bodies') as HTMLDivElement;
const tabNamesArea = document.querySelector<HTMLDivElement>('#tabs-names')!;
const tabButtons = [...document.querySelectorAll<HTMLAnchorElement>('#tabs-names a')];

export const tabs = new Nav<Tab>();

const underline = <div id='underline' /> as HTMLDivElement;
underline.style.top = `${tabNamesArea.offsetHeight - 2}px`;
tabNamesArea.append(underline);

const moveUnderlineToTab = (tab: Tab) => {
  underline.style.left = `${tab.button.offsetLeft + (tab.button.offsetWidth / 2)}px`;
  underline.style.width = `${tab.button.offsetWidth}px`;
};

window.addEventListener('resize', () => {
  underline.classList.add('suppress');
  moveUnderlineToTab(tabs.current);
  underline.classList.remove('suppress');
});

export function bounceUnderline() {
  underline.classList.toggle('bounce');
}

export class Tab implements Navable<Tab> {

  prev?: Tab;
  next?: Tab;

  panels = new Nav<Panel>();

  onFocus = () => { };

  constructor(public button: HTMLAnchorElement) {
    this.button.onclick = (e) => {
      e.preventDefault();
      this.focus();
    };
  }

  focus() {
    tabs.current.button.classList.remove('active');
    tabs.current = this;
    tabs.current.button.classList.add('active');
    this.panels.first.focus();
    this.onFocus();
  };

}

export function setupTabs() {
  for (const tabBody of tabBodies.children) {
    const button = tabButtons.shift()!;

    const tab = new Tab(button);
    tabs.add(tab);

    tab.onFocus = () => moveUnderlineToTab(tab);

    for (const panelDiv of tabBody.querySelectorAll<HTMLDivElement>('.panel')) {
      const panelBodyDiv = panelDiv.querySelector<HTMLDivElement>('.panel-body')!;

      const panel = new Panel(panelDiv, panelBodyDiv, tab);
      tab.panels.add(panel);

      if (panel.prev) {
        panel.panelDiv.append(<PageChanger to={panel.prev} side='left' />);
        panel.prev.panelDiv.append(<PageChanger to={panel} side='right' />);
      }
    }
  }
}

const changeNavButtonCallbacks: (() => void)[] = [];

interface PageChangerContent extends Navable<PageChangerContent> {
  content: string | Node;
}

function PageChanger(attrs: { to: Panel, side: 'left' | 'right' }) {
  const content = new CircularNav<PageChangerContent>((attrs.side === 'left'
    ? [{ content: <LeftArrow /> }, { content: `Hey, why don't you go to the page on the ${attrs.side} by clicking here?` }]
    : [{ content: <RightArrow /> }, { content: `Hey, why don't you go to the page on the ${attrs.side} by clicking here?` }])
  );

  const button = <button class='page-changer' style={`${attrs.side}: 1em;`} /> as HTMLButtonElement;

  function changeButtonContent() {
    button.replaceChildren(content.current.content);
    content.current = content.current.next!;
  }

  changeButtonContent();
  changeNavButtonCallbacks.push(changeButtonContent);

  button.onclick = (e) => {
    e.preventDefault();
    attrs.to.focus();
  };
  return button;
}

export function changeNavButtons() {
  for (const fn of changeNavButtonCallbacks) fn();
}
