export class MovieError extends Error {
  constructor(message, code = 'ENGINE_ERROR') { super(message); this.code = code; this.noAutoRetry = true; }
}
const diagnosticCodes = new Set(['QUOTA','AUTH','UNAVAILABLE','INPUT_ERROR','PROVIDER_RUNTIME','SCENE_FAILED','NETWORK','HTTP_ERROR','ENGINE_ERROR','UNCERTAIN']);
export function movieDiagnosticCode(error) {
  return diagnosticCodes.has(error?.code) ? error.code : 'ENGINE_ERROR';
}
export function safeEngineError(value) {
  // Classifica a resposta sem persistir texto bruto, URLs ou credenciais.
  const text = (typeof value === 'string' ? value : JSON.stringify(value ?? null)).slice(0, 65536);
  if (/quota|daily.{0,30}limit|rate.{0,10}limit|exceeded.{0,30}(?:gpu|usage)|429/i.test(text)) return new MovieError('Cota do motor de vídeo esgotada. Aguarde a renovação; nenhum motor pago será acionado.', 'QUOTA');
  if (/unauthorized|forbidden|invalid.{0,15}token|authentication|sign in|log in/i.test(text)) return new MovieError('O provedor recusou a autenticação. Verifique a credencial no Render; não envie o token.', 'AUTH');
  if (/sleeping|unavailable|overloaded|queue.{0,15}full|502|503|504/i.test(text)) return new MovieError('O motor está indisponível ou com a fila cheia. O progresso foi preservado.', 'UNAVAILABLE');
  if (/out of memory|cuda|runtimeerror|gpu.{0,15}error/i.test(text)) return new MovieError('O provedor informou uma falha de execução na geração da cena.', 'PROVIDER_RUNTIME');
  if (/validation|invalid.{0,15}(?:image|input|parameter)|unsupported.{0,15}(?:image|format)/i.test(text)) return new MovieError('O motor recusou a imagem ou os parâmetros desta cena.', 'INPUT_ERROR');
  return new MovieError('O provedor encerrou a cena sem informar uma causa reconhecível. Confira o Space antes de retomar.', 'SCENE_FAILED');
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
      if ([401,403].includes(response.status)) throw safeEngineError('unauthorized');
      if (response.status === 429) throw safeEngineError('HTTP 429');
      if ([502,503,504].includes(response.status)) throw safeEngineError('unavailable');
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
