#!/usr/bin/env node

const cmd = process.argv[2];

if (cmd === 'dev') {
  require('./main');
}
else if (cmd === 'generate') {
  require('./generate');
}
