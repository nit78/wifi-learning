# WPA3 PMK 不可复算 — 学员常见误区补正

学员在第 10 课后提出关键质疑："如果还是走四次握手，那 PMK 不还是可以算出来？这次会话的数据不还是能被解码吗？"

## 误区根源

学员（合理地）假设："STA 和 AP 能算出 PMK，抓到交换过程的攻击者也能算出来。"
- 这个假设在 **WPA2-PSK 里成立**：PMK = PBKDF2(密码, SSID)，完全确定，抓包后可离线复算验证。
- 这个假设在 **WPA3-SAE 里不成立**：PMK = f(PWE, STA随机私钥, AP随机私钥)，两个随机私钥一次性、用完即弃、从不在空中明文传。

## 核心解释

- 空中传的 SAE Commit 只含 scalar/element（随机私钥的运算结果），不是随机私钥本身。
- 从 element 反推随机私钥 = 解椭圆曲线离散对数（ECDLP），目前不可行。
- 所以攻击者算不出 PMK → 算不出 PTK → 解不了 CCMP。
- 这就是 Diffie-Hellman 思路（SAE = PAKE，BLE 配对用的 ECDH 同源）。
- 前向保密：密码事后泄露，也复算不出当时 PMK（随机私钥已销毁）。

## 修正动作

1. 在第 10 课（lessons/0010-wpa2-wpa3-implementation-4way-details.html）新增「常见误区」框，放在"SAE PMK 派生"和"四次握手"之间。
2. GLOSSARY.md 新增 **Forward Secrecy (前向保密)** 词条。
3. 明确点出："差别在 PMK 派生方式，不在四次握手本身。"

## Implications

- 这是个高价值误区，第 9/10 课原本没讲透 PMK 的"不可复算性"，学员主动提问暴露了盲点。
- 教训：安全课里"PMK 怎么来的"必须讲清楚可复算 vs 一次性随机，不能只讲"PMK 不在空中传"。
- 下一课继续 MAC 主线（QoS/EDCA），除非学员继续追问安全。
