/* ========================================================================
   WiFi 学习工作区 — 笔记组件 (Note Taker)
   功能：
     - 在任何课程页选中文字 → 右键 → 弹窗记笔记
     - 笔记存到 localStorage（跨课、跨会话保留）
     - 自动记录来源课程页、选中的原文
     - 课程页右上角「📓 我的笔记」按钮：查看 / 搜索 / 删除 / 导出
     - 导出为独立 HTML 文件（备份 + 可放进工作区）

   用法（在 lesson HTML 末尾引入）：
     <script src="../assets/note-taker.js"></script>
   无需其它配置，自动生效。
   ======================================================================== */

(function () {
  "use strict";

  var STORAGE_KEY = "wifi-notes-v1";

  // ── 存取 ──────────────────────────────────────────────
  function loadNotes() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) { return []; }
  }

  function saveNotes(notes) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(notes)); }
    catch (e) { alert("笔记保存失败，可能是浏览器存储已满：" + e.message); }
  }

  function addNote(note) {
    var notes = loadNotes();
    notes.unshift(note); // 最新的在前
    saveNotes(notes);
  }

  function deleteNote(id) {
    var notes = loadNotes().filter(function (n) { return n.id !== id; });
    saveNotes(notes);
  }

  // ── 工具 ──────────────────────────────────────────────
  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function escapeHTML(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function formatDate(ts) {
    var d = new Date(ts);
    var pad = function (n) { return n < 10 ? "0" + n : n; };
    return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()) +
           " " + pad(d.getHours()) + ":" + pad(d.getMinutes());
  }

  // 当前页面的友好名称（从 <title> 或文件名推断）
  function pageName() {
    var t = document.title || "";
    // 形如「第 5 课 · CSMA/CA 退避 —— ...」取前半
    var m = t.split("·")[0].trim();
    return m || t || location.pathname.split("/").pop();
  }

  // ── 右键菜单 ──────────────────────────────────────────
  var contextMenu = null;

  function onContextMenu(e) {
    var sel = window.getSelection();
    var text = sel ? sel.toString().trim() : "";
    if (!text) return; // 没选中文字，不拦截，走默认右键菜单

    e.preventDefault();

    // 构建自定义菜单
    if (!contextMenu) {
      contextMenu = document.createElement("div");
      contextMenu.className = "nt-menu";
      document.body.appendChild(contextMenu);
    }
    contextMenu.innerHTML =
      '<div class="nt-menu-item" id="nt-add-note">📓 记笔记 / Add Note</div>' +
      '<div class="nt-menu-hint">（选中内容已捕获）</div>';
    contextMenu.style.left = Math.min(e.clientX, window.innerWidth - 220) + "px";
    contextMenu.style.top = Math.min(e.clientY, window.innerHeight - 80) + "px";
    contextMenu.style.display = "block";

    var capturedText = text;
    document.getElementById("nt-add-note").onclick = function () {
      contextMenu.style.display = "none";
      openEditor(capturedText);
    };
  }

  document.addEventListener("click", function (e) {
    if (contextMenu && !e.target.closest(".nt-menu")) {
      contextMenu.style.display = "none";
    }
  });

  // ── 编辑弹窗 ──────────────────────────────────────────
  function openEditor(capturedText) {
    var overlay = document.createElement("div");
    overlay.className = "nt-overlay";
    overlay.innerHTML =
      '<div class="nt-modal">' +
        '<div class="nt-modal-title">📓 记笔记</div>' +

        '<label class="nt-label">选中原文（自动捕获）</label>' +
        '<div class="nt-captured">' + escapeHTML(capturedText) + '</div>' +

        '<label class="nt-label" for="nt-title">标题 *</label>' +
        '<input class="nt-input" id="nt-title" type="text" placeholder="一句话概括这条笔记" autofocus>' +

        '<label class="nt-label" for="nt-tags">标签（逗号分隔，可选）</label>' +
        '<input class="nt-input" id="nt-tags" type="text" placeholder="如：CSMA/CA, 退避, MAC">' +

        '<label class="nt-label" for="nt-body">我的理解 / 补充（可选）</label>' +
        '<textarea class="nt-textarea" id="nt-body" placeholder="用自己的话写——有助于记忆。也可以写疑问。"></textarea>' +

        '<div class="nt-actions">' +
          '<button class="nt-btn nt-btn-cancel" id="nt-cancel">取消</button>' +
          '<button class="nt-btn nt-btn-save" id="nt-save">保存</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);

    var titleEl = document.getElementById("nt-title");
    titleEl.focus();

    function close() { document.body.removeChild(overlay); }
    document.getElementById("nt-cancel").onclick = close;
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) close();
    });
    document.getElementById("nt-save").onclick = function () {
      var title = titleEl.value.trim();
      if (!title) { titleEl.focus(); alert("请填标题"); return; }
      var note = {
        id: uid(),
        ts: Date.now(),
        title: title,
        tags: document.getElementById("nt-tags").value.trim(),
        body: document.getElementById("nt-body").value.trim(),
        quote: capturedText,
        source: pageName(),
        sourceUrl: location.pathname.split("/").pop()
      };
      addNote(note);
      close();
      flashToast("已保存 ✓");
    };
  }

  // ── Toast 提示 ────────────────────────────────────────
  function flashToast(msg) {
    var t = document.createElement("div");
    t.className = "nt-toast";
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function () { t.classList.add("nt-toast-show"); }, 10);
    setTimeout(function () {
      t.classList.remove("nt-toast-show");
      setTimeout(function () { document.body.removeChild(t); }, 300);
    }, 1500);
  }

  // ── 笔记查看面板 ──────────────────────────────────────
  function openViewer() {
    var overlay = document.createElement("div");
    overlay.className = "nt-overlay";
    var notes = loadNotes();

    overlay.innerHTML =
      '<div class="nt-modal nt-modal-wide">' +
        '<div class="nt-modal-title">📓 我的笔记 <span class="nt-count">(' + notes.length + ')</span></div>' +

        '<div class="nt-toolbar">' +
          '<input class="nt-input nt-search" id="nt-search" type="text" placeholder="🔍 搜索标题/标签/内容">' +
          '<button class="nt-btn nt-btn-export" id="nt-export">⬇ 导出 HTML</button>' +
        '</div>' +

        '<div class="nt-list" id="nt-list">' + renderNotes(notes) + '</div>' +

        '<div class="nt-actions">' +
          '<button class="nt-btn nt-btn-cancel" id="nt-close-viewer">关闭</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);

    // 搜索
    document.getElementById("nt-search").oninput = function () {
      var q = this.value.toLowerCase().trim();
      var filtered = notes.filter(function (n) {
        if (!q) return true;
        return (n.title + " " + n.tags + " " + n.body + " " + n.quote).toLowerCase().indexOf(q) >= 0;
      });
      document.getElementById("nt-list").innerHTML = renderNotes(filtered);
      bindDelete();
    };

    // 导出
    document.getElementById("nt-export").onclick = function () { exportHTML(); };

    // 删除
    function bindDelete() {
      var dels = document.querySelectorAll(".nt-note-del");
      for (var i = 0; i < dels.length; i++) {
        dels[i].onclick = function () {
          if (!confirm("删除这条笔记？")) return;
          deleteNote(this.getAttribute("data-id"));
          openViewerClose(overlay);
          openViewer();
        };
      }
    }
    bindDelete();

    function openViewerClose(o) { document.body.removeChild(o); }
    document.getElementById("nt-close-viewer").onclick = function () { openViewerClose(overlay); };
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) openViewerClose(overlay);
    });
  }

  function renderNotes(notes) {
    if (!notes.length) {
      return '<div class="nt-empty">还没有笔记。在课程页选中一段文字，右键试试。</div>';
    }
    return notes.map(function (n) {
      var tagsHTML = n.tags
        ? '<div class="nt-note-tags">' + n.tags.split(/[，,]/).map(function (t) {
            return '<span class="nt-tag">' + escapeHTML(t.trim()) + '</span>';
          }).join("") + '</div>'
        : "";
      var bodyHTML = n.body ? '<div class="nt-note-body">' + escapeHTML(n.body).replace(/\n/g, "<br>") + '</div>' : "";
      var quoteHTML = n.quote
        ? '<div class="nt-note-quote">「' + escapeHTML(n.quote) + '」</div>' : "";
      return (
        '<div class="nt-note">' +
          '<div class="nt-note-head">' +
            '<span class="nt-note-title">' + escapeHTML(n.title) + '</span>' +
            '<button class="nt-note-del" data-id="' + n.id + '">✕</button>' +
          '</div>' +
          '<div class="nt-note-meta">' + formatDate(n.ts) + ' · 来源：' + escapeHTML(n.source) + '</div>' +
          quoteHTML +
          bodyHTML +
          tagsHTML +
        '</div>'
      );
    }).join("");
  }

  // ── 导出 HTML 文件 ────────────────────────────────────
  function exportHTML() {
    var notes = loadNotes();
    if (!notes.length) { alert("没有笔记可导出。"); return; }

    var body = notes.map(function (n) {
      var tags = n.tags
        ? '<div class="note-tags">' + escapeHTML(n.tags) + '</div>' : "";
      var quote = n.quote
        ? '<blockquote>' + escapeHTML(n.quote) + '</blockquote>' : "";
      var bodyTxt = n.body
        ? '<p>' + escapeHTML(n.body).replace(/\n/g, "<br>") + '</p>' : "";
      return (
        '<article class="note">' +
          '<h2>' + escapeHTML(n.title) + '</h2>' +
          '<div class="note-meta">' + formatDate(n.ts) + ' · 来源：' + escapeHTML(n.source) + '</div>' +
          quote + bodyTxt + tags +
        '</article>'
      );
    }).join("");

    var html =
'<!DOCTYPE html>\n' +
'<html lang="zh-CN"><head><meta charset="UTF-8">\n' +
'<title>我的 WiFi 学习笔记（导出 ' + formatDate(Date.now()) + '）</title>\n' +
'<style>\n' +
'body{font-family:"PingFang SC","Microsoft YaHei",Georgia,serif;max-width:720px;margin:2rem auto;padding:0 1.5rem;line-height:1.7;color:#222;background:#fdfdfb;}\n' +
'h1{font-size:1.5rem;border-bottom:2px solid #b8341c;padding-bottom:.4rem;color:#b8341c;}\n' +
'.note{border-left:3px solid #d8d2c4;padding:.6rem 1.1rem;margin:1.4rem 0;background:#faf6ef;border-radius:0 4px 4px 0;}\n' +
'.note h2{font-size:1.1rem;margin:0 0 .3rem;}\n' +
'.note-meta{font-size:.8rem;color:#888;}\n' +
'.note blockquote{margin:.5rem 0;color:#555;border-left:3px solid #b8341c;padding-left:.8rem;font-style:italic;}\n' +
'.note-tags{margin-top:.5rem;font-size:.8rem;color:#2f6b42;}\n' +
'.exported-meta{text-align:center;color:#888;font-size:.85rem;margin-bottom:2rem;}\n' +
'</style></head><body>\n' +
'<h1>📓 我的 WiFi 学习笔记</h1>\n' +
'<div class="exported-meta">导出于 ' + formatDate(Date.now()) + ' · 共 ' + notes.length + ' 条</div>\n' +
body + '\n</body></html>';

    var blob = new Blob([html], { type: "text/html;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "my-notes-" + new Date().toISOString().slice(0, 10) + ".html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  // ── 右上角按钮 ────────────────────────────────────────
  function injectButton() {
    var btn = document.createElement("button");
    btn.className = "nt-fab";
    btn.innerHTML = "📓";
    btn.title = "我的笔记";
    btn.onclick = openViewer;
    document.body.appendChild(btn);
  }

  // ── 启动 ──────────────────────────────────────────────
  function init() {
    if (document.querySelector(".nt-fab")) return; // 防重复
    injectButton();
    document.addEventListener("contextmenu", onContextMenu);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
