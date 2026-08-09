# BSS Color + HE PHY 收尾 已讲授 —— PHY 深水区闭合

第 15 课（lessons/0015-bss-color-he-phy.html）讲 BSS Color/空间复用 + HE PHY 其他改进。<strong>路线图第 9 步（PHY 深水区）正式闭合。</strong>

## 为什么重要

- PHY 深水区（Wi-Fi 6 核心）全部讲完：第 13 MIMO + 第 14 MU-MIMO/OFDMA + 第 15 BSS Color/HE PHY + 3 个数学补充（sup-3/4/5）。
- 这是课程最难的部分，学员已具备 Wi-Fi 6 固件工程师的完整 PHY 知识地图。
- 闭合路线图最大缺口，进度 9/10。

## 核对来源

- BSS Color 6-bit 在 HE-SIG-A、1-63 编号、OBSS_PD 动态阈值（intra -82 / OBSS 可到 -62）：SageAxe、Springer Damysus、ScienceDirect、IEEE/ACM ToN、MDPI、ns-3 WNS3 一致
- 子载波间隔 312.5→78.125kHz（缩4倍）、符号时长 3.2→12.8μs（长4倍）、倒数绑定 Δf=1/T：NI、Extreme Networks、TechSpot、MDPI Survey 一致
- 20MHz 子载波 64→256、1024-QAM（10bit/符号 vs 8bit、+25%峰值）：NI、EEWorld、Clemson PDF 一致
- Wi-Fi 6 设计哲学从单链路峰值转向高密度效率（HE=High Efficiency）：TechSpot、MDPI Survey 一致

## Implications

- ✅ 路线图第 9 步完成，进度 9/10。只剩第 10 步（驱动实战）。
- index.html 路线图已更新：第 9 步标"✓ 闭合"，第 10 步变"下一站"，删除重复的旧 stage-10 块。
- FALLBACK_LESSONS 已补第 15 课。
- 下一课（第 16 课）默认进驱动实战（mac80211 代码导读）。
- 学员提过"PHY 看得迷迷糊糊"——可选分支：先做 PHY 全景串讲再进驱动实战。等学员决定。
