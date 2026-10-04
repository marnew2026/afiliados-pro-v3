import { createHash } from 'node:crypto';
export async function scheduleMovieReedit({ source, userId, tasks, enqueue, idFactory }) {
  if (!source || String(source.userId)!==String(userId) || !source.previewOnly || source.renderStyle!=='movie_v1') throw new Error('Teste não encontrado.');
  if(source.movieReuseOnly) return source;
  const movie=source.movie;
  if(source.status!=='ready' || !source.product?.title || !movie?.plan?.scenes?.length || movie.plan.scenes.length>4 ||
    movie.plan.scenes.some((scene,index)=>movie.scenes?.[index]?.state!=='ready'||!movie.scenes[index].assetUrl)) throw new Error('Aguarde o vídeo ficar pronto para melhorar a edição.');
  const linkHash=createHash('sha256').update(`movie-framing-v3:${source._id}`).digest('hex');
  const task=await tasks.findOneAndUpdate({userId,linkHash},{$setOnInsert:{ userId,linkHash,link:source.link,
    campaignId:idFactory(),product:JSON.parse(JSON.stringify(source.product)),movie:JSON.parse(JSON.stringify(movie)),
    renderStyle:'movie_v1',previewOnly:true,movieReuseOnly:true,status:'queued' }},{upsert:true,new:true,setDefaultsOnInsert:true});
  if(task.status!=='ready') await enqueue(task._id);
  return task;
}
