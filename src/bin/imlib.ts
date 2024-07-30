#!/usr/bin/env node

import { generateFiles } from "./generate";
import { startDevServer } from "./main";

const cmd = process.argv[2];

if (cmd === 'dev') {
  startDevServer();
}
else if (cmd === 'generate') {
  generateFiles();
}
