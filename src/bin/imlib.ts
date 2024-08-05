#!/usr/bin/env node

import * as fs from 'fs';
import { processSite } from "../ssg";
import { startDevServer } from "./dev";
import { generateFiles } from "./generate";

const config = {
  siteDir: "site",
  processor: processSite,
  jsxContentBrowser: fs.readFileSync(require.resolve("@imlib/jsx-dom")),
  jsxContentSsg: fs.readFileSync(require.resolve("@imlib/jsx-strings")),
};

const fns: Record<string, () => void> = {
  dev: () => startDevServer(config),
  generate: () => generateFiles(config),
};

const cmd = process.argv[2] ?? '';
const fn = fns[cmd] ?? showHelp;
fn();

function showHelp() {
  console.log("Usage: imlib <dev | generate>");
}
