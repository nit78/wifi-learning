# WiFi / 802.11 Glossary（Wi-Fi 术语表）

Wi-Fi（IEEE 802.11）无线局域网技术领域的中英对照术语表。**每堂课会增量扩充**；定义尽量用本表已有术语互相解释。术语首次出现时学员才理解它，所以只记已学过的。

> 标注规则：`[已学]` 表示课程中已讲授；`[待学]` 表示已列入但尚未讲。学员理解后再加。

---

## 物理层 / 射频（PHY / RF）

**RF (Radio Frequency, 射频)**：
通过电磁波在空间中传播信息的电磁信号，频率通常在 3 kHz – 300 GHz。Wi-Fi 工作在 2.4 GHz / 5 GHz / 6 GHz 等频段。
_避免_：无线电（口语化，含糊）。

**Frequency (f, 频率)**：
[已学] 单位时间内电磁波振荡的次数，单位 Hz。Wi-Fi 频段：2.4 GHz、5 GHz、6 GHz。频率越高 → 波长越短 → 路径损耗越大、穿透越差。

**Wavelength (λ, 波长)**：
[已学] 电磁波一个完整振荡周期的空间长度，单位 m。**λ = c / f**（c 为光速 ≈ 3×10⁸ m/s）。Wi-Fi 在 2.4 GHz 波长约 12.5 cm，5 GHz 约 6 cm。天线长度通常与 λ 相关（如 λ/4 单极子）。

**dB (Decibel, 分贝)**：
[已学] 两个功率（或幅度）比值的对数表示：**dB = 10·log₁₀(P₁/P₂)**。用于把大范围的比值压缩成好读的数（1000 倍 = 30 dB）。dB 是**比值**，不是绝对量。

**dBm (Decibel-milliwatt, 分贝毫瓦)**：
[已学] 以 1 mW 为参考的**绝对功率**单位：**P(dBm) = 10·log₁₀(P(mW))**。0 dBm = 1 mW，10 dBm = 10 mW，20 dBm = 100 mW。Wi-Fi 发射功率典型 15–23 dBm（约 30–200 mW）。_记忆_：+3 dB = 功率 ×2；+10 dB = 功率 ×10。

**dBW (Decibel-watt, 分贝瓦)**：
[已学] 以 1 W 为参考的功率单位（0 dBW = 30 dBm）。CWNA 多用 dBm。

**mW / Watt (毫瓦 / 瓦)**：
[已学] 功率的线性单位。Wi-Fi 用 mW 居多，因发射功率通常在几百 mW 以内。dBm 和 mW 通过对数换算。

**SNR (Signal-to-Noise Ratio, 信噪比)**：
[已学] 信号功率与噪声功率的比值，用 dB 表示。**SNR 决定可达调制阶数（MCS）** —— SNR 越高，可用更高阶 QAM（如 1024-QAM）传更多比特。Wi-Fi 最低 MCS（BPSK 1/2）需 SNR 约 0 dB；1024-QAM 需 ~30+ dB。

**Noise floor (噪声底)**：
[已学] 接收机所处的背景噪声功率电平（热噪声 + 接收机自身噪声）。Wi-Fi 20 MHz 信道室温热噪声底约 −101 dBm。噪声底越低，可分辨的信号越弱。

**Thermal noise (热噪声)**：
[已学] 由导体电子热运动产生的噪声，功率 = k·T·B（k 玻尔兹曼常数，T 温度 K，B 带宽 Hz）。室温 290 K 下：**噪声功率(dBm) = −174 + 10·log₁₀(B)**。这是物理底，无法突破。

**Path loss (路径损耗)**：
[已学] 信号从发射到接收在空间传播中的功率衰减。自由空间路径损耗 **FSPL = 20·log₁₀(d) + 20·log₁₀(f) + 常数**（d 距离，f 频率）。频率越高、距离越远，损耗越大。

**EIRP (Equivalent Isotropically Radiated Power, 等效全向辐射功率)**：
[待学] 发射功率 + 天线增益的合成量，表示向某方向辐射的等效功率。法规对 EIRP 有上限。cw 都用 dBm。

**Link budget (链路预算)**：
[已学] 发射功率 − 所有损耗 + 天线增益 − 接收灵敏度，得到接收 SNR 的计算。是预测「能通多远」的工具。

**Receiver sensitivity (接收灵敏度)**：
[已学] 接收机在指定 PER（包错误率，通常 10%）下能正确解调的**最低信号功率**，单位 dBm。例如 −82 dBm @ MCS7。MCS 越高，灵敏度越差（需更强信号）。

**FHSS (Frequency Hopping Spread Spectrum, 跳频扩频)**：
[桥梁] 在多个载频之间按约定序列快速切换来承载信号的扩频方式。**蓝牙（BR/EDR）的核心 PHY 机制**。Wi-Fi legacy 仅 802.11-1997 用过，已淘汰。

**OFDM (Orthogonal Frequency Division Multiplexing, 正交频分复用)**：
[已学] 把数据分到多个**频域正交**的子载波上并行传输的 PHY 机制。子载波间隔 Δf = 1/T_symbol，sinc 频谱零点互相落在对方中心，频谱可重叠而互不干扰。**现代 Wi-Fi（802.11a/g/n/ac/ax）的核心**，与 BT 的 FHSS 是两条路线。
_避免_：把它和 QAM 的 I/Q 正交（相位差 90°）混淆 —— 那是单载波内的两路正交。

**Subcarrier (子载波)**：
[已学] OFDM 中承载一小部分数据的单个窄带频率分量。整个信道由几十到上千个子载波组成。分为**数据子载波**（承载数据）、**导频子载波**（追踪信道/相位）、**零号/直流子载波**（留空，避开本振泄漏）。

