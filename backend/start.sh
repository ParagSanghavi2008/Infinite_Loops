#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# Infinite Loop – Backend Startup Script
# ─────────────────────────────────────────────────────────────────────────────
# Usage: bash start.sh
# ─────────────────────────────────────────────────────────────────────────────

set -e

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

VENV_DIR="$SCRIPT_DIR/venv"

echo "────────────────────────────────────────────────────────────"
echo "  ∞  Infinite Loop – Voice Cloning Detection Backend"
echo "────────────────────────────────────────────────────────────"

# 1. Create venv if missing
if [ ! -d "$VENV_DIR" ]; then
  echo "→ Creating Python virtual environment..."
  python3 -m venv "$VENV_DIR"
fi

# 2. Activate venv
source "$VENV_DIR/bin/activate"

# 3. Install / upgrade core deps (fast, skip heavy ML by default)
echo "→ Installing core dependencies (fastapi, uvicorn, websockets, numpy, scipy)..."
pip install --quiet --upgrade \
  fastapi \
  "uvicorn[standard]" \
  websockets \
  numpy \
  scipy \
  aiofiles \
  python-multipart

# 4. Optional heavy ML – install only if --full-ai flag is passed
if [[ "$1" == "--full-ai" ]]; then
  echo "→ Installing full AI stack (librosa, whisper, torch)..."
  echo "   ⚠  This may take several minutes on first run."
  pip install --quiet librosa openai-whisper torch torchaudio
fi

# 5. Launch server
echo ""
echo "  ✓ Backend running at:  http://localhost:8000"
echo "  ✓ API docs:            http://localhost:8000/docs"
echo "  ✓ WebSocket endpoint:  ws://localhost:8000/ws/analyse"
echo "  ✓ Health check:        http://localhost:8000/health"
echo ""
echo "  Mode: $([ "$1" == "--full-ai" ] && echo "Full AI (Whisper + librosa)" || echo "Heuristic-only (fast)")"
echo ""
echo "  Press Ctrl+C to stop."
echo "────────────────────────────────────────────────────────────"

uvicorn main:app --host 0.0.0.0 --port 8000 --reload
