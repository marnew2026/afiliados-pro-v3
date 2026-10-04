import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdtemp, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildPhraseCaptions } from '../template/ProductAdScript.js';
import { narrateProductScenes } from '../narration/LocalProductNarrator.js';
import { getFfmpegPath, wrapVideoText } from '../template/ProductVideoRenderer.js';
import { createProductMusic } from '../template/NarratedProductVideoRenderer.js';
import { buildMovieAdScript, movieShot } from './MovieAdScript.js';
const run = promisify(execFile);
const font = fileURLToPath(new URL('../../../assets/fonts/DejaVuSans.ttf', import.meta.url));
const escaped = v => v.replace(/\\/g, '/').replace(/:/g, '\\:').replace(/'/g, "\\'");
const draw = (file, size, y) => `drawtext=fontfile='${escaped(font)}':textfile='${escaped(file)}':expansion=none:fontsize=${size}:fontcolor=white:x=(w-text_w)/2:y=${y}:box=1:boxcolor=black@0.5:boxborderw=10`;
export async function composeMovie({ product, clips, narrator = narrateProductScenes, runner = run, ffmpegPath }) {
  if (!Array.isArray(clips) || !clips.length || clips.length > 4 || clips.some(v => !Buffer.isBuffer(v))) throw new Error('Cenas de IA incompletas.');
  const directory = await mkdtemp(join(tmpdir(), 'kael-movie-'));
  try {
    const script = buildMovieAdScript(product);
    const voices = await narrator({ scenes: script.scenes, directory, pacing: { lengthScale: .97 } });
    if (voices.length !== script.scenes.length) throw new Error('Narração incompleta.');
    const binary = ffmpegPath || await getFfmpegPath();
    for (const [i, clip] of clips.entries()) await writeFile(join(directory, `clip-${i}.mp4`), clip);
    const disclosure = join(directory, 'disclosure.txt'); await writeFile(disclosure, 'CENAS COM IA • CONTEÚDO DE AFILIADO');
    const cta = join(directory, 'cta.txt'); await writeFile(cta, 'Confira o produto no link da campanha');
    const files = []; let durationSeconds = 0;
    for (const [i, scene] of script.scenes.entries()) {
      const duration = Math.max(3.2, voices[i].durationSeconds + .25); durationSeconds += duration;
      const shot = movieShot(i, clips.length);
      const captions = [];
      for (const [n, phrase] of buildPhraseCaptions(scene.speech, voices[i].durationSeconds).entries()) {
        const path = join(directory, `caption-${i}-${n}.txt`); await writeFile(path, wrapVideoText(phrase.text, 35));
        captions.push(`${draw(path, 32, 1000)}:enable='between(t,${phrase.start},${phrase.end})'`);
      }
      // Planos gerais preservam o conjunto; cortes intermediários aproximam a referência.
      const vf = `[0:v]fps=30,split=2[bg][fg];[bg]scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280,boxblur=24:2[back];[fg]scale=${shot.scale}:${shot.height}:force_original_aspect_ratio=decrease,setsar=1[front];[back][front]overlay=${shot.x}:${shot.y},${draw(disclosure, 16, 85)},${captions.join(',')}${i === 3 ? ',' + draw(cta, 25, 1125) : ''},format=yuv420p[v];[1:a]highpass=f=70,apad,loudnorm=I=-16:TP=-1.5:LRA=7[a]`;
      await runner(binary, ['-y','-nostdin','-hide_banner','-loglevel','error','-stream_loop','-1','-ss',String(shot.start),'-i',join(directory,`clip-${shot.clipIndex}.mp4`),'-i',voices[i].path,
        '-filter_complex_threads','1','-filter_complex',vf,'-map','[v]','-map','[a]','-t',String(duration),'-c:v','libx264','-preset','veryfast','-crf','22','-threads','1','-c:a','aac','-ar','44100','-ac','2',join(directory,`scene-${i}.mp4`)], { timeout: 120000, maxBuffer: 1024 * 1024 });
      files.push(`file 'scene-${i}.mp4'`);
    }
    await writeFile(join(directory,'list.txt'),files.join('\n')); await writeFile(join(directory,'music.wav'),createProductMusic());
    const output = join(directory,'movie.mp4');
    await runner(binary,['-y','-nostdin','-hide_banner','-loglevel','error','-f','concat','-safe','1','-i',join(directory,'list.txt'),'-stream_loop','-1','-i',join(directory,'music.wav'),'-filter_complex_threads','1','-filter_complex','[1:a]volume=0.18[m];[0:a][m]amix=inputs=2:duration=first:normalize=0,alimiter=limit=0.95[a]','-map','0:v','-map','[a]','-c:v','copy','-c:a','aac','-b:a','128k','-movflags','+faststart',output],{timeout:60000,maxBuffer:1024*1024});
    const body = await readFile(output);
    if (!body.length || body.length > 40*1024*1024) throw new Error('Vídeo excede o limite de armazenamento.');
    return { body, durationSeconds, contentType:'video/mp4', caption: script.caption + ' Cenas produzidas com IA.' };
  } finally { await rm(directory,{recursive:true,force:true}); }
}
