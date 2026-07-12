# Linux Wi-Fi 软件栈分层 + 三类帧处理位置已讲授（课外补充）

**性质**：课外补充（supplement），非主线。学员在第 7 课后临时提问"Linux 上数据/管理/控制帧各在哪处理"，为不打断协议主线，用独立编号空间 `sup-NNNN-` 出成补充课。

文件：lessons/sup-0001-linux-wifi-stack-frame-processing.html。回答了学员的直接提问："Linux 上数据帧、管理帧、控制帧各在哪处理"，从固件→内核→用户态四层贯穿讲清。

## 学到的核心架构（已核对一手来源）

1. **四层软件栈**：固件（模组内）→ 设备驱动（drivers/net/wireless/）→ mac80211 + cfg80211（net/mac80211/ + net/wireless/）→ 用户态（wpa_supplicant / hostapd）。
2. **SoftMAC vs FullMAC 分水岭 = MLME 跑在哪**：SoftMAC（ath9k/10k/11k、iwlwifi、brcmsmac、rt2800）MLME 在内核 mac80211；FullMAC（brcmfmac、mwifiex、ath6kl、qtnfmac）MLME 在固件，绕开 mac80211 直接向 cfg80211 注册 cfg80211_ops。
3. **三类帧的处理分工**：
   - 数据帧：贯通四层。TX 路径 ieee80211_tx 做 802.3→802.11 封装 + 选 MCS + 加密；RX 路径走 ieee80211_rx_handlers 处理链（rx.c），最后 netif_receive_skb 上送网络栈。**不经 wpa_supplicant**。
   - 管理帧：SoftMAC 下 STA 模式 MLME 在内核 mac80211（mlme.c）；AP 模式在用户态 hostapd（mac80211 官方文档原文）；FullMAC 下在固件。wpa_supplicant 只管 4-Way Handshake/密钥/漫游。
   - 控制帧（ACK/CTS/BlockAck）：**几乎全在固件/硬件**（SIFS 时序逼出来的），内核只读 TX 状态的 ACK 位 + 维护 BlockAck 会话簿记。rx.c 注释印证"Data and control frames are already handled"。

## 关键纠错（一手来源修正了常见误解）

- ⚠️ **ath10k / ath11k / iwlwifi 是 SoftMAC 不是 FullMAC**：尽管固件很"重"（扫描/加密/聚合 offload），但 MLME 仍走 mac80211。判断依据是"MLME 跑在哪 + 驱动注册走不走 ieee80211_register_hw"，不是"固件干了多少活"。ath11k 官方文档原文写"ath11k uses mac80211"。
- ⚠️ **mac80211 RX 处理链函数名跨版本会演进**：ieee80211_rx_h_passive_fill 在新内核已合并/移除。看具体版本要打开 rx.c 搜 CALL_RXH。但"驱动→mac80211→netif"的架构跨版本稳定。

## 为什么对后续教学重要

1. **这是学员 BT 驱动栈经验镜像迁移的主落点**：nl80211≈HCI、mac80211≈Host Controller Driver、wpa_supplicant≈BT 上层协议栈（SM 做密钥）、芯片固件≈Controller 固件。分层思想完全同构。
2. **"控制帧在固件、管理帧看 SoftMAC/FullMAC、数据帧贯通"这张表是后续所有驱动课的地图**。学员以后看任何驱动（ESP32/Realtek/MTK/高通）都能立刻定位 bug 在哪一段。
3. **解锁代码阅读课**：可让学员打开 net/mac80211/rx.c 走 ieee80211_rx_handlers 真实处理链，把本课"处理链"概念落地成代码 —— 最能发挥协议栈经验。
4. **解锁 FullMAC 移植课**：若学员目标平台是 SDIO/USB Wi-Fi 模块，brcmfmac/mwifiex 类 FullMAC 驱动移植直接对口。

## 核对来源

- mac80211/cfg80211/nl80211 定义：wireless.docs.kernel.org 官方文档（已从旧 wireless.wiki.kernel.org 迁移）
- mac80211 基础：docs.kernel.org/driver-api/80211/mac80211.html（kernel-doc）
- SoftMAC/FullMAC + ath11k "uses mac80211"：wireless.docs.kernel.org ath11k 用户页
- RX 处理链：net/mac80211/rx.c（GitLab stable v6.6.18 + codebrowser.dev + chromiumos-3.8 fork 注释）
- cfg80211_ops 定义：include/net/cfg80211.h + apriorit 教程 + brcmfmac 实例
- 上游驱动计数（~35 SoftMAC / ~9 FullMAC）：Bootlin ELCE 2025 演讲

## Implications

- ✅ **主线编号不变**：本内容是补充（`sup-0001-`），主线第 8 课编号仍空给协议内容（省电模式 Power Save，第 7 课的 AID/TIM/PS-Poll 伏笔）。
- ✅ **编号规范确立**：主线课用 `000N-`，课外补充用 `sup-NNNN-`，互不占位。
- ✅ **解锁**（补充线，可选）：mac80211 RX 处理链代码精读（rx.c 逐个 ieee80211_rx_h_*）
- ✅ **解锁**（补充线，可选）：FullMAC 驱动移植课（若学员选 SDIO/USB 平台）
- ✅ **解锁**（补充线，可选）：4-Way Handshake / WPA 安全课（兑现第 7 课伏笔④，本补充已把"mac80211 管 State 1-3、wpa_supplicant 管密钥"的边界立稳）
- ✅ **GLOSSARY.md 新增 9 个驱动栈术语**：MLME、SoftMAC、FullMAC、mac80211、cfg80211、nl80211、wpa_supplicant、hostapd、iw/libnl/iwd
