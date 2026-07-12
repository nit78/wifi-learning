/* ========================================================================
   WiFi 学习工作区 — BT ↔ WiFi 对照表组件
   学员是蓝牙固件背景，对照表会跨多节课反复使用（FHSS→OFDM、TDMA→CSMA/CA 等）。
   把它做成组件，避免每节课内联重复。

   用法（lesson HTML 中）：
     <div class="compare"
          data-caption="蓝牙 vs Wi-Fi 介质访问">
       <script type="application/json">
         [
           { "aspect": "接入范式",  "bt": "调度式 TDMA",   "wifi": "竞争式 CSMA/CA" },
           { "aspect": "频谱利用",  "bt": "FHSS 79 信道",  "wifi": "OFDM 子载波" }
         ]
       </script>
     </div>
     <script src="../assets/compare-table.js"></script>
   ======================================================================== */

(function () {
  "use strict";

  const LABEL_BT = "蓝牙 / Bluetooth";
  const LABEL_WIFI = "Wi-Fi (802.11)";

  function build(table, caption, rows) {
    const wrap = document.createElement("div");
    wrap.className = "compare-wrap";

    if (caption) {
      const cap = document.createElement("div");
      cap.className = "compare-caption";
      cap.textContent = caption;
      wrap.appendChild(cap);
    }

    const tbl = document.createElement("table");
    tbl.className = "compare-table";

    // 表头
    const thead = document.createElement("thead");
    thead.innerHTML =
      '<tr><th class="compare-aspect-h">维度 / Aspect</th>' +
      '<th class="compare-bt-h">' + LABEL_BT + '</th>' +
      '<th class="compare-wifi-h">' + LABEL_WIFI + '</th></tr>';
    tbl.appendChild(thead);

    // 表体
    const tbody = document.createElement("tbody");
    rows.forEach(function (r) {
      const tr = document.createElement("tr");
      tr.innerHTML =
        '<td class="compare-aspect">' + escapeHTML(r.aspect) + '</td>' +
        '<td class="compare-bt">' + escapeHTML(r.bt) + '</td>' +
        '<td class="compare-wifi">' + escapeHTML(r.wifi) + '</td>';
      tbody.appendChild(tr);
    });
    tbl.appendChild(tbody);

    wrap.appendChild(tbl);
    table.innerHTML = "";
    table.appendChild(wrap);
    table.setAttribute("data-enhanced", "1");
  }

  function escapeHTML(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function enhance(el) {
    if (el.getAttribute("data-enhanced") === "1") return;
    const caption = el.getAttribute("data-caption") || "";
    const dataEl = el.querySelector('script[type="application/json"]');
    let rows = [];
    if (dataEl) {
      try { rows = JSON.parse(dataEl.textContent) || []; }
      catch (e) { rows = []; }
    }
    if (rows.length) build(el, caption, rows);
  }

  function enhanceAll(root) {
    root.querySelectorAll(".compare:not([data-enhanced])").forEach(enhance);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { enhanceAll(document); });
  } else {
    enhanceAll(document);
  }

  window.WifiCompare = { enhance: enhance, enhanceAll: enhanceAll };
})();
