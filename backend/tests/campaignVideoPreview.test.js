import test from "node:test";
import assert from "node:assert/strict";
import { campaignVideoTaskView } from "../services/campaigns/CampaignVideoTaskView.js";
const task = {_id:"task",userId:"user",campaignId:"campaign",mediaAssetId:"asset",status:"ready",product:{title:"Produto"}};
test("preview consulta somente video pronto da campanha e usuario da tarefa", async()=>{
  let query;
  const view=await campaignVideoTaskView(task, async()=>null,{findOne:async filter=>{query=filter;return {assetUrl:"https://media.example/video.mp4"};}});
  assert.deepEqual(query,{_id:"asset",userId:"user",campaignId:"campaign",type:"video",status:"ready"});
  assert.equal(view.previewUrl,"https://media.example/video.mp4");
});
test("material ausente ou URL insegura nao oferece preview",async()=>{
  for(const asset of [null,{assetUrl:"file:///private"},{assetUrl:"https://user:password@example.com/video"},{assetUrl:"invalid"}]) {
    const view=await campaignVideoTaskView(task,async()=>null,{findOne:async()=>asset});
    assert.equal(view.previewUrl,null);
  }
});
test("tarefa em andamento nao consulta material pronto",async()=>{
  const view=await campaignVideoTaskView({...task,status:"processing"},async()=>null,{findOne:async()=>{throw new Error("Consulta inesperada");}});
  assert.equal(view.previewUrl,null);
});
