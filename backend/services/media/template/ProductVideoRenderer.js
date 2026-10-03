import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { mkdtemp, writeFile, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import axios from "axios";
import { validateProductImage } from "../../campaigns/MercadoLivreProductResolver.js";

const run = promisify(execFile);
const font = fileURLToPath(new URL("../../../assets/fonts/DejaVuSans.ttf", import.meta.url));
function filterPath(path) { return path.replace(/\\/g, "/").replace(/:/g, "\\:").replace(/'/g, "\\'"); }
export function wrapVideoText(text, width = 22) {
  const words = String(text).replace(/[\x00-\x1f\x7f]/g, " ").replace(/\s+/g, " ").trim().slice(0, 160).match(new RegExp(`\\S{1,${width}}`, "g")) || [];
  const lines = []; let line = "";
  for (const word of words) {
    if (line && (line.length + word.length + 1) > width) { lines.push(line); line = ""; }
    line = line ? `${line} ${word}` : word;
  }
  if (line) lines.push(line);
  return lines.slice(0, 5).join("\n");
}
export async function getFfmpegPath() {
  if (process.env.FFMPEG_PATH) return process.env.FFMPEG_PATH;
  const { default: path } = await import("ffmpeg-static");
  if (!path) throw new Error("FFmpeg indisponivel neste servidor.");
  return path;
}
export async function renderProductVideo({ product, http = axios, ffmpegPath, runner = run, style = process.env.KAEL_PRODUCT_VIDEO_STYLE || "simple_v1" }) {
  if (style === "narrated_v2") {
    const { renderNarratedProductVideo } = await import("./NarratedProductVideoRenderer.js");
    return renderNarratedProductVideo({ product, http, ffmpegPath, runner });
  }
  if (style !== "simple_v1") throw new Error("Formato de video do KAEL desconhecido.");
  const binary = ffmpegPath || await getFfmpegPath();
  const dir = await mkdtemp(join(tmpdir(), "kael-video-"));
  try {
    let images = product.images.slice(0, 5);
    if (!images.length) throw new Error("Produto sem imagens para montar o video.");
    while (images.length < 3) images.push(images[images.length - 1]);
    const titleFile = join(dir, "title.txt");
    const ctaFile = join(dir, "cta.txt");
    await writeFile(titleFile, wrapVideoText(product.title), "utf8");
    await writeFile(ctaFile, "Confira os detalhes\nno link da campanha.\nConteudo de afiliado", "utf8");
    const segments = [];
    for (let index = 0; index < images.length; index++) {
      const url = validateProductImage(images[index]);
      const response = await http.get(url, { responseType: "arraybuffer", maxRedirects: 0,
        timeout: 20000, maxContentLength: 8 * 1024 * 1024 });
      if (!/^image\/(jpeg|png|webp)(?:;|$)/i.test(response.headers["content-type"] || "")) {
        throw new Error("Formato da imagem nao suportado.");
      }
      const input = join(dir, `image-${index}`);
      await writeFile(input, Buffer.from(response.data));
      const output = join(dir, `segment-${index}.mp4`);
      // 720p reduz o custo de CPU. Texto em arquivo evita interpretar texto como filtro/comando.
      const vf = [
        "scale=640:920:force_original_aspect_ratio=decrease",
        "pad=720:1280:(ow-iw)/2:(oh-ih)/2:color=0x101827",
        "zoompan=z='min(zoom+0.0007,1.045)':d=120:s=720x1280:fps=30",
        "drawbox=x=0:y=0:w=iw:h=220:color=0x101827:t=fill",
        `drawtext=fontfile='${filterPath(font)}':textfile='${filterPath(titleFile)}':expansion=none:fontsize=30:fontcolor=white:x=(w-text_w)/2:y=35`,
        "drawbox=x=0:y=1080:w=iw:h=200:color=0x101827:t=fill",
        `drawtext=fontfile='${filterPath(font)}':textfile='${filterPath(ctaFile)}':expansion=none:fontsize=28:fontcolor=white:x=(w-text_w)/2:y=1110`,
        "format=yuv420p",
      ].join(",");
      await runner(binary, ["-y", "-nostdin", "-hide_banner", "-loglevel", "error", "-i", input,
        "-vf", vf, "-t", "4", "-an", "-c:v", "libx264", "-preset", "ultrafast", "-crf", "25",
        "-threads", "1", "-filter_threads", "1", output], { timeout: 90000, maxBuffer: 1024 * 1024 });
      segments.push(`file 'segment-${index}.mp4'`);
    }
    const list = join(dir, "segments.txt");
    const result = join(dir, "product.mp4");
    await writeFile(list, segments.join("\n"));
    await runner(binary, ["-y", "-nostdin", "-hide_banner", "-loglevel", "error", "-f", "concat",
      "-safe", "1", "-i", list, "-c", "copy", "-movflags", "+faststart", result],
      { timeout: 30000, maxBuffer: 1024 * 1024 });
    const body = await readFile(result);
    if (!body.length || body.length > 40 * 1024 * 1024) throw new Error("Video fora do limite permitido.");
    return { body, contentType: "video/mp4", durationSeconds: images.length * 4 };
  } finally { await rm(dir, { recursive: true, force: true }); }
}
