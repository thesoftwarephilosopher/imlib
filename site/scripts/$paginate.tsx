import { makePaginator } from "./$paginator.js";
import { Reactive, reactTo } from "./$reactive.js";

for (const div of document.querySelectorAll<HTMLElement>('[data-paginate]')) {
  enablePagination(div, (+div.dataset["paginate"]!));
}

function enablePagination(topParent: HTMLElement, perPage: number) {
  const [loaders, parent] = topParent.children as Iterable<HTMLElement>;
  loaders!.remove();
  parent!.hidden = false;

  const items: HTMLElement[] = [];
  const headers = new Map<HTMLElement, HTMLElement>();

  let lastHeader;

  for (const child of parent!.children as Iterable<HTMLElement>) {
    if (child.tagName === 'H3') {
      lastHeader = child;
    }
    else {
      items.push(child);
      if (lastHeader) {
        headers.set(child, lastHeader);
      }
    }
  }

  const matchingItems = new Reactive(items);

  const paginator = makePaginator(matchingItems, perPage);

  reactTo({ visibleItems: paginator.visibleItems }, deps => {
    for (const header of headers.values()) {
      header.hidden = true;
    }

    for (const item of items) {
      const visible = deps.visibleItems.val.includes(item);
      item.hidden = !visible;
      if (visible) {
        const header = headers.get(item);
        if (header) {
          header.hidden = false;
        }
      }
    }
  });

  parent!.insertAdjacentElement('afterbegin', paginator.controls);
}
