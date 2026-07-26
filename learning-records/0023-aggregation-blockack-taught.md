# 帧聚合 / Block ACK 已讲授

第 12 课（lessons/0012-aggregation-block-ack.html）讲 802.11n 引入的两套提速机制。进入路线图第 8 步（提速主线）。

## 为什么重要

- 吞吐优化主战场——固件工程师调性能最常碰的代码。
- A-MPDU + Block ACK 是 Wi-Fi 从百兆推进千兆的关键。
- 和第 11 课 EDCA 的 TXOP 形成"三件套"协同（TXOP 给窗口 → 聚合塞满 → Block ACK 一次确认）。
- 兑现第 6 课伏笔（QoS Data 帧的 QoS Control 字段在这里落地为 TID 分会话）。

## 核对来源

- A-MSDU vs A-MPDU 的聚合层次、最大尺寸（3839/7935 vs 65535/超1MB）：IEEE 802.11n Skordoulis 论文、grokipedia、dot11ap、Ginzburg 一致
- MPDU Delimiter 4 字节、选择重传能力：dot11ap、mrn-cciew 一致
- Block ACK 会话三阶段（ADDBA/传输/DELBA）+ Immediate vs Delayed：mrn-cciew CWAP、Wikipedia、telecomhall 一致
- 位图限制 A-MPDU ≤64 个 MPDU：grokipedia、mrn-cciew 一致
- 802.11ac 起 A-MSDU 在 VHT PHY 弃用：Skordoulis、Ginzburg 一致

## Implications

- 路线图第 8 步（提速）完成，进度 8/10。
- 第 6 课伏笔（聚合/Block ACK）兑现。
- 下一站进 PHY 深水区（最大缺口）：第 13 课 MIMO 基础。
- 新术语已加 GLOSSARY：MSDU、MPDU、A-MSDU、A-MPDU、MPDU Delimiter、两级聚合、Block ACK、BA Session、Immediate/Delayed BA、BAR。
- index.html 路线图已更新（阶段 8 变完成、阶段 9 变下一站）。
