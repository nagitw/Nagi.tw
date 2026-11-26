import { createServer } from 'node:http';
import { readFileSync, statSync } from 'node:fs';
import { resolve, extname, sep } from 'node:path';
const root = resolve('dist');
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.wasm': 'application/wasm',
};
createServer((req, res) => {
  try {
    const path = decodeURIComponent(
      new URL(req.url, 'http://localhost').pathname,
    );
    if (!path.startsWith('/Nagi.tw/')) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    let file = resolve(root, '.' + path.slice('/Nagi.tw'.length));
    if (file !== root && !file.startsWith(root + sep))
      throw new Error('Invalid path');
    if (statSync(file).isDirectory()) file = resolve(file, 'index.html');
    res.writeHead(200, {
      'Content-Type': mime[extname(file)] ?? 'application/octet-stream',
    });
    res.end(readFileSync(file));
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(readFileSync(resolve(root, '404.html')));
  }
}).listen(4322, '127.0.0.1', () =>
  console.log('V4 production preview: http://127.0.0.1:4322/Nagi.tw/'),
);
