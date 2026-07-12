# 翻译规范确立 + GLOSSARY.md 大幅扩充

**Status**: active

## 学到的

学员反馈：「专业英文术语的边上能不能加上中文翻译」。

这是合理且重要的可读性需求 —— 中英混合课程里，纯英文术语对学习者是认知负担。确立了翻译规范：

**规范**：每个专业英文术语在**每节课首次出现**时，内联写成 `English Term (中文翻译)`。中文翻译**严格对齐 GLOSSARY.md**，保证跨课一致。只在首次出现时加，之后用英文。纯物理单位（μs、MHz、dBm、dB 等）不翻译。

## 已执行的改动

1. **GLOSSARY.md 大幅扩充**：新增 18 个术语（QAM、BPSK、MCS、RSSI、PAPR、ICI、ISI、EVM、FDM、GFSK、connection event、piconet、master/slave、RTS/CTS、ACK、QoS、EDCA、LoRa、spreading factor）。这些是课程实际用到但之前缺词条的。
2. **5 节课全部加注翻译**：
   - 第 1 课：+5 术语（connection event、master、QoS、GFSK、RTS/CTS）
   - 第 2 课：+6 术语（QAM、GFSK、MCS、Doppler、FFT、EVM）
   - 第 3 课：+4 术语（PER、MCS、BPSK、QAM）
   - 第 4 课：上一轮已基本完成（SNR、OFDM、FSPL、PER）
   - 第 5 课：+8 术语（ACK、CWmin、CTS、PIFS、EIFS、AIFS、CWmax、RTS）
3. **NOTES.md 记录规范**：后续课程设计必须遵守。

## 为什么对后续教学重要

1. **可读性提升**：学员不用在课程和 GLOSSARY.md 之间来回切换查术语。每个术语首次出现即见翻译。
2. **GLOSSARY.md 成为唯一真相源**：所有翻译以 GLOSSARY 为准，跨课一致。新术语必须先入 GLOSSARY 再用于课程。
3. **未来课程设计标准**：写新课前，先确认术语是否在 GLOSSARY，没有就先补；写课时首次出现加注翻译。

## Implications

- ✅ <strong>规则确立</strong>：后续所有课程遵守「首次出现加注翻译」规范。
- ✅ <strong>解锁</strong>：GLOSSARY.md 现已覆盖 5 节课用到的全部术语，可作为权威翻译源。
- ⚠️ <strong>维护</strong>：每节新课若引入新术语，必须同步更新 GLOSSARY.md。

## Evidence

学员原话：「专业英文术语的边上能不能加上中文翻译」。执行过程中发现 GLOSSARY.md 缺词条（MCS、QAM、RSSI、RTS/CTS 等常用术语都缺），先补 GLOSSARY 再补课程，保证了翻译一致性。
