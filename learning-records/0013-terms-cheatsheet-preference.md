# 偏好：缩写术语的「基本理解」要进速查表

**Status**: active

## 学到的

第 5 课后讨论 SIFS 成分时，学员反馈：「英语缩写专业名词的基本理解都可以加入速查表」。

这是对 reference 目录用途的扩展：除了 RF 数学公式表（算题用），还应有<strong>术语速查表</strong>（查"这缩写啥意思、为什么是这个值"用）。

## 规则确立

- 每个专业缩写/术语，除了在 GLOSSARY.md 有正式定义外，还应进<strong>术语速查表</strong>，带"基本理解"——不是干巴巴的定义，而是"为什么是这样、关键约束/值是什么"。
- 例如 SIFS：不只是"短帧间间隔"，还要有"= RxRFDelay + PLCPDelay + MACProc + RxTxTurnaround，其中 PLCP 解码是大头（12.5μs），收发切换只占 2μs，合计 16μs"。
- 新术语在课程中讲透后，同步加进术语速查表。

## Implications

- ✅ 建立 `reference/wifi-terms-cheatsheet.html`，覆盖前 5 课所有术语。
- ✅ 后续每讲透一个新术语，同步更新此速查表。
- ⚠️ GLOSSARY.md（正式定义，markdown）和术语速查表（基本理解 + 关键值，HTML）并存，用途不同。