**Symbol period (T, 符号周期)**：
[已学] OFDM 中发送一个 OFDM 符号所用的时间（802.11a/g: T = 3.2 μs，802.11ax: T = 12.8 μs）。**子载波间隔 Δf = 1/T** 是 OFDM 正交的根条件。

**Subcarrier spacing (Δf, 子载波间隔)**：
[已学] 相邻子载波中心频率之差，等于 1/T_symbol。802.11a/g/n/ac: Δf = 312.5 kHz；802.11ax: Δf = 78.125 kHz（缩小 4 倍，换更长符号 → 更抗多径）。

**I/Q (In-phase / Quadrature, 同相 / 正交)**：
[已学] 一个载波内分出的两路：I 路用 cos(ωt)、Q 路用 sin(ωt)，两者**相位差 90°**。这是**单载波内**的正交（与 OFDM 多子载波间的频域正交是两回事）。QAM 调制建立在 I/Q 之上。

**QAM (Quadrature Amplitude Modulation, 正交幅度调制)**：
[已学] 同时用 I/Q 两路的幅度和相位承载多个比特的调制方式。16-QAM 一个符号传 4 bit，64-QAM 传 6 bit，256-QAM 传 8 bit，1024-QAM 传 10 bit。Wi-Fi 的 MCS 越高，QAM 阶数越高。

**BPSK (Binary Phase Shift Keying, 二进制相移键控)**：
[已学] 最简单的相位调制，一个符号传 1 bit（0/π 两个相位）。Wi-Fi 最低速率 MCS0 用 BPSK 1/2。

**MCS (Modulation and Coding Scheme, 调制与编码方案)**：
[已学] Wi-Fi 用 0–11 的索引（802.11n/ac/ax）标识一组「调制阶数 + 编码率」。MCS 越高 = 速率越高，但需更强 SNR。由自适应速率算法（rate adaptation）动态选择。

**RSSI (Received Signal Strength Indicator, 接收信号强度指示)**：
[已学] 接收机测得的信号功率，单位 dBm。是链路预算里「接收信号功率」的实测值。Wi-Fi 也有 RCPI（更精确的 dBm 测量）作为 RSSI 的标准化版本。

**PAPR (Peak-to-Average Power Ratio, 峰均功率比)**：
[已学] 信号峰值功率与平均功率的比值。OFDM 因多子载波叠加，PAPR 高 → 功放易饱和、需功率回退。单载波（如 FSK）PAPR 低。

**ICI (Inter-Carrier Interference, 子载波间干扰)**：
[已学] OFDM 中子载波正交性被破坏（频偏、相位噪声、多径超 GI）导致的子载波互相泄漏。

**ISI (Inter-Symbol Interference, 符号间干扰)**：
[已学] 前一个符号的多径时延拖到下一个符号里造成的干扰。OFDM 用 Guard Interval / CP 吸收。

**EVM (Error Vector Magnitude, 误差向量幅度)**：
[已学] 实测星座点与理想星座点的偏差，衡量发射/接收质量。EVM 越小越好。高阶 QAM（1024-QAM）对 EVM 要求极严。

**FDM (Frequency Division Multiplexing, 频分复用)**：
[已学] 传统多载波技术，用保护频带隔离子载波，频谱不重叠。与 OFDM（重叠 + 正交）对比，FDM 频谱效率低。

**GFSK (Gaussian Frequency Shift Keying, 高斯频移键控)**：
[桥梁] 蓝牙（BR/EDR 和 BLE）的 PHY 调制方式，单载波、恒包络、低阶。与 Wi-Fi 的 OFDM + QAM 形成对照。

**connection event (连接事件)**：
[桥梁] BLE 中 central 和 peripheral 在 anchor point 周期性收发的时序单元。是 BLE TDMA 调度的体现。

**piconet (微微网)**：
[桥梁] 蓝牙的基本网络单元：1 个 master + ≤7 个 active slave。结构上对应 Wi-Fi 的 BSS，但控制范式不同（master 调度 vs STA 竞争）。

**master / slave (主 / 从)**：
[桥梁] 蓝牙 piconet 的角色。master 是仲裁者，分配 slot；slave 在分配的 slot 发送。Wi-Fi 无此概念（AP 不调度 STA 发送）。

**sinc function (sinc 函数)**：
[已学] 形如 sin(πf·T)/(πf·T) 的函数。一个持续 T 秒的矩形脉冲，其频谱就是 sinc。OFDM 正交的几何直觉来源：每个子载波频谱是 sinc，在其他子载波中心频率处恰好为零点。
_避免_：和「正弦波」混为一谈 —— sinc 是频谱包络，不是时域波形。

**Fourier transform (傅里叶变换)**：
[已学] 时域信号 ↔ 频域频谱的相互转换。OFDM 用 **IFFT/FFT** 在基带完成多子载波的合成与分离 —— 这是 OFDM 能用数字电路高效实现的关键（否则要几百个模拟振荡器）。

**Guard Interval (GI, 保护间隔) / Cyclic Prefix (CP, 循环前缀)**：
[待学] 每个 OFDM 符号前插入的一段冗余（802.11a: 0.8 μs），用于吸收多径时延扩展，避免符号间干扰 (ISI)。Wi-Fi 用 CP 形式（把符号尾部的样本复制到头部），还能保持子载波正交。

**RTS/CTS (Request To Send / Clear To Send, 请求发送 / 允许发送)**：
[已学] 隐藏节点的缓解机制。发送方先发短 RTS，AP 回 CTS 广播「我要收数据，他人别发」，周围 STA 听到 CTS 后退避。代价：额外控制帧开销。

