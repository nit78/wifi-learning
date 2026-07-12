# 省电机制（PS-Poll / TIM / DTIM / U-APSD / TWT）已讲授

第 8 课（lessons/0008-power-save-mode.html）讲了 Wi-Fi 省电的完整演进。核心骨架是"声明睡眠 → 睡眠（AP 缓存）→ 醒来取件"三步循环，三代机制都是第 3 步触发方式和睡眠粒度的演进。

## 为什么重要

- 兑现第 7 课埋的三个伏笔：AID（PS-Poll/TIM 索引）、TIM（Beacon 位图）、PS-Poll（取件帧）。
- 这是学员 sub-GHz 低功耗协议栈经验<strong>最直接的对话点</strong>：BLE connection event / LoRaWAN Class A / 自研 sub-GHz 的"睡-醒-收-睡"状态机在 Wi-Fi 里换了一套字段名。用了强桥梁框。
- IoT 场景（智能门锁、传感器）是学员目标岗位的高频需求，TWT 是 Wi-Fi 6 续航逼近 BLE/LoRaWAN 的关键。

## 核对来源

- TIM/DTIM/Listen Interval/PS-Poll 机制：How I WiFi、mrn-cciew、Linux Wireless Docs、wifisharks 多源一致
- DTIM 立即发广播/组播：mrncciew / dot11zen / 7signal 一致
- TWT 源自 802.11ah、脱离 Beacon 周期、可睡秒级以上：Silicon Labs / Renesas / balramdot11b / arXiv 多源一致
- U-APSD 用触发帧让 AP 推送、对 VoIP 显著：dot11zen / TelecomHall 一致

## Implications

- 协议主线（RF→OFDM→CSMA/CA→帧结构→状态机→省电）已全部走完，进入"按优先级选分支"阶段
- 下一课默认 WPA 安全（兑现第 7 课伏笔④：4-Way Handshake / EAPOL-Key / PTK-GTK）
- 已埋伏笔待兑现：QoS/EDCA（第 5 课）、漫游/802.11r（第 7 课）、A-MPDU/Block ACK（第 6 课）
- 学员若要 TWT 深入，可分支到 Wi-Fi 6 IoT 代码/抓包课
