import * as chokidar from 'chokidar';
import * as path from 'path';
import { Runtime } from './runtime.js';
import { Server } from './server.js';

process.env['DEV'] = '1';

const server = new Server();
server.startServer(8080);

const runtime = new Runtime("site");
server.handlers = runtime.handlers;

const outfiles = runtime.build();
server.files = outfiles;

const updatedPaths = new Set<string>();
let reloadFsTimer: NodeJS.Timeout;

const pathUpdated = (filePath: string) => {
  updatedPaths.add(filePath.split(path.sep).join(path.posix.sep));
  clearTimeout(reloadFsTimer);
  reloadFsTimer = setTimeout(() => {
    console.log('Rebuilding site...');

    try {
      runtime.pathsUpdated(...updatedPaths);

      const outfiles = runtime.build();
      server.files = outfiles;

      updatedPaths.clear();
      server.rebuilt();
    }
    catch (e) {
      console.error(e);
    }

    console.log('Done.');
  }, 100);
};

(chokidar.watch('site', { ignoreInitial: true, cwd: process.cwd() })
  .on('add', pathUpdated)
  .on('change', pathUpdated)
  .on('unlink', pathUpdated));
