"""Run a locally installed Piper model; inputs and outputs stay in the job directory."""
import json
import sys
import wave
from pathlib import Path
import onnxruntime
from piper import PiperVoice, SynthesisConfig
from piper.config import PiperConfig

model, job_path, output_dir = map(Path, sys.argv[1:4])
job = json.loads(job_path.read_text(encoding="utf-8"))
texts = job.get("texts", [])
if not 1 <= len(texts) <= 6 or any(not isinstance(t, str) or not t.strip() or len(t) > 400 for t in texts):
    raise ValueError("Invalid narration input")
config_data = json.loads(Path(str(model) + ".json").read_text(encoding="utf-8"))
if config_data.get("language", {}).get("code") != "pt_BR":
    raise ValueError("Configure a Portuguese Brazil voice model")
options = onnxruntime.SessionOptions()
options.intra_op_num_threads = 1
options.inter_op_num_threads = 1
voice = PiperVoice(config=PiperConfig.from_dict(config_data), session=onnxruntime.InferenceSession(str(model), sess_options=options, providers=["CPUExecutionProvider"]))
manifest = []
for index, text in enumerate(texts):
    path = output_dir / f"voice-{index}.wav"
    with wave.open(str(path), "wb") as output:
        voice.synthesize_wav(text, output, syn_config=SynthesisConfig(length_scale=1.02))
    with wave.open(str(path), "rb") as output:
        duration = output.getnframes() / output.getframerate()
    if not 0.2 <= duration <= 16:
        raise ValueError("Narration duration outside permitted limits")
    manifest.append({"file": path.name, "durationSeconds": duration})
(output_dir / "voice-manifest.json").write_text(json.dumps(manifest), encoding="utf-8")
