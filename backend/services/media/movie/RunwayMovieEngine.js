import { MovieError } from './MovieHttp.js';
export class RunwayMovieEngine {
  constructor(config, client) { this.config = config; this.client = client; }
  async start(scene, imageBody, contentType) {
    if (!this.config.paidAllowed) throw new MovieError('Geração paga bloqueada.');
    if (!this.client) {
      const { default: RunwayML } = await import('@runwayml/sdk');
      this.client = new RunwayML({ apiKey: this.config.token, maxRetries: 0, timeout: 30000 });
    }
    const result = await this.client.imageToVideo.create({ model: 'gen4_turbo',
      promptImage: `data:${contentType};base64,${imageBody.toString('base64')}`,
      promptText: scene.prompt.slice(0, 1000), ratio: '720:1280', duration: 5 });
    if (!result?.id) throw new MovieError('Runway não retornou identificador da cena.');
    return String(result.id);
  }
  async retrieve(id) {
    if (!this.client) {
      const { default: RunwayML } = await import('@runwayml/sdk');
      this.client = new RunwayML({ apiKey: this.config.token, maxRetries: 0, timeout: 30000 });
    }
    for (let attempt = 0; attempt < 120; attempt++) {
      const row = await this.client.tasks.retrieve(id);
      if (row.status === 'SUCCEEDED' && row.output?.[0]) return row.output[0];
      if (['FAILED', 'CANCELLED'].includes(row.status)) throw new MovieError('Runway não concluiu a cena.', 'SCENE_FAILED');
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
    throw new MovieError('A cena ainda não terminou. Retome para consultar o identificador salvo.', 'NETWORK');
  }
}