**ACK (Acknowledgment, 确认帧)**：
[已学] 接收方正确收到数据帧后回的确认帧。用 SIFS（最高优先级）发送。没收到 ACK → 发送方判定碰撞 → BEB 重试。

**QoS (Quality of Service, 服务质量)**：
[待学] 区分不同业务优先级的机制。Wi-Fi 用 802.11e / EDCA 实现，给语音/视频/数据/背景分不同 AIFS 和 CW 范围。

**EDCA (Enhanced Distributed Channel Access, 增强分布式信道接入)**：
[待学] 802.11e 定义的 QoS 版 DCF。用 AIFS（可变）+ 不同的 CWmin/CWmax 区分 4 个接入类别（AC）：语音、视频、尽力而为、背景。

**LoRa (Long Range)**：
[桥梁] 一种 sub-GHz 低功耗广域网技术，用 chirp spread spectrum (CSS) 调制。有两个独立参数：BW（带宽）和 SF（扩频因子）。是学员 sub-GHz 协议栈背景的代表性技术。

**spreading factor (SF, 扩频因子)**：
[桥梁] LoRa 特有参数，决定 chirp 持续时间：T_sym = 2^SF / BW。SF 越大 → 积分越长 → 处理增益越高 → 灵敏度越好（每 SF +1 约改善 2.5–3 dB）。**不是带宽**。Wi-Fi 无对应物。

## 介质访问（Medium Access）

**CSMA/CA (Carrier Sense Multiple Access with Collision Avoidance, 载波侦听多址接入 / 碰撞避免)**：
[已学] 「先听后说」的分布式介质访问方法：发送前先侦听信道空闲，再退避一段随机时间后发送，尽量避免碰撞。**Wi-Fi 的核心介质访问范式**，与 BT 的调度式 TDMA + FHSS 形成根本对照。

**TDMA (Time Division Multiple Access, 时分多址)**：
[桥梁] 把时间切成帧/槽、由中央调度器分配给各设备的接入方式。**蓝牙（特别是 BLE connection event）的范式**。

**DCF (Distributed Coordination Function, 分布式协调函数)**：
[已学] 802.11 的基础 MAC 操作模式，基于 CSMA/CA。所有 STA 平等竞争介质，无中央调度。是 Wi-Fi 最常用的接入方式。

**Backoff (退避)**：
[已学] CSMA/CA 中，检测到信道忙（或刚发生碰撞）后，随机等待一段时间再尝试发送的机制。Wi-Fi 用 **CW (Contention Window)** + 随机计数器实现。

**CW (Contention Window, 竞争窗口)**：
[已学] backoff 计数器的取值范围 [0, CW]。802.11a: CWmin=15, CWmax=1023。碰撞后 CW 倍增（BEB），成功后回到 CWmin。

**BEB (Binary Exponential Backoff, 二进制指数退避)**：
[已学] 每次碰撞后 CW 翻倍的算法：CW = 2ⁿ·(CWmin+1) − 1，n 为重试次数，封顶 CWmax。作用：碰撞多时自动拉长退避，缓解拥塞。

**IFS (Interframe Space, 帧间间隔)**：
[已学] 帧之间强制的时间间隔，用于介质访问优先级控制。短 IFS = 高优先级。主要有 SIFS / PIFS / DIFS / EIFS / AIFS。

**SIFS (Short IFS, 短帧间间隔)**：
[已学] 最短 IFS，最高优先级。用于已开始的一次帧交换内部（如 DATA→ACK、RTS→CTS）。802.11a: 16 μs；802.11b/g: 10 μs。_为什么短：让进行中的对话不被打断。_
**SIFS 的物理成分**（标准公式：aSIFSTime = aRxRFDelay + aRxPLCPDelay + aMACProcessingDelay + aRxTxTurnaroundTime）。802.11a 拆解：RxRF ~0.5 μs + **PLCP 解码 ~12.5 μs（大头）** + MAC 处理 ~0.5 μs + RxTx 切换 ~2 μs = 16 μs。⚠️ 常见误解："SIFS 就是收发天线切换时间"——不准确，天线切换（aRxTxTurnaroundTime）只是四分量之一且非主要。详见 wifi-terms-cheatsheet.html。

**DIFS (DCF IFS, DCF 帧间间隔)**：
[已学] 普通数据帧发起接入前要等的间隔 = SIFS + 2×SlotTime。802.11a: 34 μs。比 SIFS 长，所以新对话比进行中的对话优先级低。

**SlotTime (时隙)**：
[已学] backoff 计数器递减的时间单位。802.11a: 9 μs；802.11b: 20 μs。时隙边界对齐让多 STA 的退避同步。

**CCA (Clear Channel Assessment, 信道空闲评估)**：
[已学] PHY 层判断信道忙/闲的功能，是 CSMA/CA「先听」的物理基础。CCA 阈值决定多弱的信号算「信道忙」。

**Hidden node (隐藏节点 / 隐藏终端)**：
[已学] 两个 STA 互相听不到、但都能到 AP 的场景。导致它们同时发 → AP 处碰撞，而 CSMA/CA 的「先听后说」对此无能为力。缓解：RTS/CTS 握手。

**RTS/CTS (Request To Send / Clear To Send)**：
[已学] 隐藏节点的缓解机制。发送方先发短 RTS，AP 回 CTS 广播「我要收数据，他人别发」，周围 STA 听到 CTS 后退避。代价：额外控制帧开销。

**Contention (竞争)**：
[已学] 多个设备在同一信道上争用介质的情形。Wi-Fi 的常态。

