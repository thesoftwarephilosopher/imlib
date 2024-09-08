const jsx = Symbol.for('jsx');

export const $ = jsxToDOM;

export function jsxToDOM<T extends Node>({ [jsx]: tag, ...attrs }: JSX.Element): T {
  if (typeof tag === 'function') {
    const result = tag(attrs);
    if (result && typeof result === 'object' && jsx in result) {
      return jsxToDOM(result);
    }
    return result;
  }

  let children = attrs.children;
  delete attrs.children;
  if (!Array.isArray(children)) children = [children];

  if (tag === '') {
    const goodChildren = getGoodChildren(children);
    if (goodChildren.length === 1) {
      return goodChildren[0];
    }
    const el = document.createDocumentFragment();
    pushChildren(el, goodChildren);
    return el as unknown as T;
  }

  const isSvg = svgs.has(tag);
  const el = (isSvg
    ? document.createElementNS('http://www.w3.org/2000/svg', tag)
    : document.createElement(tag));

  pushChildren(el, getGoodChildren(children));

  for (const [key, val] of Object.entries(attrs)) {
    if (key.startsWith('data-')) {
      el.dataset[key.slice(5)] = val;
    }
    else if (isSvg) {
      const jsKey = key.replace(/-\w/, (s) => `${s.toUpperCase()}`);
      el.setAttribute(jsKey, val);
    }
    else {
      const jsKey = replacements[key] ?? key.replace(/-\w/, (s) => `${s.toUpperCase()}`);
      if (isSvg || attributes.has(jsKey)) {
        el.setAttribute(jsKey, val);
      }
      else {
        (el as any)[jsKey] = val;
      }
    }
  }
  return el;
}

function getGoodChildren(children: any) {
  return [children].flat(Infinity).filter(child => child !== null && child !== undefined && child !== false);
}

function pushChildren(el: DocumentFragment | HTMLElement | SVGElement, children: any[]) {
  for (let child of children) {
    if (typeof child === 'object' && jsx in child) {
      child = jsxToDOM(child);
    }

    if (child instanceof HTMLLinkElement || child instanceof HTMLStyleElement) {
      document.head.append(child);
    }
    else {
      el.append(child);
    }
  }
}

const replacements: Record<string, string> = {
  "class": 'className',
};

const attributes = new Set(['d', 'viewBox']);
const svgs = new Set(['svg', 'path', 'use']);
