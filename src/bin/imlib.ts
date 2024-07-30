#!/usr/bin/env node

import { generateFiles } from "./generate";
import { startDevServer } from "./main";

const cmd = process.argv[2] ?? '';

const fns: Record<string, () => void> = {
  dev: startDevServer,
  generate: generateFiles,
};

const fn = fns[cmd] ?? showHelp;
fn();

function showHelp() {
  console.log("Usage: imlib <dev | generate>");
}