## 网络结构（Network / Topology）

**BSS (Basic Service Set, 基本服务集)**：
[待学] Wi-Fi 的基本网络单元 —— 一个 AP（接入点）和与它关联的一组站点 (STA)。**对应 BT 的 piconet（微微网）概念**，但介质访问范式不同。

**STA (Station, 站点)**：
[待学] 任何具备 802.11 MAC/PHY 能力的设备。手机、笔记本、IoT 节点都是 STA；AP 本质上也是一种特殊 STA。

**AP (Access Point, 接入点)**：
[待学] 提供 STA 关联、桥接有线网络的 Wi-Fi 设备。BSS 的中心节点。

**IBSS (Independent BSS, 独立基本服务集)**：
[待学] 无 AP 的对等 Wi-Fi 网络，俗称 ad-hoc / Wi-Fi Direct 类拓扑。

## 协议分层（Protocol Layering）

**PHY (Physical Layer, 物理层)**：
[待学] 负责 RF 调制、编码、收发的层。对应 OSI 第 1 层。Wi-Fi PHY 按 amendment 分（a/g/n/ac/ax/be）。

**MAC (Medium Access Control, 介质访问控制层)**：
[待学] 负责介质接入、帧封装、确认、重传的层。对应 OSI 第 2 层下半。**BT 工程师要把 MAC 当成「比 BLE Link Layer 更复杂的兄弟」来理解。**

## MAC 帧结构（Frame Structure）

**MAC frame (MAC 帧)**：
[已学] 802.11 数据链路层的 PDU。固定头（24B）+ 可变 Body（0–2312B）+ FCS（4B）。分管理/控制/数据三类。

**Frame Control (帧控制字段)**：
[已学] MAC 头前 2 字节。包含 Protocol Version、Type/Subtype（帧类型）、ToDS/FromDS、Retry、Power Management、More Data、Protected Frame、Order 等位域。是协议栈解析帧的入口。

**帧类型 Type**：
[已学] Frame Control 里 2 bit。Management(00) / Control(01) / Data(10)。每类下有 subtype（4 bit）细分（Beacon、Probe、Association、ACK、RTS、CTS、Data、QoS Data 等）。

**Management frame (管理帧)**：
[已学] 用于关联、扫描、认证等管理操作。ToDS=FromDS=0，只用 3 个地址。典型：Beacon、Probe Request/Response、Authentication、Association Request/Response。

**Control frame (控制帧)**：
[已学] 辅助数据帧传输，自身不承载数据。典型：ACK、RTS、CTS、PS-Poll。只有少量头字段（如 ACK 仅 14B）。

**Data frame (数据帧)**：
[已学] 承载上层数据。ToDS/FromDS 决定地址含义和是否用 Address 4（WDS 四地址）。

**Duration/ID (持续期 / ID)**：
[已学] 2 字节。大多数帧里存 NAV（Network Allocation Vector）值，单位 μs，告诉其它 STA「这组帧交换还要占多久」。PS-Poll 帧里存 AID（Association ID）。

**NAV (Network Allocation Vector, 网络分配矢量)**：
[已学] 虚拟载波侦听机制。STA 读到帧里的 Duration，就知道接下来这段时间信道被占用，自己的退避计时器同步冻结。是 CSMA/CA 的"虚拟侦听"补充物理 CCA。

**Address 1–4 (地址字段)**：
[已学] 4 个 6 字节 MAC 地址字段。Addr1=RA（接收方）、Addr2=TA（发送方）恒成立；Addr3、Addr4 含义由 ToDS/FromDS 决定。管理帧和普通数据帧只用 3 个；WDS（无线桥接）用满 4 个。

**ToDS / FromDS (To DS / From DS 位)**：
[已学] Frame Control 里 2 个 bit，表示帧是否要去往/来自分布式系统（DS，通常是有线网）。决定 4 个地址字段的角色映射（见帧结构课的对照表）。

**Sequence Control (序列控制)**：
[已学] 2 字节。Fragment Number（4 bit）+ Sequence Number（12 bit）。用于分片重组和去重（检测重传帧）。

**FCS (Frame Check Sequence, 帧校验序列)**：
[已学] 4 字节 CRC-32，附在帧尾。接收方校验失败则丢弃帧，且对错误帧用 EIFS 退避。

**BSSID (Basic Service Set Identifier)**：
[已学] 标识一个 BSS 的 6 字节 MAC。infra BSS 里 = AP 的 MAC；IBSS 里 = 随机生成。注意与 SSID（网络名，字符串）区分。

## 关联流程与状态机（Association / Connection Flow）

**Scanning (扫描)**：
[已学] STA 发现周围 BSS 的过程。两种：<strong>被动扫描</strong>（监听 AP 周期广播的 Beacon）、<strong>主动扫描</strong>（STA 发 Probe Request，AP 回 Probe Response）。扫到的信息（SSID/BSSID/信号/能力）用于选 AP。

**Beacon (信标帧)**：
[已学] AP 周期广播的管理帧（典型 102.4 ms 一次）。承载 BSS 的 SSID、BSSID、能力（Capability Info）、支持的速率、TIM（省电通知）等。是被动扫描和漫游定位的依据。

**Probe Request / Probe Response (探测请求 / 探测响应)**：
[已学] 主动扫描用的一对管理帧。STA 广播（或定向）Probe Request 带想找的 SSID；匹配的 AP 回 Probe Response（内容和 Beacon 几乎一样）。比被动扫描更快发现网络。

