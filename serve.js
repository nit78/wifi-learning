// 极简静态文件服务器 - 支持中文路径和目录列表
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PORT = 8000;
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.gif': 'image/gif', '.svg': 'image/svg+xml', '.pdf': 'application/pdf',
  '.ico': 'image/x-icon',
};

function decodeUrlSafe(u) {
  try { return decodeURIComponent(u); } catch { return u; }
}

function sendFile(res, fullPath) {
  fs.readFile(fullPath, (err, data) => {
    if (err) { res.writeHead(500); res.end('读取失败: ' + err.code); return; }
    const ext = path.extname(fullPath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
}

function parentPath(urlPath) {
  const parts = urlPath.replace(/\/+$/, '').split('/').filter(Boolean);
  parts.pop();
  return '/' + parts.join('/');
}

function listDir(res, dirPath, urlPath) {
  fs.readdir(dirPath, { withFileTypes: true }, (err, entries) => {
    if (err) { res.writeHead(500); res.end('目录读取失败'); return; }
    const items = entries.filter(e => !e.name.startsWith('.'))
      .sort((a, b) => (a.isDirectory() === b.isDirectory()) ? a.name.localeCompare(b.name) : a.isDirectory() ? -1 : 1);
    let html = `<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>📁 ${urlPath}</title>
<style>body{font-family:system-ui,sans-serif;max-width:760px;margin:24px auto;padding:0 16px;color:#333}a{display:block;padding:10px 14px;text-decoration:none;color:#2563eb;border-bottom:1px solid #eee}a:hover{background:#f3f4f6}a.dir{font-weight:600;color:#7c3aed}h1{font-size:20px}.up{color:#666}</style></head><body>`;
    html += `<h1>📁 ${urlPath}</h1>`;
    if (urlPath !== '/') html += `<a class="up" href="${parentPath(urlPath)}/">⬆️ 上级目录</a>`;
    items.forEach(e => {
      const name = e.name + (e.isDirectory() ? '/' : '');
      const icon = e.isDirectory() ? '📁' : '📄';
      const cls = e.isDirectory() ? 'dir' : '';
      html += `<a class="${cls}" href="${encodeURIComponent(name)}">${icon} ${name}</a>`;
    });
    html += `</body></html>`;
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  });
}

// 列出某目录下所有 html 文件,提取标题并按文件名排序
function listLessons(res, dirPath, urlBase) {
  fs.readdir(dirPath, { withFileTypes: true }, (err, entries) => {
    if (err) { res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' }); res.end('[]'); return; }
    const htmlFiles = entries.filter(e => e.isFile() && e.name.toLowerCase().endsWith('.html'))
      .map(e => e.name).sort();
    // 并行读取每个文件的前若干行,提取 <title>
    let pending = htmlFiles.length;
    if (pending === 0) { res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' }); res.end('[]'); return; }
    const result = [];
    htmlFiles.forEach((name, idx) => {
      const full = path.join(dirPath, name);
      fs.readFile(full, 'utf8', (e, data) => {
        let title = name.replace(/\.html$/i, '');
        if (!e) {
          const m = data.match(/<title>([^<]*)<\/title>/i);
          if (m) title = m[1].trim();
        }
        // 从文件名提取序号(如 0006-xxx → 6),用于排序与显示
        const numMatch = name.match(/^(\d+)/);
        const num = numMatch ? parseInt(numMatch[1], 10) : null;
        result.push({ name, title, num, href: (urlBase + '/' + encodeURIComponent(name)).replace(/\/+/g, '/') });
        if (--pending === 0) {
          // 按 num(若有)再按 name 排序
          result.sort((a, b) => {
            if (a.num !== null && b.num !== null) return a.num - b.num;
            return a.name.localeCompare(b.name);
          });
          res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify(result));
        }
      });
    });
  });
}

const server = http.createServer((req, res) => {
  const urlPath = decodeUrlSafe(req.url.split('?')[0]);

  // API:列出某目录下的 html 课程(/api/lessons?dir=lessons)
  if (urlPath === '/api/lessons') {
    const dir = decodeUrlSafe((req.url.split('?')[1] || '').replace(/^dir=/, '')) || 'lessons';
    const safeDir = path.normalize(dir);
    if (safeDir.startsWith('..') || path.isAbsolute(safeDir)) {
      res.writeHead(400); res.end('bad dir'); return;
    }
    listLessons(res, path.join(ROOT, safeDir), safeDir);
    return;
  }

  const fullPath = path.join(ROOT, urlPath);
  // 安全：禁止跳出 ROOT
  const rel = path.relative(ROOT, fullPath);
  if (rel.startsWith('..')) { res.writeHead(403); res.end('禁止访问'); return; }
  fs.stat(fullPath, (err, stat) => {
    if (err) { res.writeHead(404); res.end('404 找不到: ' + urlPath); return; }
    if (stat.isDirectory()) {
      // 默认尝试 index.html
      const idx = path.join(fullPath, 'index.html');
      fs.access(idx, fs.constants.F_OK, e => {
        if (!e) sendFile(res, idx);
        else listDir(res, fullPath, urlPath.endsWith('/') ? urlPath : urlPath + '/');
      });
    } else {
      sendFile(res, fullPath);
    }
  });
});

// 端口被占时自动重试(配合 watch.js 重启场景,避免 TIME_WAIT 导致 EADDRINUSE)
let listenAttempts = 0;
const MAX_LISTEN_ATTEMPTS = 20;  // 最多重试 20 次 × 300ms = 6 秒
function tryListen() {
  server.listen(PORT, '0.0.0.0', () => {
    if (listenAttempts > 0) console.log(`✅ 端口 ${PORT} 已获取(重试 ${listenAttempts} 次后成功)`);
    console.log(`✅ 服务已启动`);
    console.log(`   本机:   http://localhost:${PORT}/`);
    console.log(`   局域网: http://192.168.31.231:${PORT}/`);
    console.log(`   按 Ctrl+C 停止`);
  });
}
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE' && listenAttempts < MAX_LISTEN_ATTEMPTS) {
    listenAttempts++;
    console.log(`⏳ 端口 ${PORT} 暂时占用,第 ${listenAttempts} 次重试(300ms 后)...`);
    setTimeout(tryListen, 300);
  } else {
    console.error('❌ 启动失败:', err.message);
    process.exit(1);
  }
});
tryListen();
