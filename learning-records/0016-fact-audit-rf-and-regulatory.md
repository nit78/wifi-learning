# 事实核查：RF/SNR 漏 Noise Figure，法规功率标签错，SIFS 拆解数字非标准

**Status**: active

## 学到的

一次面向网络权威资料（IEEE 802.11 标准、CWNA、CWNP、FCC/ETSI 法规、NI/Qualcomm 一手文档）的系统核查后，发现当前课程总体准确（BEB 公式、DCF 时序、802.11a 子载波、状态机、帧结构、Beacon 间隔 102.4 ms、piconet 1+7 均通过核对）。但有**两处实质错误**和若干**精度问题**，由于 LR-0006 规定「课程是唯一输入」，错误会被当事实记忆，必须修。

## 实质错误 1：链路预算 / SNR 完全漏掉 Noise Figure（NF）

第 4 课 + `rf-math-cheatsheet.html` 用 **热噪声底 −101 dBm** 直接算 `SNR = RSSI − (−101)`。但所有权威 RF 来源（CWNA 例外——见下）用 **接收机噪声底 = kTB + NF**。Wi-Fi 典型 NF = 5–10 dB（IEEE 标准推导假设 10 dB；CEPT ECC Report 288 用 10 dB；手机 STA 约 7–10 dB）。漏掉 NF → **SNR 被夸大 5–10 dB**，并造成内部矛盾：

