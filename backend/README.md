# Infinite Loop – AI Backend

## Architecture

```
Browser mic → (3-sec PCM chunks) → WebSocket → FastAPI backend
                                                 ├─ Acoustic Heuristics → voice_score (0-100)
                                                 ├─ Whisper STT → text → NLP → convo_score (0-100)
                                                 └─ AURA = (0.60 × voice) + (0.40 × convo)
Browser UI  ← JSON result ─────────────────────────────────────┘
```

## Quick Start (heuristic mode – no heavy ML)

```bash
cd backend
bash start.sh
```

Server runs at **http://localhost:8000**

## Full AI Mode (Whisper + librosa)

```bash
bash start.sh --full-ai
```

> ⚠ First run downloads the Whisper "base" model (~145 MB) and installs PyTorch.

## Endpoints

| Endpoint | Description |
|---|---|
| `GET /health` | Backend health check + capability flags |
| `GET /docs` | Swagger interactive API docs |
| `WS /ws/analyse` | Real-time PCM audio stream → AURA JSON |

## WebSocket Protocol

**Client → Server:** Raw `Int16Array` PCM bytes at 16 kHz mono (~3s chunks)

**Server → Client:** JSON payload:
```json
{
  "type": "analysis_result",
  "chunk": 1,
  "latency_ms": 24.3,
  "aura": {
    "aura_score": 88.0,
    "tier": "CRITICAL",
    "verdict": "Critical — Voice Cloning Detected. Session Severed.",
    "action": "BLOCK",
    "color": "#ef4444",
    "voice_score": 91.0,
    "convo_score": 82.0
  },
  "voice": {
    "score": 91.0,
    "signals": {
      "hf_energy_ratio": 0.0021,
      "spectral_flatness": 0.3812,
      "zcr_std": 0.0043
    }
  },
  "conversation": {
    "score": 82.0,
    "triggers": [
      {"keyword": "digital arrest", "weight": 30},
      {"keyword": "wire transfer", "weight": 18}
    ],
    "transcript": "this is a digital arrest warrant you must wire transfer..."
  },
  "session": {
    "chunks": 3,
    "avg_voice": 88.5,
    "avg_convo": 74.0,
    "elapsed_s": 9.1
  },
  "mode": "heuristic"
}
```

## AURA Score Formula

```
AURA = (0.60 × voice_score) + (0.40 × convo_score)
```

| Score | Tier | Action |
|---|---|---|
| 0 – 30 | LOW | PERMIT |
| 31 – 60 | MEDIUM | VERIFY |
| 61 – 80 | HIGH | ESCALATE |
| 81 – 100 | CRITICAL | BLOCK |

## Acoustic Signals (voice analysis)

| Signal | Description | Deepfake indicator |
|---|---|---|
| HF Energy Ratio | Energy >8 kHz vs speech band | Low ratio = neural vocoder rolloff |
| Spectral Flatness | Geometric/arithmetic mean of spectrum | High = synthesised flatness |
| ZCR Std Dev | Zero-crossing rate variance | Low = unnaturally uniform |
| Band Ratio | Mid-band vs high-band energy | Extreme = synthesised concentration |
| Silence Pattern | Ratio of silent frames | Too little = injection artefact |

## Conversation Signals (NLP)

Scam keyword lexicon with weighted scoring covering:
- **Legal impersonation**: "digital arrest", "cbi", "fir", "money laundering"
- **Financial coercion**: "wire transfer", "bitcoin", "gift card", "otp"
- **Emotional extortion**: "kidnapped", "ransom", "dying", "accident"
- **Urgency patterns**: "act now", "do not tell", "keep secret"
