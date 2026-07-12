# WPA 安全 / 4-Way Handshake 已讲授

第 9 课（lessons/0009-wpa-security-4way-handshake.html）讲了 Wi-Fi 安全完整体系，兑现第 7 课的伏笔④。

## 为什么重要

- 兑现承诺 3 次的"4-Way Handshake"伏笔，把第 7 课连接序列图的第 4 步闭环。
- 完整密钥层级：密码 → PMK（根）→ PTK（KCK/KEK/TK）+ GTK，是固件工程师做密钥管理最常面对的代码路径。
- 讲清了 4 个常见误区：①PMK 不在空中传（防抓包）；②PTK 每次新鲜（弱前向保密）；③M2 的 MIC 是身份证明不是加密；④组播必须共用 GTK。
- WPA2→WPA3 演进：PSK 可离线爆破（最大软肋）→ SAE 抗爆破 + 强制 PMF。

## 核对来源

- 4-Way Handshake M1-M4 各帧内容（ANonce/SNonce/MIC/GTK）：NetworkLessons、mrn-cciew、WiFi Professionals 多源一致
- PTK 派生公式 PRF-512(PMK, "Pairwise key expansion", Min/Max MAC + Min/Max Nonce)：Stanford Security Lab 论文确认
- PTK 拆 KCK/KEK/TK 三段：NetworkLessons（WPA Key Hierarchy）、Wikipedia 802.11i 一致
- SAE 基于 Dragonfly (PAKE)、抗离线爆破、有前向保密：HU Berlin、Dragonblood 论文一致
- PMF (802.11w) WPA2 可选 WPA3 强制：HPE Aruba、Extreme Networks 一致
- CCMP = AES CTR + CBC-MAC (AEAD)，TKIP/WEP 已废弃：标准+多源一致

## Implications

- 第 7 课所有伏笔（AID/TIM/PS-Poll、4-Way Handshake）全部兑现完毕
- 协议主线（含安全）已覆盖：RF→OFDM→CSMA/CA→帧结构→状态机→省电→安全
- 剩余分支：QoS/EDCA、聚合/Block ACK、MIMO/OFDMA、漫游/802.11r、天线、信道规划、mac80211 代码导读
- 学员若要深入 SAE/Dragonfly 数学或 CCMP 内部，可分支到密码学专题课
