import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { mkdtemp, writeFile, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import axios from "axios";
import { validateProductImage } from "../../campaigns/MercadoLivreProductResolver.js";
import { buildProductAdScript } from "./ProductAdScript.js";
import { narrateProductScenes } from "../narration/LocalProductNarrator.js";
import { getFfmpegPath, wrapVideoText } from "./ProductVideoRenderer.js";
const run = promisify(execFile);
const font = fileURLToPath(new URL("../../../assets/fonts/DejaVuSans.ttf", import.meta.url));
const escaped = path => path.replace(/\\/g, "/").replace(/:/g, "\\:").replace(/'/g, "\\'");
function text(file, size, x, y, color = "white") {
  return `drawtext=fontfile='${escaped(font)}':textfile='${escaped(file)}':expansion=none:fontsize=${size}:fontcolor=${color}:x=${x}:y=${y}:line_spacing=10`;
}
// An original quiet instrumental bed, generated from tones without external music files.
export function createProductMusic(seconds = 8) {
  const rate = 22050, samples = Math.floor(seconds * rate), body = Buffer.alloc(44 + samples * 2);
  body.write("RIFF", 0); body.writeUInt32LE(body.length - 8, 4); body.write("WAVEfmt ", 8);
  body.writeUInt32LE(16, 16); body.writeUInt16LE(1, 20); body.writeUInt16LE(1, 22);
  body.writeUInt32LE(rate, 24); body.writeUInt32LE(rate * 2, 28); body.writeUInt16LE(2, 32); body.writeUInt16LE(16, 34);
  body.write("data", 36); body.writeUInt32LE(samples * 2, 40);
  const chords = [[130.81, 164.81, 196], [110, 130.81, 164.81], [87.31, 110, 130.81], [98, 123.47, 146.83]];
  for (let n = 0; n < samples; n++) {
    const t = n / rate, beat = t % .5, chord = chords[Math.floor(t / 2) % 4];
    const pad = chord.reduce((sum, hz) => sum + Math.sin(2 * Math.PI * hz * t), 0) / 3;
    const bell = Math.sin(2 * Math.PI * chord[Math.floor(t * 2) % 3] * 4 * t) * Math.exp(-beat * 12);
    const envelope = Math.min(1, t / .2, (seconds - t) / .2);
    body.writeInt16LE(Math.round((pad * .11 + bell * .05) * envelope * 32767), 44 + n * 2);
  }
  return body;
}
export async function renderNarratedProductVideo({ product, http = axios, ffmpegPath, runner = run, narrator = narrateProductScenes }) {
  const script = buildProductAdScript(product), binary = ffmpegPath || await getFfmpegPath();
  const directory = await mkdtemp(join(tmpdir(), "kael-ad-"));
  try {
    const voices = await narrator({ scenes: script.scenes, directory });
    const downloads = new Map(), segments = [];
    const brand = join(directory, "brand.txt"), footer = join(directory, "footer.txt");
    await writeFile(brand, "KAEL  /  AFILIADOS PRO");
    await writeFile(footer, "CONTEÚDO DE AFILIADO");
    let durationSeconds = 0;
    for (let i = 0; i < script.scenes.length; i++) {
      const scene = script.scenes[i], url = validateProductImage(product.images[scene.imageIndex]);
      if (!downloads.has(url)) {
        const response = await http.get(url, { responseType: "arraybuffer", maxRedirects: 0, timeout: 20000, maxContentLength: 8 * 1024 * 1024 });
        if (!/^image\/(jpeg|png|webp)(?:;|$)/i.test(response.headers["content-type"] || "")) throw new Error("Formato da imagem nao suportado.");
        const image = join(directory, `image-${downloads.size}`); await writeFile(image, Buffer.from(response.data)); downloads.set(url, image);
      }
      const headline = join(directory, `headline-${i}.txt`), detail = join(directory, `detail-${i}.txt`), count = join(directory, `count-${i}.txt`);
      await writeFile(headline, wrapVideoText(scene.headline, 24));
      await writeFile(detail, wrapVideoText(scene.detail, 34).split("\n").slice(0, 3).join("\n"));
      await writeFile(count, `0${i + 1} / 04`);
      const duration = Math.max(4, voices[i].durationSeconds + .65), frames = Math.ceil(duration * 30);
      durationSeconds += duration;
      const closing = scene.layout === "closing", panelY = closing ? 430 : 360, panelH = closing ? 420 : 540;
      const zoom = scene.layout === "detail" ? "min(1.28+on*0.00012,1.32)" : scene.layout === "showcase" ? "min(1.40+on*0.00012,1.44)" : "min(1+on*0.00012,1.018)";
      const focusY = scene.layout === "detail" ? "0" : scene.layout === "showcase" ? "ih-ih/zoom" : "ih/2-ih/zoom/2";
      const filters = [
        `[0:v]scale=588:${panelH}:force_original_aspect_ratio=decrease,pad=600:${panelH + 12}:(ow-iw)/2:(oh-ih)/2:color=white,zoompan=z='${zoom}':x='iw/2-iw/zoom/2':y='${focusY}':d=${frames}:s=600x${panelH + 12}:fps=30[picture]`,
        `color=c=0x101827:s=720x1280:r=30:d=${duration}[background]`,
        `[background][picture]overlay=x=42:y=${panelY}:shortest=1,drawbox=x=42:y=105:w=78:h=5:color=0x50E3C2:t=fill,${text(brand, 18, 42, 65, "0xC9D2E5")},${text(count, 16, 542, 65, "0xC9D2E5")},${text(headline, 42, 42, 155)},${text(detail, 24, 42, 275, "0xB4C0D4")},drawbox=x=42:y=954:w=600:h=70:color=0x7357DB:t=fill,${text(join(directory, "cta.txt"), 26, 68, 976)},${text(footer, 16, 42, 1070, "0xAAB7CC")},fade=t=in:st=0:d=0.18,fade=t=out:st=${duration - .18}:d=0.18,format=yuv420p[video]`,
        `[1:a]adelay=100:all=1,apad,loudnorm=I=-16:TP=-1.5:LRA=7[audio]`
      ].join(";");
      await writeFile(join(directory, "cta.txt"), closing ? "CONFIRA NO LINK DA CAMPANHA" : "VEJA OS DETALHES DO PRODUTO");
      await runner(binary, ["-y", "-nostdin", "-hide_banner", "-loglevel", "error", "-i", downloads.get(url), "-i", voices[i].path, "-filter_complex_threads", "1", "-filter_complex", filters, "-map", "[video]", "-map", "[audio]", "-t", String(duration), "-c:v", "libx264", "-preset", "veryfast", "-crf", "23", "-threads", "1", "-c:a", "aac", "-ar", "44100", "-ac", "2", join(directory, `scene-${i}.mp4`)], { timeout: 120000, maxBuffer: 1024 * 1024 });
      segments.push(`file 'scene-${i}.mp4'`);
    }
    const list = join(directory, "scenes.txt"), music = join(directory, "music.wav"), result = join(directory, "product.mp4");
    await writeFile(list, segments.join("\n")); await writeFile(music, createProductMusic());
    await runner(binary, ["-y", "-nostdin", "-hide_banner", "-loglevel", "error", "-f", "concat", "-safe", "1", "-i", list, "-stream_loop", "-1", "-i", music, "-filter_complex_threads", "1", "-filter_complex", "[1:a]volume=0.23[music];[0:a][music]amix=inputs=2:duration=first:normalize=0,alimiter=limit=0.95[audio]", "-map", "0:v", "-map", "[audio]", "-c:v", "copy", "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart", result], { timeout: 60000, maxBuffer: 1024 * 1024 });
    const body = await readFile(result);
    if (!body.length || body.length > 40 * 1024 * 1024) throw new Error("Video fora do limite permitido.");
    return { body, contentType: "video/mp4", durationSeconds, caption: script.caption };
  } finally { await rm(directory, { recursive: true, force: true }); }
}
