/* ========================================================================
   WiFi 学习工作区 — 检索练习组件 (Retrieval Practice)
   所有 lessons/*.html 复用。设计原则：
     - 单选 / 多选 / 填空
     - 选项长度尽量统一，避免格式泄题
     - 即时反馈（正确 / 错误 + 解释）
   用法（在 lesson HTML 末尾引入本脚本）：
     <script src="../assets/quiz.js"></script>
     <div class="quiz" data-question="..."></div>
   ─ 见 quiz.js 内文档 ──────────────────────────────────
   ======================================================================== */

(function () {
  "use strict";

  // 自动增强所有 .quiz[data-...] 容器
  function enhanceAll(root) {
    root.querySelectorAll(".quiz:not([data-enhanced])").forEach(enhance);
  }

  function enhance(container) {
    const type = container.getAttribute("data-type") || "single";
    const question = container.getAttribute("data-question") || "";
    const explain = container.getAttribute("data-explain") || "";

    // 选项通过 <script type="application/json"> 内联
    const dataEl = container.querySelector('script[type="application/json"]');
    let options = [];
    if (dataEl) {
      try { options = JSON.parse(dataEl.textContent); }
      catch (e) { options = []; }
    }
    if (!options.length) {
      container.setAttribute("data-enhanced", "1");
      return;
    }

    container.setAttribute("data-enhanced", "1");
    container.classList.add("quiz-box");

    // 题干
    const q = document.createElement("div");
    q.className = "quiz-question";
    q.textContent = question;
    container.appendChild(q);

    // 选项列表
    const list = document.createElement("div");
    list.className = "quiz-options";
    const isMulti = type === "multi";

    options.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.className = "quiz-option";
      btn.type = "button";
      btn.textContent = opt.text;
      btn.dataset.correct = opt.correct ? "1" : "0";

      btn.addEventListener("click", function () {
        if (container.classList.contains("quiz-locked")) return;

        if (isMulti) {
          // 多选：先标选，再由「检查」按钮结算
          btn.classList.toggle("selected");
        } else {
          // 单选：立即结算全部
          settle(container, list);
        }
      });

      list.appendChild(btn);
    });
    container.appendChild(list);

    // 多选加「检查」按钮
    if (isMulti) {
      const check = document.createElement("button");
      check.type = "button";
      check.className = "quiz-check";
      check.textContent = "检查 / Check";
      check.addEventListener("click", function () {
        if (container.classList.contains("quiz-locked")) return;
        settle(container, list);
      });
      container.appendChild(check);
    }

    // 解释区
    if (explain) {
      const exp = document.createElement("div");
      exp.className = "quiz-explain";
      exp.textContent = explain;
      exp.style.display = "none";
      container.appendChild(exp);
    }
  }

  function settle(container, list) {
    container.classList.add("quiz-locked");
    let allRight = true;
    list.querySelectorAll(".quiz-option").forEach(function (btn) {
      const correct = btn.dataset.correct === "1";
      const chosen = btn.classList.contains("selected") || btn.classList.contains("chosen");
      btn.classList.remove("selected");
      if (correct) {
        btn.classList.add("right");
      }
      if (chosen && !correct) {
        btn.classList.add("wrong");
        allRight = false;
      } else if (chosen && correct) {
        btn.classList.add("chosen");
      }
      if (!correct) {
        // 标出干扰项但不染色，保持克制
      }
      btn.disabled = true;
    });
    // 单选时，被点的那个加 chosen
    if (!list.querySelector(".quiz-option.chosen") &&
        !list.querySelector(".quiz-option.wrong")) {
      // 单选正确路径
    }

    container.classList.add(allRight ? "quiz-correct" : "quiz-incorrect");

    const exp = container.querySelector(".quiz-explain");
    if (exp) exp.style.display = "block";
  }

  // 单选点击时需标记 chosen —— 重写 click 处理给单选
  document.addEventListener("click", function (e) {
    const btn = e.target.closest(".quiz-option");
    if (!btn || btn.disabled) return;
    const container = btn.closest(".quiz");
    const type = container.getAttribute("data-type") || "single";
    if (type !== "single") return;
    if (container.classList.contains("quiz-locked")) return;
    // 标记被选
    container.querySelectorAll(".quiz-option").forEach(function (b) {
      b.classList.remove("chosen");
    });
    btn.classList.add("chosen");
  }, true);

  // 启动
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { enhanceAll(document); });
  } else {
    enhanceAll(document);
  }

  // 暴露给 lesson 手动调用（如动态加载题目）
  window.WifiQuiz = { enhance: enhance, enhanceAll: enhanceAll };
})();
