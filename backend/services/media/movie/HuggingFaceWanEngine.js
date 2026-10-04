import { MovieError, checkedUrl, limitedBody, engineRequest, safeEngineError } from './MovieHttp.js';
export function decodeSseBlock(block) {
  const event = block.split('\n').find(v => v.startsWith('event:'))?.slice(6).trim();
  const data = block.split('\n').filter(v => v.startsWith('data:')).map(v => v.slice(5).trimStart()).join('\n');
  return { event, data };
}
export class HuggingFaceWanEngine {
  constructor(config, fetcher = fetch) { this.config = config; this.fetcher = fetcher; }
  headers() { return { Authorization: `Bearer ${this.config.token}` }; }
  async start(scene, imageBody, contentType) {
    const { origin } = this.config;
    const form = new FormData(); form.append('files', new Blob([imageBody], { type: contentType }), 'product.png');
    const uploaded = await engineRequest(`${origin}/gradio_api/upload`, { method: 'POST', headers: this.headers(), body: form }, this.fetcher);
    const paths = JSON.parse((await limitedBody(uploaded, 65536)).toString());
    if (!Array.isArray(paths) || typeof paths[0] !== 'string' || paths[0].length > 2048) throw new MovieError('O motor não recebeu a imagem.');
    const response = await engineRequest(`${origin}/gradio_api/call/generate_video`, {
      method: 'POST', headers: { ...this.headers(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: [{ path: paths[0], meta: { _type: 'gradio.FileData' } }, scene.prompt,
        this.config.steps, scene.negativePrompt, scene.duration, 1, 1, 42, true] })
    }, this.fetcher);
    const result = JSON.parse((await limitedBody(response, 65536)).toString());
    if (!/^[a-zA-Z0-9_-]{1,128}$/.test(result.event_id || '')) throw new MovieError('Motor sem identificador de geração.');
    return result.event_id;
  }
  async retrieve(id) {
    if (!/^[a-zA-Z0-9_-]{1,128}$/.test(id)) throw new MovieError('Identificador de geração inválido.');
    const response = await engineRequest(`${this.config.origin}/gradio_api/call/generate_video/${id}`, {
      headers: this.headers()
    }, this.fetcher, 600000);
    if (!response.body) throw new MovieError('Motor sem resposta de acompanhamento.');
    const decoder = new TextDecoder(); let pending = '', size = 0;
    try {
      for await (const bytes of response.body) {
        size += bytes.length;
        if (size > 1024 * 1024) throw new MovieError('Acompanhamento do motor excedeu o limite.');
        pending += decoder.decode(bytes, { stream: true }); pending = pending.replace(/\r\n/g, '\n');
        let at;
        while ((at = pending.indexOf('\n\n')) >= 0) {
          const { event, data } = decodeSseBlock(pending.slice(0, at)); pending = pending.slice(at + 2);
          if (event === 'error') throw safeEngineError(data);
          if (event === 'complete') {
            let rows; try { rows = JSON.parse(data); } catch { throw new MovieError('Resultado do motor inválido.'); }
            const file = rows?.[0]?.video || rows?.[0];
            const value = file?.url || (file?.path ? `${this.config.origin}/gradio_api/file=${file.path}` : null);
            return checkedUrl(value, [this.config.origin]);
          }
        }
      }
    } catch (error) { if (error instanceof MovieError) throw error; throw new MovieError('Conexão interrompida. A cena pode ser retomada pelo identificador salvo.', 'NETWORK'); }
    throw new MovieError('O motor terminou sem entregar a cena.');
  }
}
