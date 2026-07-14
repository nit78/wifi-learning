# WPA2/WPA3 具体实现 + 四帧握手逐帧拆解 已讲授

第 10 课（lessons/0010-wpa2-wpa3-implementation-4way-details.html）是第 9 课的实现层深入。学员明确要求："补充一章，WPA2 和 WPA3 的具体实现，并且在四帧握手流程里的步骤"。

## 为什么重要

- 学员主动要求深入安全实现细节——这是第一个由学员明确提出的深入需求，说明第 9 课打动了痛点。
- 补全第 9 课留的实现层空白：PMK 派生的具体算法（PBKDF2 参数、SAE Dragonfly 步骤）+ EAPOL-Key 帧字段级解读。
- 核心认知：WPA2/WPA3 的差异全在"PMK 怎么来"（PBKDF2 vs SAE），4-Way Handshake 是共同汇合点。

## 核对来源

- PBKDF2 参数（HMAC-SHA1, SSID 盐, 4096 轮, 32 字节）：jorisvr.nl、arXiv、UC Berkeley CS161、IEEE 802.11i Clause H.4 多源一致
- SAE/Dragonfly 四步（PWE 派生 → Commit → Confirm → 设 PMK）：Praneeth WiFi、HU Berlin SARWiki 一致
- H2E vs HNP（PWE 派生两代，HNP 有侧信道）：WizardFi、Cisco、Infineon 一致
- EAPOL-Key 字段（Key Information bit、Replay Counter、RSN-IE 在 M2/M3、GTK 在 M3）：Stanford 论文、mrn-cciew、ipxe dox、NIST 一致
- KRACK 攻击重放 M3 强制 nonce 重用：Vanhoef 2017

## Implications

- 安全分支（第 9 + 10 课）完整。学员若要继续深挖，可分支：SAE Dragonfly 数学、GCMP vs CCMP、802.1X/EAP-TLS、KRACK 攻击专题。
- 下一课默认回 MAC 主线：第 11 课 QoS/EDCA。
- 剩余分支：QoS、聚合/Block ACK、MIMO/OFDMA、漫游、天线、mac80211 代码导读。
- 新术语已加 GLOSSARY：PBKDF2、PWE、Commit/Confirm、Key Information、Replay Counter、KDE、H2E vs HNP。
