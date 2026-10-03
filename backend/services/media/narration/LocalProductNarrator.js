import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { access, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
const run = promisify(execFile);
const backend = fileURLToPath(new URL("../../../", import.meta.url));
const driver = fileURLToPath(new URL("../../../scripts/synthesize-product-voice.py", import.meta.url));
export async function narrateProductScenes({ scenes, directory, runner = run,
  pythonPath = process.env.KAEL_PIPER_PYTHON || join(backend, ".kael-runtime", "venv", "bin", "python"),
  modelPath = process.env.KAEL_PIPER_MODEL || join(backend, ".kael-runtime", "voice", "pt_BR-jeff-medium.onnx") }) {
  if (!Array.isArray(scenes) || !scenes.length || scenes.length > 6 || scenes.some(scene => !scene.speech || scene.speech.length > 400)) throw new Error("Roteiro de narracao invalido.");
  try { await access(pythonPath); await access(modelPath); await access(`${modelPath}.json`); }
  catch { throw new Error("Voz local do KAEL nao instalada. Execute a configuracao de narracao no servidor."); }
  const input = join(directory, "voice-input.json");
  await writeFile(input, JSON.stringify({ texts: scenes.map(scene => scene.speech) }), "utf8");
  try {
    await runner(pythonPath, [driver, modelPath, input, directory], { timeout: 120000, maxBuffer: 1024 * 1024, env: { ...process.env, OMP_NUM_THREADS: "1" } });
  } catch { throw new Error("Falha ao gerar narracao local do KAEL. Nenhum video silencioso foi marcado como pronto."); }
  const manifest = JSON.parse(await readFile(join(directory, "voice-manifest.json"), "utf8"));
  if (!Array.isArray(manifest) || manifest.length !== scenes.length) throw new Error("Narracao incompleta.");
  return manifest.map((entry, index) => {
    if (entry.file !== `voice-${index}.wav` || !Number.isFinite(entry.durationSeconds) || entry.durationSeconds < 0.2 || entry.durationSeconds > 16) throw new Error("Manifesto de narracao invalido.");
    return { path: join(directory, entry.file), durationSeconds: entry.durationSeconds };
  });
}
