import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { buildProductAdScript } from "../services/media/template/ProductAdScript.js";
import { createProductMusic } from "../services/media/template/NarratedProductVideoRenderer.js";
import { narrateProductScenes } from "../services/media/narration/LocalProductNarrator.js";
import { renderProductVideo } from "../services/media/template/ProductVideoRenderer.js";
const images = ["https://http2.mlstatic.com/example.webp"];
test("roteiro utiliza somente atributos presentes no titulo", () => {
  const ad = buildProductAdScript({title:"Vara de pesca 20lbs com molinete e linha", images});
  assert.equal(ad.scenes.length, 4);
  assert.equal(ad.scenes[1].speech, "Vara de 20 libras. Com molinete. Com linha.");
  const bare = buildProductAdScript({title:"Vara de pesca",images});
  assert.doesNotMatch(JSON.stringify(bare), /20|Com molinete|Com linha|garantid|desconto/);
});
test("produto generico nao inventa preco ou itens de um conjunto", () => {
  const ad = buildProductAdScript({title:"Mouse Bluetooth",images});
  assert.doesNotMatch(JSON.stringify(ad), /conjunto|molinete|recarreg|R\$|desconto/);
  assert.match(ad.caption, /Conteúdo de afiliado/);
});
test("texto de produto e limitado e sem caracteres de controle", () => {
  const ad = buildProductAdScript({title:"A\u0000".repeat(500),images});
  assert.ok(ad.title.length <= 160);
  assert.doesNotMatch(JSON.stringify(ad), /\\u0000/);
});
test("voz ausente impede produzir anuncio silencioso", async () => {
  await assert.rejects(narrateProductScenes({scenes:[{speech:"Olá."}],directory:tmpdir(),pythonPath:"/nonexistent-python",modelPath:"/nonexistent-model"}), /nao instalada/);
});
test("manifesto nao pode apontar para arquivo fora da tarefa", async () => {
  const directory = await mkdtemp(join(tmpdir(), "kael-voice-test-"));
  try {
    const model = join(directory,"model"); await writeFile(model,""); await writeFile(model+".json","{}");
    await assert.rejects(narrateProductScenes({scenes:[{speech:"Olá."}],directory,pythonPath:process.execPath,modelPath:model,runner:async()=>{await writeFile(join(directory,"voice-manifest.json"),JSON.stringify([{file:"../private.wav",durationSeconds:2}]));}}), /Manifesto/);
  } finally { await rm(directory,{recursive:true,force:true}); }
});
test("trilha instrumental tem formato PCM valido e volume limitado", () => {
  const music = createProductMusic(1);
  assert.equal(music.toString("ascii",0,4),"RIFF"); assert.equal(music.readUInt32LE(24),22050);
  assert.equal(music.length,44144);
  for(let index=44;index<music.length;index+=2) assert.ok(Math.abs(music.readInt16LE(index))<=5300);
});
test("estilo desconhecido nao cai silenciosamente no formato antigo", async () => {
  await assert.rejects(renderProductVideo({style:"typo"}), /desconhecido/);
});
