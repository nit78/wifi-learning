// 文件监听 + 自动重启 serve.js
// 用法: node watch.js
// 监测到根目录下 .html/.css/.js/.md 文件变化时,自动重启 serve.js 子进程
// 设计:外层保活,子进程跑 serve.js;文件变化 → 杀旧子进程 → 起新子进程

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const WATCH_EXTS = new Set(['.html', '.css', '.js', '.md', '.json']);
// 忽略自己,否则 watch.js 改动会无限重启
const SELF = path.basename(__filename);
// 轮询间隔(ms)——fs.watch 在 Windows 网络盘/某些场景不可靠,用轮询更稳
const INTERVAL = 1000;

let child = null;
let restartTimer = null;
let intentionalKill = false;  // 标记:是否是我们主动杀的(避免误重启循环)
let crashCount = 0;           // 连续崩溃计数
const CRASH_LIMIT = 5;        // 连续崩溃超过此值则停止重试,防止死循环

function log(msg) {
  console.log(`[watch ${new Date().toLocaleTimeString()}] ${msg}`);
}

function startServe() {
  intentionalKill = false;
  child = spawn('node', ['serve.js'], {
    cwd: ROOT,
    stdio: 'inherit',  // 子进程输出直接透传到当前终端
    shell: false,
  });
  child.on('exit', (code, signal) => {
    if (intentionalKill) {
      // 是我们主动杀的(文件变化触发的重启),正常流程,不计数
      return;
    }
    // serve.js 自己崩了 —— 自动重试拉起,避免服务永久下线
    crashCount++;
    log(`⚠️ serve.js crashed unexpectedly (code=${code} signal=${signal}), crash #${crashCount}`);
    if (crashCount > CRASH_LIMIT) {
      log(`❌ Too many crashes (${crashCount}). Stopping auto-restart to avoid loop.`);
      log(`   Fix the error in serve.js, then restart watch.js.`);
      child = null;
      return;
    }
    log(`   Auto-restarting in 2s ...`);
    setTimeout(() => { startServe(); }, 2000);
  });
  // 成功启动一轮,过 10 秒清零崩溃计数(说明已经稳定运行)
  setTimeout(() => { if (child) crashCount = 0; }, 10000);
  log('serve.js started (PID ' + child.pid + ')');
}

function restart() {
  if (!child) return;
  log('file changed → restarting serve.js ...');
  const old = child;
  child = null;
  intentionalKill = true;  // 告诉 exit handler:这是我们主动杀的,别自动重试
  try { process.kill(old.pid); } catch (e) { /* ignore */ }
  // 不再猜端口状态:serve.js 自己有 EADDRINUSE 重试逻辑,会等端口可用
  // 等 200ms 让旧进程彻底退出,然后直接起新 serve.js
  old.on('exit', () => {
    log('  old serve.js exited, starting new one (serve.js handles EADDRINUSE itself)');
    setTimeout(startServe, 200);
  });
  // 兜底:2 秒后如果 exit 没触发,直接起新的
  setTimeout(() => {
    if (!child) {
      log('  exit event timeout, starting new serve.js anyway');
      startServe();
    }
  }, 2000);
}

function scheduleRestart() {
  // 防抖:连续保存只在最后一次变化后 800ms 重启一次
  if (restartTimer) clearTimeout(restartTimer);
  restartTimer = setTimeout(restart, 800);
}

// 用快照法监听:每秒扫描一次,记录每个文件的 mtime,变化即触发
// 比 fs.watch 慢一点但跨平台最可靠
const snapshot = new Map(); // path -> mtimeMs

function scan(dir) {
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); }
  catch (e) { return; }
  for (const e of entries) {
    if (e.name.startsWith('.')) continue;  // 跳过隐藏文件
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      scan(full);  // 递归
    } else {
      const ext = path.extname(e.name).toLowerCase();
      if (!WATCH_EXTS.has(ext)) continue;
      if (e.name === SELF) continue;
      try {
        const st = fs.statSync(full);
        const prev = snapshot.get(full);
        if (!BOOTSTRAPPING) {
          if (prev === undefined) {
            // 新文件(从无到有)
            log(`  added: ${path.relative(ROOT, full)}`);
            scheduleRestart();
          } else if (prev !== st.mtimeMs) {
            // 已有文件被修改
            log(`  changed: ${path.relative(ROOT, full)}`);
            scheduleRestart();
          }
        }
        snapshot.set(full, st.mtimeMs);
      } catch (e) { /* ignore */ }
    }
  }
}

let BOOTSTRAPPING = true;  // 首次扫描只建快照,不触发重启

function buildSnapshot() {
  snapshot.clear();
  scan(ROOT);
  BOOTSTRAPPING = false;  // 后续变化才视为真实变更
}

// === 启动 ===
log('File watcher started. Watching: ' + Object.values(WATCH_EXTS).join(' ') + ' in ' + ROOT);
buildSnapshot();
startServe();

setInterval(() => {
  // 重新扫描;扫描中检测到 mtime 变化会触发 scheduleRestart
  scan(ROOT);
}, INTERVAL);

// Ctrl+C 优雅退出:杀掉子进程
process.on('SIGINT', () => {
  log('Stopping...');
  if (child) {
    try { process.kill(child.pid); } catch (e) { /* ignore */ }
  }
  process.exit(0);
});
process.on('SIGTERM', () => {
  if (child) {
    try { process.kill(child.pid); } catch (e) { /* ignore */ }
  }
  process.exit(0);
});
