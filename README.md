# WIFI 学习 - 本地服务 & 外网访问指南

本项目用 `serve.js` 在本地 `8000` 端口提供课件访问,配合 **localtunnel** 把本地服务暴露到外网,让手机也能访问。

---

## 📁 文件说明

| 文件 | 作用 |
|---|---|
| `serve.js` | 本地静态文件服务器(端口 8000,含 EADDRINUSE 自动重试) |
| `watch.js` | 文件监听器,检测到 html/css/js/md 变化时自动重启 serve.js |
| `start.bat` | Windows 一键启动:开两个**独立窗口**(server + tunnel) |
| `start.sh` | Git Bash 版一键启动(同上) |
| `restart-server.bat` | 只重启 **server 窗口**,tunnel 窗口不动 |
| `restart-tunnel.bat` | 只重启 **tunnel 窗口**,server 窗口不动 |
| `kill-port.bat` | 只清理端口占用,不启动服务 |
| `kill-port.bat` | 只清理端口占用,不启动服务 |

---

## 🚀 快速开始(日常使用)

### 第一次启动 / 想重新建立隧道

**双击 `start.bat`**(或在 Git Bash 跑 `./start.sh`)

启动后会看到:
```
[CLEANUP] Checking port 8000 ...
========================================
  PORT      : 8000
  SUBDOMAIN : cwna-lvyq-2026 (requested)
  NOTE      : Real URL is the one lt prints as "your url is:"
========================================

your url is: https://cwna-lvyq-2026.loca.lt   ← 手机打开这个!
```

> ⚠️ **真实地址以 `your url is:` 这行为准**,脚本头部那行只是申请值。如果子域名被占,localtunnel 会自动降级成随机名(如 `brown-frog-51`)。

---

## 📱 手机访问

1. 记下 `your url is:` 输出的真实地址
2. 手机浏览器打开该地址
3. **首次访问要填"密码"** = 你电脑的公网 IP,在电脑上查:
   ```bash
   curl https://loca.lt/mytunnelpassword
   ```

### 访问速查表

首页 `https://你的域名.loca.lt/` 已有速查表入口卡片,或直接访问:
```
https://你的域名.loca.lt/reference/wifi-terms-cheatsheet.html
https://你的域名.loca.lt/reference/rf-math-cheatsheet.html
https://你的域名.loca.lt/reference/                ← 列出目录所有文件
```

---

## ✏️ 编辑课件(新增/修改 html)

**什么都不用做!** `watch.js` 会每秒扫描,检测到 `.html/.css/.js/.md/.json` 变化就自动重启 serve.js。

保存后等 1~2 秒,刷新浏览器即可看到新内容。

---

## 🔧 各种场景对照表

| 你想做的事 | 用什么 | 另一边受影响吗 |
|---|---|---|
| 改完 html,服务器跟上 | 什么都不用做(watch.js 自动) | ❌ tunnel 不动 |
| 手动重启 server | 双击 `restart-server.bat` 或关掉 WIFI-Server 窗口 | ❌ tunnel 不动 |
| lt 报错(502/503)想重连 | 双击 `restart-tunnel.bat` 或关掉 WIFI-Tunnel 重开 | ❌ server 不动 |
| 只清端口,不启动 | 双击 `kill-port.bat` | ❌ tunnel 不动 |
| 彻底关停一切 | 关掉两个窗口 | ✅ 全断 |
| 全新启动 | 双击 `start.bat` | — (两个都重建) |

### 两个窗口的独立性

`start.bat` 会开**两个完全独立的窗口**:

```
窗口1 "WIFI-Server"   → node watch.js(含 serve.js 子进程)
窗口2 "WIFI-Tunnel"   → lt(localtunnel 客户端)
```

- 关掉任一窗口,**另一个不受影响**
- 改 html 触发 server 重启,**tunnel 窗口完全无感知**,手机不 bad gateway
- lt 掉线只需重开 tunnel,server 不用动

---

## ⚠️ 重要:不要用这个命令!

```bash
taskkill //IM node.exe //F     ❌ 千万别用
```

这个命令会**无差别杀掉所有 node 进程**(server + tunnel 一起死)。

需要重启请用对应脚本:
- 重启 server → `restart-server.bat`
- 重启 tunnel → `restart-tunnel.bat`

---

## 🛠️ 自定义参数

### 换端口 / 换子域名

```bash
# Windows
start.bat 8000 my-lvyq-7a3
kill-port.bat 3000

# Git Bash
./start.sh 8000 my-lvyq-7a3
```

### 子域名被占怎么办

如果 `your url is:` 返回了随机名(说明申请的子域名被占),换一个冷门独特的名字:
```
start.bat 8000 wifi-cwna-2026-lvyq
```

> 💡 之前申请过的子域名可能在 localtunnel 服务器侧残留几分钟到几十分钟(显示 HTTP 408),期间无法重新申请,只能换名或等待。

---

## 🧯 常见问题

### Q: 启动报 `EADDRINUSE: address already in use 0.0.0.0:8000`
A: 8000 端口被残留进程占着。`start.bat` 会自动清理;或单独双击 `kill-port.bat`。

### Q: 手机访问返回 503 / 408
A: localtunnel 隧道断了。检查:
1. `lt` 窗口是否还开着?
2. 本地服务是否在跑?(`curl http://localhost:8000/` 应返回 200)
3. 都正常就重启 `start.bat`

### Q: `localtunnel` 报 `'lt' 不是内部或外部命令`
A: 没装或不在 PATH。安装:`npm i -g localtunnel`

### Q: 双击 `.bat` 报中文乱码 / "不是内部或外部命令"
A: `.bat` 文件已全部用英文编写以避免 GBK 编码问题。如果还有乱码,确认用记事本打开没改成 GBK 之外编码。

---

## 📐 架构示意(双独立窗口)

```
┌─────────────────────────────────────────────────────┐
│  start.bat(启动器,可关闭)                          │
│     ├── start "WIFI-Server" cmd /k node watch.js    │ ──┐
│     └── start "WIFI-Tunnel" cmd /k lt --port 8000   │ ──┤
└─────────────────────────────────────────────────────┘  │
                                                          │ 独立窗口
┌──────────────────────────┐    ┌────────────────────────┘
│  窗口1: WIFI-Server      │    │  窗口2: WIFI-Tunnel
│  ┌────────────────────┐  │    │  ┌──────────────────┐
│  │ node watch.js      │  │    │  │ lt (localtunnel) │
│  │   └─spawn→ serve.js│  │    │  │   │              │
│  └────────────────────┘  │    │  └───┴──────────────┘
│       │ 监听文件          │    │      │ WebSocket 长连接
│       │ 自动重启 serve    │    │      ↓
│       ↓                  │    │  loca.lt 服务器
│   localhost:8000  ←──────┼────┘      ↑
└──────────────────────────┘          手机浏览器
```

**关键点**:
- 两个窗口**完全独立**,关掉任一个不影响另一个
- 改 html → watch.js 重启 serve.js → serve.js 自带 EADDRINUSE 重试 → **tunnel 无感知**
- lt 掉线 → 只重开 WIFI-Tunnel 窗口 → server 不用动
