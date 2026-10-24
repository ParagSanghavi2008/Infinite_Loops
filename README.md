# 🛡️ Infinite Loops

An AI-powered web app that detects possible **voice-cloning scam attempts** during live or near-real-time conversations, gives an **explainable risk score**, and warns users *before* they trust suspicious instructions or approve sensitive actions.

## Problem
AI can clone a person's voice from just a few seconds of audio. Scammers use this to pose as a boss, family member, or bank officer and pressure victims into sending money or sharing OTPs.

## How it works
1. **Listens** to the conversation through the microphone in short 2-3 second chunks.
2. **Checks the voice** using a pretrained deepfake-voice detection model.
3. **Checks the words** (speech-to-text + scam-language rules) for urgency, money requests, OTP requests, and secrecy.
4. **Combines the signals** into a single risk score (0-100) with plain-language reasons.
5. **Warns the user** with a live risk meter and a "pause and verify" alert.

## Features
- Live risk meter (green / yellow / red)
- Explainable score: shows *why* a call looks risky
- Voice-based and language-based detection together
- Warning before sensitive actions

## Tech Stack


## Limitations
- Works through the browser microphone, not direct phone-call access (phones block this)
- Pretrained detectors may miss voices from newer cloning tools
- Risk score is a warning aid, not a final verdict

## Future Work
Mobile app integration, speaker verification against trusted contacts, multi-language support