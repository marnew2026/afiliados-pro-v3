import test from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import { createMovieRouter } from '../routes/kaelMovieRoutes.js';
const id='012345678901234567890123';
test('estúdio exige sessão e restringe consultas/retomadas ao dono da tarefa',async()=>{
 const old=process.env.KAEL_PRODUCT_VIDEO_ENABLED;process.env.KAEL_PRODUCT_VIDEO_ENABLED='true';
 const queries=[];let scheduled;let enqueueCount=0;
 const rows={ find(q){queries.push(q);return{sort(){return{limit:async()=>[]};}};},findOne:async q=>{queries.push(q);return null;} };
 const app=express();app.use(express.json());app.use(createMovieRouter({
  auth:(req,res,next)=>{if(req.headers.authorization!=='Bearer test')return res.status(401).json({error:'session'});req.user={_id:'owner'};next();},
  tasks:rows,config:()=>({enabled:true,provider:'hf_wan',token:'private',sceneCount:1}),
  queue:{getJob:async()=>null},view:async t=>({id:t._id}),enqueue:async()=>enqueueCount++,
  schedule:async input=>{scheduled=input;return[{accepted:true,task:{_id:id}}];}
 }));
 const server=app.listen(0,'127.0.0.1');await new Promise(resolve=>server.once('listening',resolve));
 const base=`http://127.0.0.1:${server.address().port}`;const headers={Authorization:'Bearer test','Content-Type':'application/json'};
 try {
  assert.equal((await fetch(base+'/tasks')).status,401);
  assert.equal((await fetch(base+'/tasks',{headers})).status,200);
  assert.deepEqual(queries[0],{userId:'owner',renderStyle:'movie_v1',previewOnly:true});
  assert.equal((await fetch(base+`/tasks/${id}/resume`,{method:'POST',headers,body:'{}'})).status,404);assert.equal(queries[1].userId,'owner');assert.equal(enqueueCount,0);
  assert.equal((await fetch(base+'/tasks',{method:'POST',headers,body:JSON.stringify({link:'https://meli.la/a'})})).status,202);
  assert.equal(scheduled.previewOnly,true);assert.equal(scheduled.renderStyle,'movie_v1');assert.equal(scheduled.userId,'owner');
 }finally{server.closeAllConnections();await new Promise(resolve=>server.close(resolve));if(old===undefined)delete process.env.KAEL_PRODUCT_VIDEO_ENABLED;else process.env.KAEL_PRODUCT_VIDEO_ENABLED=old;}
});
