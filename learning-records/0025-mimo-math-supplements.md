# MIMO 数学/协议三连补充课（sup-0003/0004/0005）

学员第 13 课后要求："把你觉得要深入讲的部分在课外课上实现。"

## 决策：哪三个值得做

按学员岗位（驱动/协议栈，非 PHY DSP）判断：
- sup-0003 MIMO 矩阵解耦（SVD）—— ✅ 做。MIMO 最大的"魔法"，搞不懂这个 MIMO 永远是黑盒。
- sup-0004 Alamouti STBC 数学 —— ✅ 做。短、自洽、漂亮，"正交"二字落到实处。
- sup-0005 Sounding/NDP 帧格式 —— ✅ 做。三个里和学员工作最相关（帧/字段/状态机）。

没做的：rate adaptation 内部算法（minstrel_ht 细节）、注水定理、Givens 旋转压缩数学——太深或离协议栈太远。

## 核对来源

- SVD y=Hx+n、H=UΣVᴴ、V/U 预编码/后编码：WirelessPi、DSP StackExchange、Xidian 讲义、arXiv 多源一致
- Alamouti 编码矩阵 [s₁ -s₂*; s₂ s₁*]、合并 s̃₁=h₁*y₁+h₂*y₂*、X·Xᴴ=(|s₁|²+|s₂|²)I：dspLog、Xidian 讲义、spacetimecodes 一致
- 2发1收 Alamouti ≈ 1发2收 MRC（分集阶数同，3dB SNR 差）：dspLog 一致
- NDPA 字段（AID12/Feedback Type/Nc Index）、SIFS 时序、BRP 多 STA 轮询：IEEE 11-11-0346、Cisco community、EURECOM、Shankar WiFi 一致
- VHT Compressed BF 反馈 V 矩阵（非原始 H）：CMU survival guide、Auburn 论文一致

## 自我更正（重要）

sup-0004 里显式更正第 13 课的一处错误：第 13 课说"STBC 吞吐约减半"——这是针对一般冗余 STBC 的笼统说法，对 Alamouti（全速率）不成立。Alamouti 是全速率的（2 时隙发 2 符号 = 每时隙 1 符号）。已在 sup-0004 开头加"⚠️ 先纠正一个第 13 课的简化"框。

教训（延续 LR-0008）：写"笼统说法"时要标注适用范围，不能一句"STBC 减半"覆盖所有 STBC。

## Implications

- MIMO 三个深入点全部交付，构成数学+协议闭环：sup-0003（为什么解耦）+ sup-0004（为什么盲发分集）+ sup-0005（V 矩阵怎么协议传）。
- 第 13 课一处错误（STBC 减半）已更正。
- 下一主线课：第 14 课 MU-MIMO + OFDMA（会用 sup-0003 的多模式解耦 + sup-0005 的多 STA sounding）。
- NOTES.md 课外补充清单已更新（新增 sup-0003/0004/0005 条目）。
- index.html FALLBACK_LESSONS 已更新。
