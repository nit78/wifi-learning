# WiFi / 802.11 Resources

> 高信任资源：官方标准、权威教材、厂商一手文档、知名社区。每条都标注「何时用」。
> 学员背景：蓝牙驱动/协议栈 + sub-GHz 协议栈，目标 WiFi 驱动/协议栈。不考证，纯学知识。
> ⚠️ **学员不读原书** —— 所有知识由 lessons/*.html 直接交付。本清单的资源分两类：「我的内部参考」（我读它组织课程）和「学员可选看」（学员感兴趣时可自主查阅，不作要求）。

## Knowledge（知识与教材）

### 内部参考（我用来组织课程，学员不读）
- **[Book: _CWNA: Certified Wireless Network Administrator Study Guide_ — Coleman & Westcott]**（本工作区根目录有 CWNA-108 版 PDF）
  Sybex/Wiley 出版，CWNP 官方授权教材。**用途：我的内部参考**，用来对标章节覆盖度和准确性，组织成 lessons/*.html 交付给学员。学员明确不读原书。108 版虽已停考，但 RF/MAC/PHY 核心内容与 109 高度一致。

### CWNP 官方考纲（用于对照章节覆盖度）
- [CWNA-109 Exam Objectives (2023 PDF) — CWNP](https://www.cwnp.com/uploads/cwna-109-objectives-2023.pdf)
  现行考纲，权威。用作「我应该学哪些主题」的对照清单（不考也用它校准覆盖度）。
- [CWNA-108 Objectives (2020 PDF) — CWNP](https://www.cwnp.com/uploads/cwna-108-2020-objectives.pdf)
  对应手上的书的版本，对照看 108→109 增删了什么。

### 一手标准（最权威，固件工程师必读）
- [IEEE 802.11 — Wikipedia](https://en.wikipedia.org/wiki/IEEE_802.11)
  标准族树（a/b/g/n/ac/ax/be）的快速导航，先看这个建全景。
- IEEE Std 802.11™-2020（及后续修订 802.11ax/be 等）
  正式标准文档。固件工程师最终要对着这个读。CWNP 官网有免费下载入口。

### PHY 层深入（固件核心）
- [Wi-Fi Overview — 802.11 Physical Layer & Transmitter Measurements (Tektronix Primer)](https://www.tek.com/en/documents/primer/wi-fi-overview-80211-physical-layer-and-transmitter-measurements)
  Tek 出的 802.11 PHY primer，覆盖 OFDM、frame 格式、发射机测量。**BT→WiFi 桥梁首选**：BT 工程师最需要的就是这块。

### BT ↔ WiFi 对比（学习桥梁）
- [Bluetooth and Wi-Fi Wireless Protocols: A Survey and a Comparison (IEEE WCm 2005, PDF)](http://fly.isti.cnr.it/pub/papers/pdf/WiFiBluetooth-IEEEWCm05.pdf)
  学术综述，PHY/MAC 层对比。**第一节课的桥梁资料**：帮助理解为什么 WiFi 架构如此不同。
- [Bluetooth-WLAN Coexistence — MathWorks](https://www.mathworks.com/help/bluetooth/ug/bluetooth_wlan_coexistence.html)
  2.4 GHz 共存机制，BT 背景直接对口，也是嵌入式 WiFi 经常要处理的实际问题。

### 通用 PHY/MAC 概念（大学讲义）
- [Bluetooth, ZigBee, WiFi, WiMAX, LTE — WMU CS6570 讲义 PDF](https://ala.cs.wmich.edu/spring15/cs6570/lectures/PHY-MAC-Bluetooth-ZigBee-rev2.pdf)
  TDMA/FDMA/CDMA vs CSMA/CA 的对照讲义，第一节课用。

## Wisdom（社区与一手实践）

### 固件 / 驱动社区
- [linux-wireless mailing list](https://www.wireless.kernel.org/en/developers/Documentation/mailinglists)
  Linux mac80211 / cfg80211 / 各厂商驱动的一手讨论。读这里能见识真实 WiFi 驱动问题。用于：理解 MAC 子层实现、定位关联/扫描/退避问题。
- [Linux Wireless wiki](https://wireless.wiki.kernel.org/)
  mac80211 / cfg80211 / nl80211 架构文档。固件工程师入门 Linux WiFi 栈的权威入口。
- [ESP32 WiFi 文档（Espressif）](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-reference/network/esp_wifi.html)
  平台 SDK 一手文档，可直接上手的 WiFi SoC 实现。学员若选 ESP32 平台，这是日常资料。

### 协议 / 行业
- [CWNP 社区 / 论坛](https://www.cwnp.com/)
  CWNA 出题方，行业知识聚合点。
- Reddit r/wifi / r/embedded（可选）
  行业动态与从业者讨论。信噪比一般，按需看。

> 学员暂未表达加入社区的偏好，固件相关社区先列出，是否深入使用由学员决定。

## Gaps（待补）
- 缺一本**纯固件视角**的 WiFi 书（CWNA 是管理员视角）。后续若找到好的固件/驱动实现类书或论文，补进来。
- 缺 802.11ac/ax/be（Wi-Fi 5/6/7）PHY 细节的专题资料 —— 进入 PHY 章节前补一手标准或厂商白皮书。
- 缺 BT host/controller 具体分层（学员背景尚需进一步确认）。
