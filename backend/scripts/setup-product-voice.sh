#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
runtime_dir="$PWD/.kael-runtime"
mkdir -p "$runtime_dir/voice"
python3 -m venv "$runtime_dir/venv"
"$runtime_dir/venv/bin/python" -m pip install 'piper-tts==1.3.0'
"$runtime_dir/venv/bin/python" - "$runtime_dir/voice" <<'PY'
import hashlib
import os
import sys
import urllib.request
from pathlib import Path
root = Path(sys.argv[1])
base = "https://huggingface.co/rhasspy/piper-voices/resolve/main/pt/pt_BR/jeff/medium/"
files = {
    "pt_BR-jeff-medium.onnx": "3a6f4c46355813c2b7bbc4d16b6d13d60ed72074b952a393baace82a7d0c94b5",
    "pt_BR-jeff-medium.onnx.json": "7bf8145b572b36806f5ce0f1d3322b6711975bc7d0473e8d36fced4a9ec0030d",
}
for name, expected in files.items():
    destination = root / name
    if destination.exists() and hashlib.sha256(destination.read_bytes()).hexdigest() == expected:
        continue
    temporary = root / (name + ".download")
    try:
        with urllib.request.urlopen(base + name, timeout=120) as response, temporary.open("wb") as output:
            total = 0
            while chunk := response.read(1024 * 1024):
                total += len(chunk)
                if total > 80 * 1024 * 1024:
                    raise RuntimeError("Voice download exceeded permitted size")
                output.write(chunk)
        if hashlib.sha256(temporary.read_bytes()).hexdigest() != expected:
            raise RuntimeError("Voice checksum mismatch: review the upstream version before updating")
        os.replace(temporary, destination)
    finally:
        temporary.unlink(missing_ok=True)
print("Voz local pt_BR instalada e verificada.")
PY
