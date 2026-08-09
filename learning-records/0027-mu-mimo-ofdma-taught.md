# MU-MIMO + OFDMA 已讲授

第 14 课（lessons/0014-mu-mimo-ofdma.html）讲 Wi-Fi 6 多用户的两大支柱。PHY 深水区推进。

## 为什么重要

- Wi-Fi 6 真正的核心特性，高密度场景（多设备/IoT）的关键。
- 路线图最大缺口（PHY 深水区）的收尾阶段。
- 首次执行 LR-0026：页面底部带「内容来源」区块（10 条来源链接）。
- 衔接 sup-0003（多模式解耦）和 sup-0005（多 STA sounding）。

## 核对来源

- RU 尺寸 26/52/106/242/484/996/2×996 tone、20MHz 9 个 26-tone RU：Cisco Blog、Wikipedia Resource Unit、CTS 160 一致
- OFDMA 切频率适合小包，MU-MIMO 切空间适合大包：Spiceworks、NetworkWorld、TechTarget、Ruijie 一致
- 802.11ac Wave 2 DL MU-MIMO ≤4 用户，802.11ax DL+UL ≤8 用户：MathWorks、NI 一致
- Trigger Frame 字段（RU 分配/目标 RSSI/MCS/流数/时长）、HE TB PPDU、UL MU 流程：Semfio、CTS、WiFi Professionals、Gjermund Raaen 一致
- HE-SIG-B 承载 per-STA RU 分配：Cisco Blog、MathWorks 一致
- OFDMA + MU-MIMO 可组合（一个 RU 内多用户）：MathWorks 模拟、NI 一致

## Implications

- ✅ LR-0026 首次执行：第 14 课页面底部有「内容来源」区块（10 条链接）。
- 路线图第 9 步进度更新（MIMO+MU-MIMO+OFDMA 已讲，剩 BSS Color）。
- index.html 路线图 + FALLBACK_LESSONS 已更新。
- 下一课（第 15 课）：BSS Color + HE PHY 收尾，闭合 PHY 深水区。
- 新术语已加 GLOSSARY：MU-MIMO、OFDMA、RU、DL/UL MU、Trigger Frame、HE TB PPDU、HE-SIG-B、BSS Color。
