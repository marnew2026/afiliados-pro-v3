import express from 'express';
import { scheduleMovieReedit } from '../services/campaigns/MovieReeditService.js';
import mongoose from 'mongoose';
import { protect } from '../middlewares/authMiddleware.js';
import CampaignVideoTask from '../models/CampaignVideoTask.js';
import { scheduleCampaignLinks } from '../services/campaigns/CampaignLinkBatchService.js';
import { campaignVideoTaskView } from '../services/campaigns/CampaignVideoTaskView.js';
const lazyQueue = { getJob: async id => (await import('../queue/campaignVideoQueue.js')).campaignVideoQueue.getJob(id) };
const lazyEnqueue = async id => (await import('../queue/campaignVideoQueue.js')).enqueueCampaignVideo(id);
import { movieConfig, publicMovieConfig, requireMovieEngine } from '../services/media/movie/MovieConfig.js';
export function createMovieRouter({ auth = protect, tasks = CampaignVideoTask, schedule = scheduleCampaignLinks,
  enqueue = lazyEnqueue, queue = lazyQueue, config = movieConfig, view = campaignVideoTaskView } = {}) {
  const router = express.Router();
  router.use(auth);
  router.get('/config', (req,res) => {
    try { res.json({ success:true, config:publicMovieConfig(config()) }); }
    catch { res.status(503).json({success:false,error:'Configuração do KAEL Movie inválida no servidor.'}); }
  });
  const enabled = (req,res,next) => {
    try { requireMovieEngine(config()); if (process.env.KAEL_PRODUCT_VIDEO_ENABLED !== 'true') throw new Error('Worker de vídeos desativado.'); next(); }
    catch(error) { res.status(503).json({success:false,error:error.message}); }
  };
  router.get('/tasks', async (req,res) => {
    try {
      const rows = await tasks.find({userId:req.user._id,renderStyle:'movie_v1',previewOnly:true}).sort({createdAt:-1}).limit(30);
      res.json({success:true,tasks:await Promise.all(rows.map(row=>view(row,id=>queue.getJob(id))))});
    } catch { res.status(503).json({success:false,error:'Não foi possível consultar os vídeos.'}); }
  });
  router.post('/tasks', enabled, async (req,res) => {
    try {
      const results = await schedule({userId:req.user._id, links:[req.body?.link], namespace:'movie-preview',
        renderStyle:'movie_v1',previewOnly:true,enqueue});
      if (!results[0]?.accepted) return res.status(400).json({success:false,error:results[0]?.error || 'Link não aceito.'});
      res.status(202).json({success:true,task:await view(results[0].task,id=>queue.getJob(id))});
    } catch { res.status(400).json({success:false,error:'Não foi possível cadastrar o teste.'}); }
  });
  router.post('/tasks/:id/reedit', enabled, async (req,res) => {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({success:false,error:'Tarefa inválida.'});
    try {
      const source=await tasks.findOne({_id:req.params.id,userId:req.user._id,renderStyle:'movie_v1',previewOnly:true});
      if(!source) return res.status(404).json({success:false,error:'Tarefa não encontrada.'});
      const task=await scheduleMovieReedit({source,userId:req.user._id,tasks,enqueue,idFactory:()=>new mongoose.Types.ObjectId()});
      res.status(202).json({success:true,task:await view(task,id=>queue.getJob(id))});
    } catch { res.status(400).json({success:false,error:'Não foi possível reeditar. O vídeo original deve estar pronto e ter cenas salvas.'}); }
  });
  router.post('/tasks/:id/resume', enabled, async (req,res) => {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({success:false,error:'Tarefa inválida.'});
    try {
      const task = await tasks.findOne({_id:req.params.id,userId:req.user._id,renderStyle:'movie_v1',previewOnly:true});
      if (!task) return res.status(404).json({success:false,error:'Tarefa não encontrada.'});
      if (task.status !== 'ready') await enqueue(task._id);
      res.json({success:true,task:await view(task,id=>queue.getJob(id))});
    } catch { res.status(503).json({success:false,error:'Não foi possível retomar a tarefa.'}); }
  });
  return router;
}
export default createMovieRouter();
