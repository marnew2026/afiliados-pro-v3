export class MovieError extends Error {
  constructor(message, code = 'ENGINE_ERROR') { super(message); this.code = code; this.noAutoRetry = true; }
}
export function safeEngineError(value) {
  const text = String(value || '');
  if (/quota|zerogpu|daily.*limit|rate.limit|429/i.test(text)) return new MovieError('Cota do motor de vídeo esgotada. Aguarde a renovação; nenhum motor pago será acionado.', 'QUOTA');
  return new MovieError('O motor de vídeo não concluiu a cena. Consulte o provedor antes de tentar novamente.', 'SCENE_FAILED');
}
export function checkedUrl(value, origins) {
  let u; try { u = new URL(value); } catch { throw new MovieError('Endereço de mídia inválido.'); }
  if (u.protocol !== 'https:' || u.username || u.password || u.port || !origins.includes(u.origin)) throw new MovieError('Origem de mídia não autorizada.');
  return u.href;
}
export async function limitedBody(response, maximum) {
  let size = 0; const chunks = [];
  if (!response.body) throw new MovieError('Resposta vazia do motor.');
  for await (const chunk of response.body) {
    size += chunk.length;
    if (size > maximum) { await response.body.cancel?.().catch(() => {}); throw new MovieError('Resposta do motor excedeu o limite.'); }
    chunks.push(Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}
export async function engineRequest(url, options = {}, fetcher = fetch, timeout = 30000) {
  try {
    const response = await fetcher(url, { ...options, redirect: 'error', signal: AbortSignal.timeout(timeout) });
    if (!response.ok) {
      if (response.status === 429) throw safeEngineError('HTTP 429');
      throw new MovieError('O motor recusou a consulta. O identificador salvo será preservado.', 'HTTP_ERROR');
    }
    return response;
  } catch (error) {
    if (error instanceof MovieError) throw error;
    throw new MovieError('Falha de comunicação com o motor de vídeo. O progresso salvo será preservado.', 'NETWORK');
  }
}
export async function downloadMovie(url, origins, fetcher = fetch) {
  const response = await engineRequest(checkedUrl(url, origins), {}, fetcher, 60000);
  const body = await limitedBody(response, 40 * 1024 * 1024);
  // FFmpeg fará a validação completa; não aceita HTML disfarçado de vídeo.
  if (body.length < 12 || body.toString('ascii', 4, 8) !== 'ftyp') throw new MovieError('O motor não retornou um arquivo MP4 válido.');
  return body;
}
