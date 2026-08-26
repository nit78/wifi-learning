# 第 20 课 调试实战已讲授

三层可见性框架（配置态 iw / 空口态 monitor+tcpdump+Wireshark / 驱动态 debugfs+dmesg）、常用过滤器清单（type_subtype/eapol/retry/dbm_antsignal）、rc_stats 的存在性作为 SoftMAC/FullMAC 判据，以及三个故障案例走查（关联失败/吞吐低/信号差）。所有事实（iw 命令、debugfs 路径、monitor 流程）均经 kernel.org/wireless 文档核实（LR-0008）。

**Status**: active
**Implications**: 课程从"协议知识"进入"动手能力"；毕业实验（抓自己的关联+握手全流程）已布置，待学员反馈结果。