**SSID (Service Set Identifier, 服务集标识)**：
[已学] Wi-Fi 的"网络名"，最长 32 字节的字符串，人类可读。一个 ESS 下所有 AP 用同一 SSID。<strong>不是 BSSID</strong>（那是 MAC）。可隐藏（不广播），但安全性靠不住。

**Capability Information (能力信息字段)**：
[已学] 2 字节位域，出现在 Beacon / Probe Response / (Re)Assoc Request/Response 里。宣告/请求 BSS 的能力：ESS/IBSS bit、Privacy（是否加密）、Short Preamble、Short Slot Time、Spectrum Mgmt 等。是关联时 STA 与 AP 协商能力的载体。

**Authentication (802.11 认证帧)**：
[已学] 关联<strong>之前</strong>的一对管理帧交换（不是安全认证！）。Open System（algorithm=0）是两帧握手：STA 发 Auth Seq 1，AP 回 Auth Seq 2（基本都成功）。<strong>它几乎不做身份验证</strong>，只是 802.11 状态机的过场。真正的身份认证由后续 WPA 的 4-Way Handshake / 802.1X 完成。⚠️ 常见误区：把 802.11 Authentication 当成"安全认证"。

**Association (关联)**：
[已学] STA 加入 BSS 的过程。STA 发 Association Request（带能力、支持的速率、监听的信道），AP 回 Association Response（带 Status Code、AID）。关联成功后 STA 进入"已关联"状态，可以发数据帧。状态机视角：从未认证→已认证→已关联→已授权（4-Way Handshake 后）。

**AID (Association ID, 关联标识符)**：
[已学] AP 在 Association Response 里分配给 STA 的 16-bit ID，范围 <strong>1–2007</strong>。后续 PS-Poll 帧用它（放在 Duration/ID 字段）取缓存帧；TIM 里也按 AID 位标记哪个 STA 有缓存的下行帧。

**Reassociation (重关联)**：
[已学] 已关联的 STA 在同一 ESS 内<strong>从原 AP 切到新 AP</strong> 的过程（漫游）。用 Reassociation Request（比 Association Request 多一个"原 AP 的 MAC"字段）和 Reassociation Response。是漫游（roaming）的核心帧。

**Deauthentication / Disassociate (取消认证 / 取消关联)**：
[已学] 断开连接的管理帧。Deauth 把状态机从任意状态打回 State 1（未认证）；Disassociate 从已关联打回 State 2（已认证未关联）。是"主动踢人"和"客户端下线"的载体。

**State 1 / 2 / 3 (802.11 状态机三态)**：
[已学] 802.11 把 STA 状态分三层：<strong>State 1</strong> 未认证（只能发 Class 1 帧：管理帧 Class 1 如 Probe）、<strong>State 2</strong> 已认证未关联（可发 Class 2 帧：Association）、<strong>State 3</strong> 已关联（可发 Class 3 帧：数据帧）。认证/关联/解认证就是状态之间的迁移。这是协议栈状态机的官方骨架。

## 省电机制（Power Save）

**Power Save Mode (省电模式)**：
[已学] STA 通过在 Frame Control 里置 Power Management bit=1 告诉 AP"我要睡了"，AP 就为它<strong>缓存下行帧</strong>。STA 周期性醒来检查 Beacon 里的 TIM，看有没有自己的帧，有就发 PS-Poll 取。<strong>Wi-Fi 省电的核心思路：把"被动接收"变成"主动预约取"</strong>，睡眠期间关闭射频。

**PS-Poll (Power-Save Poll, 省电轮询帧)**：
[已学] 省电 STA 用来向 AP"取一个缓存帧"的控制帧。它的 Duration/ID 字段<strong>不放 NAV，放 AID</strong>（这是 AID 的两个用途之一）。AP 收到 PS-Poll 后回一个缓存的帧。要取多个帧就发多个 PS-Poll（或用 More Data bit 判断还有没有）。

**TIM (Traffic Indication Map, 业务指示图)**：
[已学] Beacon 里携带的信息元素，是一个<strong>位图 (bitmap)</strong>。每一位对应一个 AID——若位=1，表示 AP 为该 AID 的 STA 缓存了单播帧。省电 STA 醒来后解析 TIM，看自己的 AID 位是不是 1，是就发 PS-Poll 取帧。

**DTIM (Delivery TIM, 投递业务指示图)**：
[已学] 特殊的 TIM，按 DTIM Period（如每 3 个 Beacon 一次）周期出现。DTIM 不仅指示单播缓存，还<strong>立即发送缓存的广播/组播帧</strong>。省电 STA 必须在 DTIM Beacon 处醒来，否则会错过广播（如 ARP）。DTIM Period 在 Beacon 里宣告。

**Listen Interval (监听间隔)**：
[已学] STA 在 Association Request 里告诉 AP「我每 N 个 Beacon 醒一次」。N 就是 Listen Interval。N=1 每次都醒；N=10 每 10 个 Beacon 醒一次——睡得更久但 AP 要缓存更多帧。是 STA 主动声明的省电参数，AP 据此分配缓存缓冲区。

**More Data bit**：
[已学] Frame Control 里 1 bit。AP 发缓存的下行帧时，若 STA 还有更多缓存帧待取，置 More Data=1。STA 据此决定"继续醒着取完"还是"回去睡"。

**U-APSD (Unscheduled Automatic Power Save Delivery, 非调度自动省电投递)**：
[已学] WMM-PS（802.11e）的省电增强。STA 不用每次发 PS-Poll 取帧，而是<strong>用上行数据/触发帧触发 AP 把缓存帧"送货上门"</strong>。对 VoIP 这类双向周期业务省电效果显著（一次唤醒收发双向）。是 WFA 认证里 WMM-PS 的核心。