- 课程写「MCS0 需 ~0 dB SNR」，灵敏度 −93 dBm。−93 − (−101) = **+8 dB**，不是 0。这 8 dB 正是 NF(~5–6) + 解调 SNR(~2–4)。
- 真实 MCS0 要求：**解调 SNR ~2 dB**（在接收机噪声底 kTB+NF 之上）。[RF Essentials](https://rfessentials.com/rf-knowledge-base/what-is-the-sensitivity-requirement-for-a-wi-fi-7-receiver-at-the-maximum-data-r/) 明确给出 ~2 dB；[Princeton COS598A](https://www.cs.princeton.edu/courses/archive/spring17/cos598A/lectures/L3.pdf) 给无编码 BPSK @ BER 10⁻⁵ 约 9.6 dB，802.11 rate-½ 卷积码给 ~5–7 dB 编码增益 → 落到 ~2–4 dB。
- IEEE 802.11n/ac MCS0 @ 20 MHz 最低灵敏度标准是 **−82 dBm**（[NI WLAN testing](http://download.ni.com/evaluation/rf/Introduction_to_WLAN_Testing.pdf)），不是 −93。−93 更接近 802.11ax HE20 MCS0。课程没标 PHY 代际。

**CWNA 反例（重要）**：直接抽取 CWNA-108 第 6 版全文，「noise figure」**零命中**。CWNA 第 4 章用经验法：噪声底是**测量值**（非 kTB 计算），SNR = 信号 − 实测噪声底，灵敏度是厂商每速率门限表。也就是说 CWNA 的「实测噪声底」其实已经隐含了 NF。当前课程是**两头不靠的混合体**——借了 kTB 物理公式（CWNA 不用），又丢了 RF 工程必须的 NF 项。

**可信修法（二选一）**：
- (a) CWNA 路线：实测噪声底 + 厂商灵敏度表（NF 隐含）。
- (b) RF 工程路线：`Sensitivity = −174 + 10log(B) + NF + SNR_req`，NF ≈ 7–10 dB，MCS0 SNR_req ≈ 2 dB。

## 精度问题 2：SIFS 四分量拆解数字「0.5/12.5/0.5/2 μs」非标准值

公式形式正确（`aSIFSTime = aRxRFDelay + aRxPLCPDelay + aMACProcessingDelay + aRxTxTurnaroundTime`，与 [CWNP 802.11 Arbitration 白皮书](https://www.cwnp.com/uploads/802-11_arbitration.pdf)、IEEE TGj 记录逐字一致），核心论点「接收机处理（非收发切换）占大头」也正确。但：

- 具体数字 **0.5/12.5/0.5/2 不是标准值**，来自 [专利 WO2015186941A1](https://patentimages.storage.googleapis.com/04/3e/0a/34a7fb5624f67a/WO2015186941A1.pdf) 的示例。IEEE Table 93 只钉死总和 16 μs + 两个上界（`aRxTxTurnaroundTime < 2 μs`、`aMACProcessingDelay < 2 μs`）；`aRxRFDelay`/`aRxPLCPDelay` 标「Implementation dependent」。
- 更权威的拆解见 [IEEE 802.11-99/062](https://www.ieee802.org/11/Documents/DocumentArchives/1999_docs/906272W-LB17-Comment-802.pdf)（Morikura/NTT）：接收机处理 ~14 μs = AFC 4 + 串并转换 4 + FFT 4 + 解码 2。[NI 参考实现](https://www.ni.com/en/support/documentation/supplemental/16/labview-communications-802-11-application-framework-2-0-and-2-0-.html) D1 ≈ 12 μs。所以「78%」量级站得住，但「12.5 μs PLCP」把 FFT/S/P 都算进 PLCP，不够精确——FFT 是数字前端，非严格 PLCP。
- **修法**：把「0.5/12.5/0.5/2」标为「典型/示意值」，并引用 IEEE 99/062（接收机处理 ~12–14 μs），或注明专利来源。

## 精度问题 3：法规功率标签贴错（rf-math-cheatsheet §③）

两条标签都不对应任何法规：

- **「+23 dBm = 200 mW = 2.4 GHz 法规上限附近」——错。** [FCC §15.247](https://www.ecfr.gov/current/title-47/chapter-I/subchapter-A/part-15/subpart-C/subject-group-ECFR2f2e5828339709e/section-15.247)：传导 30 dBm、EIRP 36 dBm。[ETSI EN 300 328](https://www.etsi.org/deliver/etsi_en/300300_300399/300328/02.00.20_20/en_300328v020020a.pdf)：EIRP 20 dBm（100 mW）。所以 23 dBm 离 FCC 远着、还**超过** ETSI 3 dB（在欧洲不合规）。23 dBm/200 mW 实际是 **ETSI 5 GHz 室内**限值（[EN 301 893](https://www.etsi.org/deliver/etsi_en/301800_301899/301893/02.02.01_60/en_301893v020201p.pdf)）——被错贴到 2.4 GHz。
- **「+30 dBm = 1 W = 5 GHz 室外 AP 上限」——仅对 FCC，且误导。** 30 dBm 是 [FCC U-NII-3](https://www.ecfr.gov/current/title-47/chapter-I/subchapter-A/part-15/subpart-E) 室外传导限（但室外更该看 EIRP 36 dBm）。ETSI 5 GHz 室外不允许 >23 dBm。而且 30 dBm 恰好等于 FCC 2.4 GHz 传导限——课程等于把「FCC 2.4 GHz 传导数」贴给了「5 GHz 室外」。

**修法**：2.4 GHz 限值写 FCC 30 dBm 传导/36 dBm EIRP、ETSI 20 dBm EIRP；5 GHz 室外写 FCC U-NII-3 30 dBm 传导/36 dBm EIRP、ETSI 23 dBm（且室内为主）。

## 精度问题 4：cheatsheet §⑦ 算例 A 与课程正文差 1 dB

`rf-math-cheatsheet.html` §⑦A 写 RSSI −48 dBm → SNR +53 dB；但第 4 课和第 3 课正文同一场景算的是 −49 dBm → +52 dB。同一工作区内 1 dB 漂移，应统一。

## 精度问题 5：第 4 课 quiz 标题「Wi-Fi 比 LoRa 差 30 dB 因带宽」与自身纠错框矛盾

quiz 题干归因「带宽」，但下方解释（22 dB 带宽 + 8 dB 调制）正确，且本课的「纠错记录」框（LR-0008）已写明 LoRa 灵敏度高的核心是 SF 处理增益。标题与正文/纠错框打架。应把标题改为「带宽 + 调制/SF 处理增益」。

## 已核对为正确的项（供后续课程放心复用）

- BEB：`CW = 2ⁿ·(CWmin+1) − 1`，序列 15→31→63→127→255→511→1023；OFDM PHY CWmin=15/CWmax=1023（802.11b DSSS 是 CWmin=31，课程没误用）。DCF 递推 `CW_new = 2·(CW_old+1) − 1`。
- 时序：802.11a SIFS 16/Slot 9/DIFS 34；802.11b SIFS 10/Slot 20/DIFS 50（μs），全部正确。注意（非课程错误，仅备忘）：802.11g 默认兼容模式复用 802.11b 时序（slot 20 μs），只在 ERP-OFDM-only 才用 9 μs。
- 802.11a 子载波：64-FFT、52 有效（48 数据 + 4 导频）、12 空（保护带 + DC）——全对。
- OFDM 正交（Δf=1/T、sinc 零点、两种正交之分）——对。
- State 1/2/3 + Class 1/2/3、Open System 两帧 Auth、AID 1–2007、ToDS/FromDS 四地址——对。
- Beacon 102.4 ms（100 TU × 1.024 ms/TU）——对。
- Piconet 1 master + ≤7 active slave（AM_ADDR 3 bit；另有 255 parked 用 PM_ADDR）——对。

## Implications

- ✅ **解锁**：本记录可作「修复清单」直接改课。优先级：NF（错误 1）> 法规标签（错误 3）> SIFS 拆解（问题 2）> 其余。
- ⚠️ **警示**：教学方对 RF 硬件层（NF、灵敏度推导）和法规（FCC/ETSI 具体数值）的记忆不可靠——与 LR-0008（LoRa SF）、LR-0005（RF 高估）同类警示。涉及具体数值必须查一手标准/法规。
- ⚠️ **方法论**：CWNA 的 RF 数学是「经验近似」（Rule of 10s and 3s、实测噪声底），不是 kTB 物理推导。课程既不考证、又要自洽，RF 数学这块建议明确「走 CWNA 经验路线」或「走 RF 工程严格路线」二选一，别再混合。
- 📌 **建议**：修复后把本记录标 superseded，或加「已修复」子节。
