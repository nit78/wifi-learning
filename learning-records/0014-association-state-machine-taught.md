# 关联流程与 802.11 三态状态机已讲授

第 7 课（lessons/0007-sta-association-flow.html）正式讲了 STA 关联流程：State 1/2/3 三态状态机 + 扫描（Beacon/Probe）→ 802.11 Authentication（两帧，Open System，几乎不验证身份）→ Association（带 AID 1–2007）→ 4-Way Handshake（WPA 才有）→ 数据传输，加上 Deauth/Disassociate 的区别和 Reassociation 漫游。

## 为什么重要

- 这是学员 BT 协议栈经验迁移到 Wi-Fi 的<strong>最直接落点</strong>：状态机 + 管理帧驱动迁移的设计思路完全通用。已用 BLE Link Layer 状态机做桥梁。
- 把"两个伪命题"显式澄清：①802.11 Authentication ≠ 安全认证（名字陷阱，WEP 时代历史包袱）；②Association 成功 ≠ 能传数据（WPA 下还要 4-Way Handshake）。这两点是新人最常误解的。
-埋下三个伏笔给后续课程：AID / TIM / PS-Poll（第 8 课省电模式要用）、4-Way Handshake（可单独开安全课）、Reassociation + 802.11r（漫游课）。

## 核对来源

- AID 范围 1–2007：IEEE Std 802.11-1999/2007 原文（HPE Community / iith.ac.in PDF）确认
- Open System Authentication 是两帧握手（Auth Seq 1/2，algorithm=0）：mrn-cciew、Intel、NetBeez 多源一致
- State 1/2/3 三态 + Class 1/2/3 帧分类：802.11 标准 + Clear To Send / How I WiFi 一致

## Implications

- 下一课默认进 Power Save（兑现 AID/TIM/PS-Poll 伏笔，IoT 续航主题，和 sub-GHz 低功耗背景对话）
- 学员若选 4-Way Handshake 或漫游，分支到安全课或 802.11r 课
- mac80211 状态机代码映射（ieee80211_if_managed 子状态）已点名，学员若要深入可作为代码阅读课切入点