**TWT (Target Wake Time, 目标唤醒时间)**：
[已学] 802.11ax (Wi-Fi 6) 引入的省电机制，源自 802.11ah（IoT 专用 amendment）。STA 和 AP 显式协商一个"未来唤醒时刻表"（Service Period），STA 只在约定窗口醒来收发，<strong>完全脱离 Beacon/DTIM 周期的束缚</strong>。可睡几十秒甚至几分钟，是 Wi-Fi 6 IoT 场景（智能门锁、传感器）续航的关键。

## Linux Wi-Fi 软件栈（Driver / Stack）

**MLME (MAC Sublayer Management Entity, MAC 子层管理实体)**：
[已学] 802.11 里负责管理帧收发、扫描、认证、关联、密钥的实体。它和数据收发路径（data path）是 MAC 层里两条相对独立的线。在 Linux 上 MLME 跑在哪里是 SoftMAC/FullMAC 的分水岭。

**SoftMAC (Software MAC, 软件 MAC)**：
[已学] 一类 Wi-Fi 芯片：MLME（管理帧处理）放在内核软件里做，由 <strong>mac80211</strong> 框架统一实现。芯片只管 PHY + 部分低层 MAC。SoftMAC 驱动实现 <span class="mono">ieee80211_ops</span> 注册到 mac80211。典型：<strong>ath9k / ath10k / ath11k / iwlwifi / brcmsmac / rt2800</strong>。Linux 里绝大多数主流驱动是 SoftMAC。
_注意_：ath10k / ath11k / iwlwifi 固件很"重"（做扫描/聚合/加密 offload），但架构上仍是 SoftMAC —— MLME 仍走 mac80211。

**FullMAC (Full MAC, 全 MAC)**：
[已学] 另一类 Wi-Fi 芯片：MLME 放在芯片<strong>固件</strong>里做，内核看不到管理帧细节。FullMAC 驱动<strong>不用 mac80211</strong>，直接向 <strong>cfg80211</strong> 注册自己的 <span class="mono">cfg80211_ops</span>。典型：<strong>brcmfmac / mwifiex / ath6kl / qtnfmac</strong>。常见于 SDIO/USB 类 IoT Wi-Fi 模块（如树莓派 Wi-Fi、Marvell 系）。

**mac80211**：
[已学] Linux 内核里的 <strong>SoftMAC 驱动框架</strong>（<span class="mono">net/mac80211/</span>）。它替 SoftMAC 驱动实现：管理帧收发（STA 模式 MLME，在 <span class="mono">mlme.c</span>）、数据帧的 802.3↔802.11 封装、加密/分片/聚合、A-MPDU 重排、速率控制接口。它本身向 cfg80211 注册一份 <span class="mono">cfg80211_ops</span>。学员的 BT 协议栈经验（状态机、帧解析）最直接迁移到这里。

**cfg80211**：
[已学] Linux 内核里的 <strong>802.11 配置子系统</strong>（<span class="mono">net/wireless/</span>）。是<strong>所有</strong> Wi-Fi 设备（SoftMAC 和 FullMAC 都一样）对上的统一配置入口：设备注册（wiphy）、扫描/连接/密钥的命令分发、监管域 (regulatory domain) 强制。它定义 <span class="mono">struct cfg80211_ops</span> —— SoftMAC 由 mac80211 填、FullMAC 由驱动自己填。

**nl80211**：
[已学] 用户态 ↔ 内核之间的 <strong>netlink 协议</strong>，是 cfg80211 对用户态的接口。用户态程序（wpa_supplicant / hostapd / iw）通过 libnl 库发 nl80211 消息（如 <span class="mono">NL80211_CMD_TRIGGER_SCAN</span>、<span class="mono">NL80211_CMD_AUTHENTICATE</span>、<span class="mono">NL80211_CMD_ASSOCIATE</span>、<span class="mono">NL80211_CMD_NEW_KEY</span>）到内核 cfg80211，再分发到驱动。<strong>取代了老的 Wireless Extensions (wext)</strong>。

**wpa_supplicant**：
[已学] 用户态的 STA 模式守护进程。职责：发起扫描请求、做 WPA/WPA2/WPA3 的 <strong>4-Way Handshake / 密钥管理 / 802.1X (EAP)</strong>、漫游决策。通过 nl80211 ↔ 内核通信。在 mac80211 (SoftMAC) 驱动上，<strong>认证/关联的 MLME 在内核</strong>，wpa_supplicant 只发"连接"命令并管密钥；在老式驱动上它也会自己驱动 MLME。

**hostapd**：
[已学] 用户态的 AP（接入点）模式守护进程，wpa_supplicant 的 AP 版本。按 mac80211 官方文档：<strong>STA 模式 MLME 在内核（mac80211），AP 模式 MLME 在用户态（hostapd）</strong>。hostapd 通过 nl80211 配置 AP 接口、处理 AP 侧管理帧与密钥。

**iw / libnl / iwd**：
[待学] <strong>iw</strong>：基于 nl80211 的命令行工具，手动发扫描/连接/看 phy 信息。<strong>libnl</strong>：构造 netlink 消息的 C 库，wpa_supplicant / hostapd / iw 都用它。<strong>iwd</strong>：Intel 出的 wpa_supplicant 替代品，把更多逻辑放进自身。

## 安全 / 加密（Security）

**CCMP / AES-CCMP (Counter Mode CBC-MAC Protocol)**：
[已学] WPA2 的强制加密协议，基于 AES。同时做<strong>加密</strong>（CTR 模式）和<strong>完整性校验</strong>（CBC-MAC），合称 AEAD。每个数据帧用一次性 nonce，杜绝 WEP 的密钥复用漏洞。Wi-Fi 4/5/6 默认用 CCMP。

