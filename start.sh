#!/usr/bin/env bash
# 一键启动本地服务 + localtunnel 外网访问(两个独立进程)
# 用法: 在 Git Bash 里执行  ./start.sh
#   可带参数自定义端口/子域名:  ./start.sh 8000 cwna-lvyq-2026
#
# 架构:
#   后台进程1: node watch.js (会 spawn serve.js)
#   后台进程2: lt (localtunnel 客户端)
#   两者独立,kill 一个不影响另一个

set -e

PORT="${1:-8000}"
SUBDOMAIN="${2:-cwna-lvyq-2026}"

cd "$(dirname "$0")"

# 检查 node
if ! command -v node >/dev/null 2>&1; then
  echo "❌ 未找到 node,请先安装 Node.js"
  exit 1
fi

# 检查 localtunnel
if ! command -v lt >/dev/null 2>&1; then
  echo "❌ 未找到 lt 命令,请先安装:  npm i -g localtunnel"
  exit 1
fi

# 启动前自动清理占用端口的残留进程(防止 EADDRINUSE)
echo "🧹 检查端口 $PORT 是否被占用..."
PIDS=$(netstat -ano | grep ":$PORT" | grep LISTENING | awk '{print $5}' | sort -u)
if [ -n "$PIDS" ]; then
  echo "   发现占用进程: $PIDS,正在清理..."
  for PID in $PIDS; do
    taskkill //PID "$PID" //F 2>/dev/null || true
  done
  sleep 1
  echo "   ✅ 已清理"
else
  echo "   ✅ 端口空闲"
fi

echo "========================================"
echo "  端口: $PORT"
echo "  子域名(请求值): $SUBDOMAIN"
echo "  ⚠️ 真实地址以 localtunnel 输出的 'your url is:' 为准"
echo "========================================"

# 后台启动本地服务(独立进程1)
node watch.js &
SERVE_PID=$!

# 确保退出时一起关掉两个子进程
cleanup() {
  echo ""
  echo "🛑 正在停止所有服务..."
  kill $SERVE_PID 2>/dev/null
  jobs -p | xargs -r kill 2>/dev/null
}
trap cleanup EXIT INT TERM

# 等本地服务起来
sleep 1

# 启动 localtunnel(独立进程2,前台)
echo ""
echo "🌐 启动 localtunnel(独立于 server)..."
lt --port "$PORT" --subdomain "$SUBDOMAIN" --print-requests
