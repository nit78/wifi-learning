# 先验知识：学员是嵌入式蓝牙固件工程师

**Status**: active

## 学到的

学员在首次访谈中披露的核心背景，用于判定 zone of proximal development：

- **职业背景**：嵌入式蓝牙（Bluetooth，含 BLE + Classic）固件工程师。
  → 推断熟悉：协议栈分层（Host / Controller）、Link Layer、connection event、piconet、GFSK、FHSS、调度式 TDMA、SoC 层开发（驱动 / 移植 / 调试）。
- **目标转型**：嵌入式 / 固件 WiFi 工程师（不是企业级 WLAN 运维、不是协议芯片底层研发）。
- **学习偏好**：
  - 不考证，纯学知识（CWNA-108 已停考，用 108 版书作骨架）。
  - 中英混合讲解。
  - 每天投入较多时间（约 1 小时/日），稳定每日节奏。

## 为什么这对后续教学重要

1. **嵌入式能力已具备**：PHY/MAC 实现细节、驱动架构、SoC 调试 —— 这些不需补。要补的是<strong>WiFi 协议域知识 + RF 域知识</strong>。
2. **可用 BT 做桥梁**：FHSS↔OFDM、TDMA↔CSMA/CA、piconet↔BSS、connection event↔backoff。教学应反复调用 BT 知识作锚点，而非零基础教。
3. **章节重排依据**：CWNA 是管理员视角（部署/勘测/运维重）。对固件学员应<strong>固件优先级前置</strong>：RF → PHY/MAC → 介质访问 → 标准 → 其余作背景。已在 MISSION.md / NOTES.md 落定。
4. **数学容忍度待标定**：RF 章节会涉及 dBm / dB / 复数 / 傅里叶直觉。学员的数学底子尚未确认，进入第 2 课（RF 基础）前需观察反应，必要时补直觉性铺垫。

## Implications（解锁 / 排除）

- ✅ <strong>解锁</strong>：第一课可以直接用 BT↔WiFi 范式对比切入（已落实为 `lessons/0001-why-wifi-isnt-faster-bluetooth.html`），不必讲「什么是无线通信」。
- ✅ <strong>解锁</strong>：术语表可大胆假设 FHSS / TDMA / piconet / GFSK 已知，直接用作解释锚点。
- ⚠️ <strong>待澄清</strong>：学员具体在 BT 哪颗 SoC、host 还是 controller 层、是否接触过 WiFi SoC（ESP32 / Realtek / MTK / 高通）。下一课开始前或学员提问时进一步探明。
- ❌ <strong>排除</strong>：不要花课时讲嵌入式基础概念（SoC、中断、DMA、驱动框架）—— 已是已知区。

## Evidence

学员在四问访谈中明确选择：「嵌入式/固件 WiFi」方向 + 「不考证，只学知识」 + 「中英混合」 + 「每天较多」 —— 这四项直接锚定了教学骨架与节奏。