**TKIP (Temporal Key Integrity Protocol)**：
[已学] WPA1（过渡期）的加密协议，复用 WEP 的 RC4 但加了每包密钥混合 + Michael MIC + 序列号反重放。是 WEP → CCMP 的临时补丁，<strong>2012 年后被标准废弃</strong>。做新固件不要支持 TKIP。

**WEP (Wired Equivalent Privacy)**：
[桥梁] 802.11-1997 的初代加密，RC4 + 静态密钥。致命缺陷：IV 24bit 太短会复用 → 几分钟可破。<strong>2004 年正式废弃</strong>。是"加密协议设计反面教材"和 802.11 Authentication 名字陷阱的历史源头。

**WPA / WPA2 / WPA3 (Wi-Fi Protected Access)**：
[已学] Wi-Fi 联盟（WFA）的安全认证体系。<strong>WPA1</strong>（2003，过渡，用 TKIP）、<strong>WPA2</strong>（2004，802.11i，用 CCMP，最普及）、<strong>WPA3</strong>（2018，用 SAE 替代 PSK + 强制 PMF）。WPA 不是 IEEE 标准号，是 WFA 的认证品牌；背后对应 802.11i (WPA2) 等修正案。

**RSNA (Robust Security Network Association, 强健安全网络关联)**：
[已学] 802.11i 标准里对 WPA2 这套安全关联的正式名称。STA 和 AP 建立 RSNA 才算"真正安全地连上"。包含：身份认证（PSK/802.1X）→ 4-Way Handshake 派生 PTK → Group Key Handshake 派生 GTK。RSNA 在 Association 之后、数据传输之前。

**PSK (Pre-Shared Key, 预共享密钥)**：
[已学] WPA2-Personal（家庭模式）的认证方式：密码 (passphrase) + SSID 经 PBKDF2-HMAC-SHA1（4096 轮）派生出 PMK。PMK 在 4-Way Handshake 之前就双方都有。<strong>安全性依赖密码强度</strong>——抓到 4-Way Handshake 可离线爆破 PSK。

**PMK (Pairwise Master Key, 成对主密钥)**：
[已学] STA 和 AP 之间共享的"根密钥"，32 字节。来源：WPA2-PSK 时由密码派生；WPA2-Enterprise 时由 802.1X/EAP 认证产生的 MSK 截取。PMK 本身<strong>不直接加密数据帧</strong>，而是作为 4-Way Handshake 的输入派生 PTK。

**PTK (Pairwise Transient Key, 成对临时密钥)**：
[已学] 4-Way Handshake 派生出的<strong>本次会话的单播加密密钥</strong>。输入：PMK + ANonce + SNonce + 双方 MAC。由 KCK（签 EAPOL）/ KEK（加密 GTK）/ TK（加密数据帧）三段组成。<strong>每次关联重新派生</strong>，所以叫 Transient（临时的）。抓包能看到 PTK 派生的输入，但 PMK 不在空中传，所以拿不到 PTK。

**GTK (Group Temporal Key, 组临时密钥)**：
[已学] AP 为整个 BSS 生成的<strong>组播/广播加密密钥</strong>。一个 BSS 一个 GTK，所有 STA 共用。由 AP 的 GMK 派生，在 4-Way Handshake 的 M3 里用 KEK 加密下发给 STA。<strong>为什么单播要单独的 PTK</strong>：每对 STA-AP 密钥独立，一个被破不连累其他 STA；组播必须共用一个才能让所有人解。

**Nonce / ANonce / SNonce (随机数)**：
[已学] 4-Way Handshake 里用的随机数。<strong>ANonce</strong>（Authenticator Nonce）由 AP 生成，M1 里发给 STA；<strong>SNonce</strong>（Supplicant Nonce）由 STA 生成，M2 里发给 AP。两者凑齐后双方都能算 PTK。作用：保证 PTK 每次新鲜，防重放。

**MIC (Message Integrity Code, 消息完整性码)**：
[已学] 附在帧后的校验码，用密钥（PTK 里的 KCK）对帧内容计算。接收方验证 MIC = 没被篡改 + 发送方确实持有正确密钥。<strong>MIC 既是完整性也是身份证明</strong>。4-Way Handshake 的 M2/M3/M4 都带 MIC 证明双方算出了同一个 PTK。

**4-Way Handshake (四次握手)**：
[已学] RSNA 核心。STA 和 AP 用 4 个 EAPOL-Key 帧派生并确认 PTK，并下发 GTK。M1: AP 发 ANonce → M2: STA 发 SNonce + MIC（证明算出 PTK）→ M3: AP 发加密的 GTK + RSN-IE + MIC → M4: STA 回 MIC 确认。完成后双方 install PTK/GTK，进入"已授权"状态。<strong>关联成功 ≠ 能传数据，要 4-Way Handshake 完成才行</strong>（第 7 课伏笔）。

**EAPOL (EAP over LAN, 局域网上的 EAP)**：
[已学] 4-Way Handshake 和 802.1X 认证用的帧格式（802.1X 定义），承载在 802.11 数据帧的 Body 里。EAPOL-Key 是其中一类，装 nonce/MIC/GTK 等密钥协商字段。注意：<strong>EAPOL 帧在关联后、加密前发送</strong>（鸡生蛋问题——密钥还没建立，只能明文传握手帧，但靠 MIC 保证完整性）。

