# QoS / EDCA 细节 已讲授

第 11 课（lessons/0011-qos-edca.html）讲 802.11e EDCA 的完整机制。兑现第 5 课伏笔。

## 为什么重要

- 是驱动 tx 队列按 TID 分流的理论基础——固件工程师日常代码路径。
- BT ACL 链路类型分流经验的直接迁移落点。
- 解释了"概率优先"而非"绝对优先"的设计哲学（仍可能碰撞，只是概率小）。

## 核对来源

- EDCA 4 个 AC 的默认 CWmin/CWmax/AIFSN/TXOP 值（802.11a/g）：mrncciew CWAP、UniRoma2 WMM PDF、Linköping thesis、ns-3 docs、scholarly.org 多源一致
- TXOP 单位 32μs 整数倍（AC_VO=47=1.504ms, AC_VI=94=3.008ms）：mrncciew 确认
- AIFS[AC] = SIFS + AIFSN[AC] × SlotTime 公式：标准 + 多源一致
- TID 0-7 到 4 AC 的映射：IEEE 802.11 HCF 映射表
- HCF = EDCA + HCCA，HCCA 极少用：标准 + 多源一致

## Implications

- 第 5 课伏笔（QoS/EDCA 细节）兑现
- 剩余 MAC 分支：聚合/Block ACK（第 12 课）、漫游
- 剩余 PHY 大洞：MIMO/OFDMA/BSS Color（Wi-Fi 6 核心）
- 新术语已加 GLOSSARY：AC、AIFSN/AIFS、TXOP、TID、HCF、WMM、内部碰撞
