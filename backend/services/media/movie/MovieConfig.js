export function movieConfig(env = process.env) {
  const provider = env.KAEL_MOVIE_PROVIDER || 'hf_wan';
  if (!['hf_wan', 'runway'].includes(provider)) throw new Error('Motor de vídeo desconhecido.');
  const enabled = env.KAEL_MOVIE_ENABLED === 'true';
  const paidAllowed = env.KAEL_MOVIE_ALLOW_PAID === 'true';
  const token = provider === 'hf_wan' ? env.KAEL_MOVIE_HF_TOKEN : env.RUNWAYML_API_SECRET;
  let origin = env.KAEL_MOVIE_HF_URL || 'https://zerogpu-aoti-wan2-2-fp8da-aoti-faster.hf.space';
  const url = new URL(origin);
  if (url.protocol !== 'https:' || url.username || url.password || url.port || url.pathname !== '/' || url.search || url.hash || !url.hostname.endsWith('.hf.space')) {
    throw new Error('O motor Wan deve usar a origem HTTPS de um Space Hugging Face.');
  }
  origin = url.origin;
  const sceneCount = Number(env.KAEL_MOVIE_SCENES || 2);
  if (![1, 2, 3, 4].includes(sceneCount)) throw new Error('Configure de 1 a 4 cenas de IA por vídeo.');
  if (provider === 'runway' && sceneCount > Number(env.KAEL_MOVIE_PAID_SCENE_LIMIT || 1)) throw new Error('Quantidade de cenas excede o limite pago configurado.');
  return { enabled, provider, paidAllowed, token: String(token || '').trim(), origin, sceneCount,
    apiName: 'generate_video', duration: 5, steps: 4 };
}
export function requireMovieEngine(config) {
  if (!config.enabled) throw new Error('KAEL Movie desativado. Ative o motor no servidor para gerar cenas.');
  if (config.provider === 'runway' && !config.paidAllowed) throw new Error('Geração paga bloqueada. Nenhuma solicitação foi enviada.');
  if (!config.token) throw new Error('Credencial do motor de vídeo não configurada no servidor.');
}
export function publicMovieConfig(config) {
  return { enabled: config.enabled, provider: config.provider, sceneCount: config.sceneCount,
    configured: !!config.token, paidBlocked: config.provider === 'runway' && !config.paidAllowed,
    mode: config.provider === 'hf_wan' ? 'experimental_com_cota' : 'pago',
    note: config.provider === 'hf_wan' ? 'O Space tem fila e cota. Qualidade e disponibilidade ainda precisam de validação.' : 'Usa créditos do provedor quando autorizado no servidor.' };
}
