import test from 'node:test';
import assert from 'node:assert/strict';
import { buildMovieAdScript, movieShot } from '../services/media/movie/MovieAdScript.js';
import { scheduleMovieReedit } from '../services/campaigns/MovieReeditService.js';
import { prepareMovieScenes } from '../services/media/movie/MovieSceneService.js';
const product={title:'Kit De Pesca Barato 2 Varas + 2 Molinetes E Acessórios Sortidas',images:['https://http2.mlstatic.com/a.webp'],attributes:[]};
test('kit de pesca usa abertura conversada e quantidades presentes, sem ler título de catálogo',()=>{
 const script=buildMovieAdScript(product);assert.match(script.scenes[0].speech,/pescaria/);assert.match(script.scenes[1].speech,/2 varas e 2 molinetes/);
 assert.doesNotMatch(script.scenes.map(s=>s.speech).join(' '),/Barato|Sortidas|captura|garant|resisten|preço/i);
 const generic=buildMovieAdScript({...product,title:'Isca artificial de silicone'});assert.doesNotMatch(generic.scenes[1].speech,/2 varas|2 molinetes/);
});
test('edição varia planos sem recortar posições de peças supostamente identificadas',()=>{
 assert.deepEqual([0,1,2,3].map(i=>movieShot(i,3).clipIndex),[0,1,2,2]);
 assert.equal(new Set([0,1,2,3].map(i=>movieShot(i,1).scale)).size,3);
 for(const i of [0,1,2,3]) { const shot=movieShot(i,1); assert.ok(shot.scale<=720); assert.ok(shot.height<=900); assert.equal(shot.y,'120+(900-ih)/2'); }
 assert.throws(()=>movieShot(4,3));
});
test('reedição cria tarefa isolada, copia cenas e reutiliza reserva; outra conta é recusada',async()=>{
 const source={_id:'source',userId:'owner',status:'ready',previewOnly:true,renderStyle:'movie_v1',product,link:'https://meli.la/a',movie:{plan:{scenes:[{index:0}]},scenes:[{state:'ready',assetUrl:'https://storage.example/a.mp4'}]}};
 let stored,queued=0;
 const tasks={findOneAndUpdate:async(q,u)=>{assert.equal(q.userId,'owner');stored ||= {_id:'edit',...u.$setOnInsert};return stored;}};
 const args={source,userId:'owner',tasks,enqueue:async()=>queued++,idFactory:()=> 'preview-campaign'};
 const edit=await scheduleMovieReedit(args);assert.equal(edit.movieReuseOnly,true);assert.equal(edit.previewOnly,true);assert.equal(edit.campaignId,'preview-campaign');
 edit.movie.scenes[0].state='changed';assert.equal(source.movie.scenes[0].state,'ready');edit.status='ready';await scheduleMovieReedit(args);assert.equal(queued,1);
 await assert.rejects(scheduleMovieReedit({...args,userId:'other'}),/encontrado/);
});
test('reedição sem cena em cache nunca chama o motor para gerar outra',async()=>{
 let calls=0;
 const task={_id:'edit',userId:'owner',movieReuseOnly:true,save:async()=>{},movie:{provider:'hf_wan',origin:'https://test.hf.space',plan:{scenes:[{index:0,imageUrl:product.images[0]}]},scenes:[]}};
 await assert.rejects(prepareMovieScenes({task,product,config:{enabled:true,provider:'hf_wan',token:'test',origin:'https://test.hf.space'},engine:{start:async()=>calls++}}),/reedição/);
 assert.equal(calls,0);
});
