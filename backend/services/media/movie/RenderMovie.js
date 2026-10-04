import axios from 'axios';
import { validateProductImage } from '../../campaigns/MercadoLivreProductResolver.js';
import { createR2StorageProvider } from '../storage/createR2StorageProvider.js';
import { movieConfig } from './MovieConfig.js';
import { prepareMovieScenes } from './MovieSceneService.js';
import { assertLocalVoiceInstalled } from '../narration/LocalProductNarrator.js';
import { composeMovie } from './MovieComposer.js';
export async function renderMovie({ task, product, ensureActive }) {
  if (!task) throw new Error('KAEL Movie exige uma tarefa persistida.');
  await assertLocalVoiceInstalled();
  const config = movieConfig();
  const storage = createR2StorageProvider();
  const onPhase = async phase => { task.moviePhase = phase; await task.save(); };
  const { clips } = await prepareMovieScenes({ task, product, config, ensureActive, onPhase,
    fetchImage: async value => {
      const response = await axios.get(validateProductImage(value), { responseType:'arraybuffer',maxRedirects:0,timeout:20000,maxContentLength:8*1024*1024 });
      const contentType = String(response.headers['content-type'] || '').split(';')[0];
      if (!/^image\/(jpeg|png|webp)$/.test(contentType)) throw new Error('Imagem de produto em formato não suportado.');
      return { body: Buffer.from(response.data), contentType };
    }, uploadClip: input => storage.upload(input) });
  await ensureActive?.(); await onPhase('Montando vídeo, narração e legendas');
  return composeMovie({ product, clips });
}
