# 第 19 课 mac80211 代码导读已讲授

学员使命的核心落点课：注册三步曲（ieee80211_alloc_hw→填能力→register_hw）、ieee80211_ops 回调分组表（每个回调对应前面课次的协议机制）、RX/TX 两条数据路径（ieee80211_rx_status 元数据 / ieee80211_tx_status 闭环）、mt7915 真实文件布局，以及"蓝牙对照桥"（hci_recv_frame↔ieee80211_rx 等映射表）——学员的蓝牙驱动肌肉记忆可直接平移。

**Status**: active
**Implications**: 学员具备了打开任意 Wi-Fi 驱动建立代码地图的能力；后续可承接 mt76 逐文件带读、Wi-Fi 7/MLO 等进阶请求。
