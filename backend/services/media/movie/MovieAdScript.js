import { buildProductAdScript } from '../template/ProductAdScript.js';
const clean = value => String(value || '').replace(/[\x00-\x1f\x7f]/g,' ').replace(/\s+/g,' ').trim();
const fold = value => clean(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
export function buildMovieAdScript(product) {
  const base = buildProductAdScript(product);
  const title = fold(product.title);
  const fishing = /\b(?:pesca|pescaria|varas?|molinetes?|iscas?|carretilhas?)\b/.test(title);
  let speeches;
  if (fishing) {
    const rods = title.match(/\b([1-9]\d?)\s+varas?\b/);
    const reels = title.match(/\b([1-9]\d?)\s+molinetes?\b/);
    const parts = [rods ? `${rods[1]} ${Number(rods[1])===1?'vara':'varas'}` : '', reels ? `${reels[1]} ${Number(reels[1])===1?'molinete':'molinetes'}` : ''].filter(Boolean);
    const facts = parts.length ? `O anúncio reúne ${parts.join(' e ')}.` : /\biscas?\b/.test(title) ? 'Veja de perto as iscas deste anúncio.' : 'Veja de perto o equipamento deste anúncio.';
    speeches = ['Já pensando na próxima pescaria? Olha esta opção.', facts,
      /\bacessorios\b/.test(title) ? 'Tem acessórios no conjunto. Confira os itens e as medidas no anúncio.' : 'Confira os detalhes, as medidas e o que acompanha o produto.',
      'Quer conhecer melhor? Confira o produto no link. Conteúdo de afiliado.'];
  } else {
    const subject = [ [/\bmouse\b/,'um mouse'],[/\b(?:fone|fones)\b/,'um fone'],[/\b(?:tenis|sapato)\b/,'um calçado'],[/\b(?:faixas? elasticas?|mini band)\b/,'um kit de faixas elásticas'],[/\bairfryer\b/,'uma airfryer'] ].find(([pattern])=>pattern.test(title))?.[1];
    const fact = base.scenes[1].speech;
    speeches = [subject ? `Procurando ${subject}? Olha esta opção.` : 'Vale olhar de perto. Conheça esta opção.',
      fact === 'Veja os detalhes nas imagens deste anúncio.' ? 'Olhe os detalhes do produto, de outro ângulo.' : fact,
      'Confira as medidas e as características na página do produto.',
      'Gostou? Confira o produto no link. Conteúdo de afiliado.'];
  }
  return { ...base, version:'movie_edit_v2', scenes:base.scenes.map((scene,i)=>({...scene,speech:speeches[i]})) };
}
// Cortes de edição, sem atribuir uma posição a uma peça que não foi identificada.
export function movieShot(index, sceneCount) {
  if (![0,1,2,3].includes(index) || !Number.isInteger(sceneCount) || sceneCount<1 || sceneCount>4) throw new Error('Plano de edição inválido.');
  return { clipIndex: Math.min(index,sceneCount-1), scale:[720,940,860,720][index], height:[1100,1560,1400,1100][index],
    x:['(W-w)/2','(W-w)*0.42','(W-w)*0.58','(W-w)/2'][index],
    y:'(H-h)/2', start:sceneCount===1 ? [0,.6,1.2,.2][index] : 0 };
}