**802.1X / EAP (端口认证 / 可扩展认证协议)**：
[已学] WPA2-Enterprise 的身份认证方式。EAP 是认证框架（EAP-TLS/EAP-PEAP/EAP-TTLS 等），802.1X 把它搬到链路层。STA、AP（authenticator）、RADIUS 服务器三方参与：STA 和 RADIUS 做 EAP 认证，AP 当中间人，认证成功后 RADIUS 把 MSK 给 AP，AP 用它派生 PMK。<strong>比 PSK 强在：每个用户独立认证、密钥可集中管理、支持证书</strong>。

**SAE (Simultaneous Authentication of Equals, 对等同步认证)**：
[已学] WPA3-Personal 替代 PSK 的认证协议，基于 Dragonfly 握手（PAKE 协议）。双方用密码派生 Password Element，做 COMMIT/CONFIRM 交换，派生出 PMK。<strong>关键改进</strong>：抓包无法离线爆破密码（PMK 高熵且每会话新鲜），有前向保密。<strong>修复了 WPA2-PSK 最大的软肋</strong>。代价：椭圆曲线运算重，有 Dragonblood 侧信道类漏洞。

**PMF / 802.11w (Protected Management Frames, 受保护管理帧)**：
[已学] 给管理帧（Deauth/Disassoc/部分 Action）加加密保护和完整性校验。WPA2 可选，<strong>WPA3 强制</strong>。<strong>修复 Deauth 攻击</strong>（第 7 课的 Deauth 帧可被伪造踢人）。没有 PMF 时，攻击者伪造一个 Deauth 帧就能把 STA 踢下线——这是早年 Wi-Fi 最常见的攻击。

**RSN-IE (Robust Security Network Information Element)**：
[已学] Beacon / Probe Resp / Assoc Req 里携带的信息元素，宣告这个 BSS 的安全能力：支持的加密套件（CCMP/TKIP）、认证方式（PSK/802.1X/SAE）、是否要 PMF。STA 和 AP 在关联前用它匹配能力。抓包看 RSN-IE 是判断"这个网络用什么加密"的入口。

## 安全实现细节（Security Implementation）

**PBKDF2 (Password-Based Key Derivation Function 2)**：
[已学] WPA2-PSK 派生 PMK 的算法（RFC 2898/8018）。WPA2 的具体参数：<strong>PMK = PBKDF2-HMAC-SHA1(passphrase, SSID, 4096, 32)</strong> —— 密码作输入、SSID 作盐、4096 轮 HMAC-SHA1、输出 32 字节。<strong>SSID 当盐</strong>是关键：同一密码在不同 SSID 下派生出不同 PMK，防预计算彩虹表。4096 轮故意慢，抬高离线爆破成本（但仍可被 GPU/ASIC 加速）。

**PWE (Password Element, 密码元素)**：
[已学] WPA3 SAE (Dragonfly) 协议中，双方在椭圆曲线上从密码派生出的一个秘密点。派生方法两代：<strong>Hunting-and-Pecking (HNP)</strong>（迭代哈希试值，但有侧信道漏洞）和 <strong>Hash-to-Element (H2E)</strong>（一次性确定性映射，修了 HNP 的侧信道，WPA3 新固件用这个）。PWE 是 SAE 的核心——所有后续标量/元素运算建立在它之上。

**Commit / Confirm (SAE 两阶段)**：
[已学] WPA3 SAE 握手的两个阶段。<strong>Commit Exchange</strong>：双方互发 (scalar, element)，各自用私钥随机数 + PWE 算出共享秘密 → 派生 PMK。<strong>Confirm Exchange</strong>：双方互发一个 token（用刚算出的秘密签的 MAC），验证对方确实算出了同一个 PMK。Commit/Confirm 完成后<strong>双方都有 PMK</strong>，再走标准的 4-Way Handshake。

**Key Information field (密钥信息字段)**：
[已学] EAPOL-Key 帧里的 2 字节位域。关键 bit：Pairwise/Group（这帧是 PTK 还是 GTK 相关）、Install（要不要 install 到硬件）、Key ACK（AP 请求 STA 确认）、Key MIC（带不带 MIC）、Secure（握手进入"已加密"态）、Encrypted Key Data（Key Data 已加密）。<strong>Wireshark 解 EAPOL-Key 帧第一眼看这个字段</strong>。

**Replay Counter (重放计数器)**：
[已学] EAPOL-Key 帧里的 8 字节计数器，每对请求-响应递增。STA 收到 EAPOL-Key 帧时校验 Replay Counter——<strong>比上次小就丢弃</strong>，防攻击者重放旧握手帧（KRACK 攻击就是诱骗重放 M3 强制 nonce 重用）。是 4-Way Handshake 的反重放核心。

**KDE (Key Data Encapsulation, 密钥数据封装)**：
[已学] 4-Way Handshake M3 里 GTK 的封装格式。GTK 不是裸传的，而是装在 EAPOL-Key 帧的 Key Data 字段里，用 PTK 的 KEK 加密。接收方解密 Key Data 拆出 GTK。RSN-IE 也通过 Key Data 字段传（M2/M3），用于协商加密套件和防降级。

**H2E vs HNP (Hash-to-Element vs Hunting-and-Pecking)**：
[已学] SAE 派生 PWE 的两种方法。HNP（老）：循环哈希试值找到曲线上一点，<strong>迭代次数泄漏密码信息</strong>（Dragonblood 侧信道攻击的基础）。H2E（新）：确定性映射算法，不泄漏。<strong>WPA3 新固件应支持 H2E</strong>，老 HNP 保留向后兼容但建议迁移。

---

_后续课程每堂都会扩充本表。定义冲突或修正时，标注旧定义被哪条覆盖。_
