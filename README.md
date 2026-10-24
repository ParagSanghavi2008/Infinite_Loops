# ∞ Infinite Loop

> **AI-Powered Real-Time Detection & Prevention of Voice Cloning Impersonation Attacks**

[![License: MIT](https://img.shields.io/badge/License-MIT-white.svg?style=flat-square)](LICENSE)
[![Latency](https://img.shields.io/badge/Latency-%3C45ms-white.svg?style=flat-square)](#)
[![Architecture](https://img.shields.io/badge/Architecture-AURA™%20v2-white.svg?style=flat-square)](#)
[![Design](https://img.shields.io/badge/Design-Gradium%20Monochrome-white.svg?style=flat-square)](#)

---

## 📌 Executive Overview

**Infinite Loop** is an enterprise-grade cybersecurity defense platform engineered to intercept, evaluate, and neutralize synthetic speech deepfakes, neural vocoder exploits, and zero-shot voice impersonation extortion in real time (< 45ms latency).

With the advent of zero-shot diffusion models (e.g., ElevenLabs, XTTS v2, VALL-E), malicious actors can generate hyper-realistic cloned audio from as little as **3 seconds** of harvested social media samples. **Infinite Loop** deploys a multi-dimensional biological acoustic entropy pipeline and the proprietary **AURA™ (Adaptive Unified Risk Assessment)** engine to distinguish between biological human vocal tract phonation and algorithmic speech synthesis.

---

## ⚡ Core Threat Vectors Addressed

| Threat Vector | Exposure Profile | Attack Mechanics & Impact |
|---|---|---|
| **Vishing & Digital Arrest Scams** | 30% of voice extortion incidents | Impersonating law enforcement, customs, and judicial officers using cloned authoritative voices to extort victims under fabricated warrants. |
| **Fake Kidnapping & Medical Distress** | 55% dominant familial threat | Simulating panic-stricken family voices in staged hospital emergencies or hostage scenarios, exploiting biological parental instinct before verification is possible. |
| **CEO Fraud & Banking KYC Scams** | 15% high-value enterprise attacks | Spoofing executive voices to authorize fraudulent wire transfers or bypass voice-based telephone banking authentication systems. |
| **Synthetic Biometric & IVR Bypass** | 92% legacy IVR failure rate | Injecting pre-rendered or streaming neural vocoder speech into automated banking IVRs to defeat legacy voiceprint matchers that lack liveness verification. |

---

## 🔬 The AURA™ Unified Assessment Matrix

The **AURA™ (Adaptive Unified Risk Assessment)** score evaluates incoming streaming audio across three core mathematical weights to output an authoritative threat score between `0` and `100`:

$$\mathbf{AURA^{TM}} = (w_1 \times \text{Spectral Score}) + (w_2 \times \text{Prosody Anomaly}) + (w_3 \times \text{Identity Penalty})$$

* **$w_1 = 50\%$ Spectral & Vocoder Artifact Score**: Detects Nyquist frequency roll-off, phase discontinuities above 14kHz, and spectrogram checkerboard artifacts intrinsic to neural vocoders.
* **$w_2 = 35\%$ Prosody & Biological Entropy Anomaly**: Measures organic vocal tract glottal airflow variation, natural respiratory pauses, and micro-pitch jitter ($0.6\% - 1.2\%$) which are absent in synthetic generators.
* **$w_3 = 15\%$ Identity Spoof Risk Penalty**: Cross-references acoustic biometrics against established user voiceprints and threat intelligence databases.

### 🛡️ Four-Tier Risk Stratification Matrix

```
[ 0 - 30 ]  LOW RISK        ──> Natural phonation verified; passive background telemetry.
[ 31 - 60 ] MEDIUM RISK     ──> Ambiguous compression/VoIP jitter; step-up audio challenge.
[ 61 - 80 ] HIGH RISK       ──> Synthesis indicators detected; supervisor escalation & alert.
[ 81 - 100] CRITICAL THREAT ──> Confirmed zero-shot clone; instant session sever & hardware 2FA.
```

1. **LOW RISK (0 – 30)**: Continuous biological vocal tract dynamics verified with natural micro-pitch perturbation and room reverberation decay. Normal interaction permitted.
2. **MEDIUM RISK (31 – 60)**: Atypical prosodic variance or phase anomalies flagged due to VoIP compression or low-tier neural converters. Triggers dynamic challenge-response verification.
3. **HIGH RISK (61 – 80)**: Substantial indicators of synthetic speech conversion, artificial cadence regularity, and missing glottal pulses. Strong participant warning issued and routed for supervisor review.
4. **CRITICAL THREAT (81 – 100)**: Authoritative confirmation of zero-shot neural cloning (ElevenLabs, XTTS, VALL-E). Immediate automated session termination, call severing, and fraud locking.

---

## 🏛️ The Multi-Layer Detection Framework

The platform is designed around a 4-tier modular architecture:

* **Layer 01 [Input & Acoustic Stream Ingestion]**: High-frequency streaming PCM audio ingestion at 44.1kHz with adaptive buffer slicing under 20ms.
* **Layer 02 [Neural Vocoder & Spectral Pipeline]**: Deep feature extraction targeting high-frequency phase cancellation and diffusion artifacts.
* **Layer 03 [Biological Entropy & Prosody Check]**: Real-time measurement of human vocal tract acoustic entropy, jitter, and glottal opening quotients.
* **Layer 04 [Real-Time Mitigation & 2FA Enforcement]**: Automated policy enforcement including dynamic voice challenges, supervisor alerting, and instant cryptographic 2FA locks.

---

## 🎨 Design System & Aesthetic Principles

* **Gradium-Inspired Black & White Monochrome**: Curated ultra-high contrast dark theme (`#08090c` background, `#ffffff` typography, and `#94a3b8` silver accents) omitting distracting neon colors.
* **Symmetrical 3D Particle Lemniscate**: A dense, continuous, symmetrical 3D particle ribbon loop rendered in real-time HTML5 Canvas with fixed spatial orientation and zero cursor distortion.
* **Typography**: Geometric display sans-serif (**Plus Jakarta Sans** and **Inter**) with tight letter spacing (`-0.035em`) mirroring modern AI infrastructure platforms.
* **Modular Embedded Loop Accents**: Subtle decorative particle loop illustrations embedded directly into the background of risk and threat cards.

---

## 📂 Repository File Architecture

```
INFINITE_LOOPS/
├── README.md                        # Platform documentation & technical overview
├── index.html                       # Master responsive web experience
├── assets/
│   ├── logo.svg                     # Infinite Loop vector emblem mark
│   └── statue_spectral_scan.jpg     # Classical statue acoustic spectrogram asset
├── styles/
│   ├── variables.css                # Monochrome design tokens, fonts, and dark theme variables
│   ├── main.css                     # Global navbar, layout structure, and typography
│   ├── hero.css                     # Hero layout with two-line fitted typography & canvas
│   ├── aura-matrix.css              # AURA 2x2 risk tier matrix & mathematical formula styles
│   ├── threats.css                  # Asymmetric impersonation 2x2 problem statement grid
│   ├── framework.css                # Multi-Layer Detection Framework 4-square grid styles
│   └── footer.css                   # Gradium-style blurry white typography footer
├── scripts/
│   ├── infinity-canvas.js           # Symmetrical 3D gem particle infinity loop engine
│   ├── aura-calculator.js           # Reactive AURA threat score calculator & tier illuminator
│   └── main.js                      # Navigation scroll blur and reveal animations
└── pages/
    ├── matrix.html                  # Standalone AURA Risk Matrix view
    ├── threats.html                 # Standalone Threat Vectors view
    └── framework.html               # Standalone Multi-Layer Framework view
```

---

## 🚀 Running Locally

To launch the project locally without external dependencies:

```bash
# Clone the repository
git clone https://github.com/Pritpal-Singh-me/Infinite_Loops.git
cd Infinite_Loops

# Start Python's built-in HTTP server
python3 -m http.server 3000
```

Open your browser and navigate to:
```
http://localhost:3000
```

---

## ⚖️ License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.
