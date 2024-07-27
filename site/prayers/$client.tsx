import { setupGamepads } from "./$gamepad.js";
import { setupTabs, tabs } from "./$tab.js";

for (const el of document.querySelectorAll(`.show-today:not(.day-${new Date().getDay()})`)) {
  el.closest('.panel')?.remove();
}

setupTabs();
setupGamepads();
tabs.first.focus();
