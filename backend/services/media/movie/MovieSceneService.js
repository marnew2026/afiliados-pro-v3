import { movieConfig, requireMovieEngine } from './MovieConfig.js';
import { planMovie } from './MovieDirector.js';
import { MovieError, downloadMovie } from './MovieHttp.js';
import { HuggingFaceWanEngine } from './HuggingFaceWanEngine.js';
import { RunwayMovieEngine } from './RunwayMovieEngine.js';
export async function prepareMovieScenes({ task, product, config = movieConfig(), engine,
  fetchImage, uploadClip, fetchClip = downloadMovie, ensureActive = async () => {}, onPhase = async () => {} }) {
  requireMovieEngine(config);
  engine ||= config.provider === 'hf_wan' ? new HuggingFaceWanEngine(config) : new RunwayMovieEngine(config);
  // Cada tarefa fixa motor/plano. Alterar a configuração não mistura resultados de dois motores.
  if (!task.movie?.plan) {
    task.movie = { provider: config.provider, origin: config.origin, plan: planMovie(product, config.sceneCount), scenes: [] };
    task.markModified?.('movie'); await task.save();
  }
  const movie = task.movie;
  if (movie.provider !== config.provider || movie.origin !== config.origin) throw new MovieError('O motor desta tarefa mudou. Restaure a configuração original para retomá-la.');
  if (config.provider === 'runway' && movie.plan.scenes.length > Number(process.env.KAEL_MOVIE_PAID_SCENE_LIMIT || 1)) {
    throw new MovieError('O plano salvo excede o limite de cenas pagas. Nenhuma nova cena foi solicitada.');
  }
  const origins = config.provider === 'hf_wan' ? [config.origin] : String(process.env.KAEL_MOVIE_RUNWAY_OUTPUT_ORIGINS || '').split(',').map(v => v.trim()).filter(Boolean);
  if (config.provider === 'runway' && !origins.length) throw new MovieError('Configure as origens de saída da Runway antes de autorizar geração paga.');
  const save = async () => { task.markModified?.('movie'); await task.save(); };
  const clips = [];
  for (const scene of movie.plan.scenes) {
    await ensureActive();
    let row = movie.scenes[scene.index];
    if (!row) { row = { index: scene.index, state: 'pending' }; movie.scenes[scene.index] = row; await save(); }
    if (row.assetUrl) { clips.push(await fetchClip(row.assetUrl, [new URL(process.env.R2_PUBLIC_BASE_URL).origin])); continue; }
    if (row.state === 'submitting' && !row.externalId) throw new MovieError('A solicitação anterior pode ter sido aceita pelo motor. Confira o provedor antes de reenviar; geração duplicada foi bloqueada.', 'UNCERTAIN');
    if (!row.externalId) {
      const image = await fetchImage(scene.imageUrl);
      await onPhase(`Gerando cena ${scene.index + 1} de ${movie.plan.scenes.length}`);
      row.state = 'submitting'; await save();
      // Sem repetição automática de POST: protege cota e cobrança quando a resposta se perde.
      try { row.externalId = await engine.start(scene, image.body, image.contentType); }
      catch (error) {
        if (error.code === 'QUOTA') { row.state = 'pending'; await save(); }
        if (error instanceof MovieError) throw error;
        throw new MovieError('Falha ao iniciar a cena. Confira o provedor antes de reenviar.', 'UNCERTAIN');
      }
      row.state = 'generating'; await save();
    }
    let url = row.outputUrl;
    if (!url) {
      try { url = await engine.retrieve(row.externalId); }
      catch (error) {
        if (error.code === 'QUOTA' || error.code === 'SCENE_FAILED') {
          row.state = 'pending'; row.externalId = null; await save();
        }
        throw error;
      }
      row.outputUrl = url; row.state = 'generated'; await save();
    }
    const body = await fetchClip(url, origins);
    const stored = await uploadClip({ key: `kael-movie/${task.userId}/${task._id}/scene-${scene.index}.mp4`, body, contentType: 'video/mp4' });
    row.assetUrl = stored.assetUrl; row.state = 'ready'; await save(); clips.push(body);
  }
  return { clips, plan: movie.plan };
}
