# Mission: 从 BT 固件工程师转型为 WiFi 固件工程师

## Why
学员是嵌入式蓝牙固件工程师，目标是在 WiFi SoC/驱动/固件层工作（ESP32、Realtek、MTK、高通等）。缺的不是嵌入式能力，而是 **RF + 802.11 协议域知识**。以 CWNA 这本书为系统骨架补齐这块知识，从而能看懂 WiFi 固件代码、调试 PHY/MAC 问题、移植协议栈与驱动。

成功之后，工作生活中会发生的具体变化：能读懂 802.11 标准、能定位 WiFi 固件层 RF/MAC 问题、能上手 WiFi SoC 厂商 SDK、能与协议/芯片团队对话。

## Success looks like
- 能解释 OFDM 子载波、CSMA/CA 退避、BSS/IBSS、PHY/MAC 分层等核心概念，并能映射到固件代码中的对应模块
- 能读懂 802.11 标准（至少 management/data/control frame 与 PHY preamble）的关键段落
- 能在 ESP32 / Linux mac80211 等平台上定位一个真实 WiFi 问题（关联、吞吐、RF）
- 能说清「同一个 2.4 GHz 频段，BT 与 WiFi 为什么架构如此不同」

## Constraints
- 不考证，纯学知识（CWNA-108 已停考，现行 CWNA-109；手上的书是 108 版，仍可用作骨架）
- 课程语言：中英混合（中文讲解，专业术语保留英文原文）
- 节奏：每天投入较多时间（约 1 小时/日），稳定的每日课程节奏
- 背景：嵌入式 BT 固件经验（BLE + Classic）—— 可作为学习桥梁复用

## Out of scope（现阶段不追）
- 企业级 WLAN 部署、站点勘测、AP/AC 运维细节（CWNA 部分章节仅作背景快速过）
- CWNA 认证考试本身（考纲差异、报名、刷题）
- 上层应用层协议（HTTP/CoAP/MQTT over WiFi）—— 不在本工作区
- 蜂窝（LTE/5G）、LoRa、ZigBee 等其它无线技术
