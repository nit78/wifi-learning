# MIMO 基础 已讲授

第 13 课（lessons/0013-mimo-basics.html）讲 MIMO 基础。进入路线图第 9 步（PHY 深水区），这是课程最难也是最大缺口。

## 为什么重要

- MIMO 是 Wi-Fi 4/5/6/7 的 PHY 基石，没有它就没千兆 Wi-Fi。
- 学员 BT/sub-GHz 背景无 MIMO 经验（BLE 天线分集是切换式接收分集，非真 MIMO），这是全新概念。
- 是 Wi-Fi 5→6 分水岭的开篇，下节课（MU-MIMO+OFDMA）依赖这课的地基。

## 核对来源

- 空间流数 ≤ min(发天线, 收天线)：SuperUser、sourceonetechnology、Reddit r/wireless 多源一致
- SU-MIMO 802.11n ≤4 流：ezurio、sourceonetechnology 一致
- STBC 发射分集、不需 CSI、吞吐减半、Alamouti：Wikipedia、wifisharks、wirelesspi 一致
- MRC 接收分集、不需反馈、不减吞吐：wifisharks、dsplog 一致
- 波束成形需 CSI、sounding/NDP 流程：sharetechnote、sageaxe、CMU survival guide 一致
- 802.11ac 弃隐式只用显式：gigabit-wireless、Huawei、Auburn 论文一致
- 信道互易性 + 校准：arXiv、patent 一致

## Implications

- 路线图第 9 步开始（PHY 深水区），进度 8/10（第 9 步部分完成）。
- index.html 路线图已更新：第 9 步变部分，新增 9b「MU-MIMO+OFDMA」下一站。
- 下一课（第 14 课）：MU-MIMO + OFDMA（Wi-Fi 6 PHY 真正核心）。
- 新术语已加 GLOSSARY：MIMO、空间流、SU-MIMO、分集、STBC、MRC、波束成形/TxBF、CSI、sounding、显式vs隐式反馈、信道互易性、CSD。
