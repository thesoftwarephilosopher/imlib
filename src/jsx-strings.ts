const UNARY = new Set(["img", "br", "hr", "input", "meta", "link"]);

const jsx = Symbol.for('jsx');

export function jsxToString(object: any): string {
  const t = typeof object;
  if (t === 'string') return object;
  if (t === 'undefined' || t === 'boolean' || object === null) return '';
  if (t !== 'object') return String(object);

  const parts: string[] = [];

  if (object instanceof Array) {
    for (const child of object) {
      parts.push(jsxToString(child));
    }
    return parts.join('');
  }

  if (!(jsx in object)) return String(object);

  const tag = object[jsx];
  delete object[jsx];

  if (typeof tag === 'function') {
    return jsxToString(tag(object));
  }

  const children = object.children;
  delete object.children;

  if (tag === '') {
    if (children instanceof Array) {
      for (const child of children) {
        parts.push(jsxToString(child));
      }
    }
    else {
      parts.push(jsxToString(children));
    }
    return parts.join('');
  }

  parts.push('<', tag);
  for (const k in object) {
    const v = object[k];
    if (v === true)
      parts.push(' ', k);
    else if (v)
      parts.push(' ', k, '="', v, '"');
  }
  parts.push('>');

  if (!UNARY.has(tag)) {
    if (children instanceof Array) {
      for (const child of children) {
        parts.push(jsxToString(child));
      }
    }
    else {
      parts.push(jsxToString(children));
    }
    parts.push('</', tag, '>');
  }

  return parts.join('');
}
