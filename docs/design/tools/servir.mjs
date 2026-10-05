import { createServer } from 'node:http';
import { readFileSync, statSync, openSync, readSync, closeSync } from 'node:fs';
import { join, extname } from 'node:path';
import { gzipSync } from 'node:zlib';

const PORT = parseInt(process.argv[2], 10) || 8080;
const ROOT = process.cwd();
const cache = new Map();

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain',
  '.md': 'text/markdown'
};

const shouldCompress = (mime) => {
  if (!mime) return false;
  return mime.startsWith('text/') || 
         mime === 'application/javascript' || 
         mime === 'application/json' || 
         mime === 'image/svg+xml';
};

createServer((req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    let pathname = url.pathname;
    if (pathname === '/') pathname = '/index.html';
    
    const filePath = join(ROOT, pathname);
    
    // Prevent directory traversal
    if (!filePath.startsWith(ROOT)) {
      res.writeHead(403);
      return res.end('Forbidden');
    }

    let stats;
    try {
      stats = statSync(filePath);
    } catch {
      res.writeHead(404);
      return res.end('Not Found');
    }

    if (stats.isDirectory()) {
      res.writeHead(403);
      return res.end('Forbidden');
    }

    const ext = extname(filePath).toLowerCase();
    const mime = mimeTypes[ext] || 'application/octet-stream';
    const acceptEncoding = req.headers['accept-encoding'] || '';
    
    const isMp4 = ext === '.mp4';
    
    if (isMp4) {
      const range = req.headers.range;
      if (range) {
        // "bytes=a-b", "bytes=a-" e "bytes=-n" (os ultimos n bytes)
        const m = /^bytes=(\d*)-(\d*)$/.exec(range);
        let start = 0;
        let end = stats.size - 1;
        if (m && m[1] === '' && m[2] !== '') {
          start = Math.max(0, stats.size - parseInt(m[2], 10));
        } else if (m && m[1] !== '') {
          start = parseInt(m[1], 10);
          if (m[2] !== '') end = Math.min(parseInt(m[2], 10), stats.size - 1);
        }
        if (!m || start > end || start >= stats.size) {
          res.writeHead(416, { 'Content-Range': `bytes */${stats.size}` });
          return res.end();
        }
        const chunksize = (end - start) + 1;

        // No caching for ranges for simplicity
        const fd = openSync(filePath, 'r');
        const buffer = Buffer.alloc(chunksize);
        readSync(fd, buffer, 0, chunksize, start);
        closeSync(fd);

        res.writeHead(206, {
          'Content-Range': `bytes ${start}-${end}/${stats.size}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': mime,
        });
        return res.end(buffer);
      } else {
        res.writeHead(200, {
          'Content-Length': stats.size,
          'Content-Type': mime,
          'Accept-Ranges': 'bytes',
        });
        const content = readFileSync(filePath);
        return res.end(content);
      }
    }

    let fileData = cache.get(filePath);
    if (!fileData) {
      const raw = readFileSync(filePath);
      const compress = shouldCompress(mime);
      let gzipped = null;
      if (compress) {
        gzipped = gzipSync(raw);
      }
      fileData = { raw, gzipped, mime, compress };
      cache.set(filePath, fileData);
    }

    const headers = {
      'Content-Type': fileData.mime
    };

    let payload = fileData.raw;

    if (fileData.compress) {
      headers['Vary'] = 'Accept-Encoding';
      if (acceptEncoding.includes('gzip')) {
        headers['Content-Encoding'] = 'gzip';
        payload = fileData.gzipped;
      }
    }
    
    headers['Content-Length'] = payload.length;
    res.writeHead(200, headers);
    res.end(payload);

  } catch (err) {
    console.error(err);
    res.writeHead(500);
    res.end('Internal Server Error');
  }
}).listen(PORT, '127.0.0.1', () => {
  console.log(`Server running at http://127.0.0.1:${PORT}/`);
});
