import { createHash } from 'node:crypto';
const clean = v => String(v || '').replace(/[\x00-\x1f\x7f]/g, ' ').replace(/\s+/g, ' ').trim();
export function planMovie(product, count = 2) {
  if (!clean(product?.title) || !Array.isArray(product.images) || !product.images.length) throw new Error('Produto sem imagem ou título.');
  if (![1, 2, 3, 4].includes(count)) throw new Error('Quantidade de cenas inválida.');
  // A referência visual define o produto. O título não é tratado como instrução de modelo.
  const actions = [
    'Commercial product shot. The camera makes a short, smooth lateral move to reveal the visible contours. The product remains stationary.',
    'Macro product shot. The camera slowly approaches an existing visible detail of the product. Soft moving studio light reveals the surface texture.',
    'Commercial product shot. The camera makes a very shallow arc around the visible front of the product. Maintain a coherent background.',
    'Closing commercial shot. A gentle camera pullback presents the complete product already visible in the reference image.'
  ];
  const continuity = ' Preserve the exact product colors, shape, markings, quantity and visible parts in the reference image. Any existing hand remains anatomically correct. Do not invent hidden mechanisms, product functions, people or accessories. No text, no new logo, no price, no before-and-after claims.';
  const scenes = Array.from({ length: count }, (_, index) => ({ index, duration: 5,
    imageUrl: product.images[Math.min(index, product.images.length - 1)], prompt: actions[index] + continuity,
    negativePrompt: 'deformed product, duplicate product, extra fingers, warped hooks, changing colors, fake labels, text, watermark, flicker, unrealistic movement' }));
  return { version: 'movie_v1', title: clean(product.title).slice(0, 160), scenes,
    fingerprint: createHash('sha256').update(JSON.stringify(scenes)).digest('hex'),
    disclosure: 'Cenas produzidas com IA; não representam teste real de desempenho do produto.' };
}
