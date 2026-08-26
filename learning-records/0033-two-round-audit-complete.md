# 两轮子代理校对完成（事实核查 + 规则合规）

全课程 26 个 HTML 课经两轮并行子代理校对：第一轮按主题分组做事实核查（对照 kernel.org/IEEE/Wi-Fi Alliance 等权威来源），修复 26 处 + 人工裁决 9 处，要点包括：SAE Commit/Confirm 装在 Auth 帧（算法号=3）内、Block ACK 由 802.11e 引入、A-MSDU 未被弃用（11ac 上限 11454 字节）、802.11g 的 SIFS=10μs（16μs 组合属 11a）、第 3/4 课 FSPL 场景频率原按 2.4GHz 计算却标成 5GHz、MCS11=1024-QAM 5/6、802.11r 的 nonce 交换在 FT Authentication 帧对内、`ieee80211_rx_ni` 是进程上下文变体、per-station debugfs 文件名是 agg_status、AIFS 全称是 Arbitration（仲裁）而非"任意"。第二轮按文件批次做规则合规（LR-0020 翻译逐处/LR-0026 来源区/quiz JSON 完整性与源码位置偏置/链接可达/HTML 卫生）。

**Status**: active
**Implications**: 课程内容可视为"已审计"状态；后续新增课须维持同等校对纪律（先事实核查后规则合规）。LR-0008 的教训再次验证：本批 26 处事实错误中过半是凭记忆写出的"想当然"细节（代际归属、字段归属、命令名），非核心机制错误。
