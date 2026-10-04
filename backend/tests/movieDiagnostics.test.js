import test from 'node:test';
import assert from 'node:assert/strict';
import {safeEngineError,engineRequest,movieDiagnosticCode} from '../services/media/movie/MovieHttp.js';
import {buildCampaignVideo} from '../services/campaigns/CampaignVideoBuildService.js';
test('diagnóstico distingue falhas sem expor resposta ou credencial',()=>{
 for(const [value,code] of [['quota exceeded hf_secret','QUOTA'],['invalid token hf_secret','AUTH'],['space sleeping hf_secret','UNAVAILABLE'],['CUDA out of memory hf_secret','PROVIDER_RUNTIME'],['invalid image hf_secret','INPUT_ERROR'],['unclassified hf_secret','SCENE_FAILED'],[null,'SCENE_FAILED'],['ZeroGPU runtimeerror','PROVIDER_RUNTIME']]) {
  const error=safeEngineError(value);assert.equal(error.code,code);assert.ok(error.noAutoRetry);assert.doesNotMatch(error.message,/hf_secret/);
 }
 assert.equal(movieDiagnosticCode({code:'hf_secret'}),'ENGINE_ERROR');
});
test('HTTP identifica autenticação e indisponibilidade sem ler corpo bruto',async()=>{
 for(const [status,code] of [[401,'AUTH'],[403,'AUTH'],[429,'QUOTA'],[503,'UNAVAILABLE'],[500,'HTTP_ERROR']]) {
  await assert.rejects(engineRequest('https://example.test',{},async()=>({ok:false,status})),e=>e.code===code);
 }
});
test('tarefa persiste código seguro para consulta depois da falha',async()=>{
 const task={_id:'task',userId:'owner',campaignId:'preview',previewOnly:true,renderStyle:'movie_v1',product:{title:'Produto'},save:async()=>{}};
 await assert.rejects(buildCampaignVideo({taskId:'task',taskModel:{findById:async()=>task},footageFinder:async()=>null,renderer:async()=>{throw safeEngineError('CUDA out of memory hf_secret');}}));
 assert.equal(task.status,'failed');assert.equal(task.movieErrorCode,'PROVIDER_RUNTIME');assert.doesNotMatch(task.lastError,/hf_secret/);
});
