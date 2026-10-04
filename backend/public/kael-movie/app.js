'use strict';
// O JWT fica somente em memória. A página não recebe nem guarda chaves dos motores.
let token = '', timer, busy = false, canGenerate = false;
const $ = id => document.getElementById(id);
const message = text => { $('message').textContent = text; };
async function api(path, body) {
  const response = await fetch(path, { method:body ? 'POST':'GET', headers:{'Content-Type':'application/json',...(token?{Authorization:`Bearer ${token}`}:{})},
    ...(body?{body:JSON.stringify(body)}:{}), signal:AbortSignal.timeout(45000) });
  const data = await response.json();
  if (!response.ok) { if(response.status===401&&token) logout(); throw new Error(data.error || 'Falha ao consultar o estúdio.'); }
  return data;
}
function logout() { token='';clearTimeout(timer);$('studio').hidden=true;$('login').hidden=false;$('tasks').replaceChildren(); }
$('logout').addEventListener('click',()=>{logout();message('Sessão do estúdio encerrada neste navegador.');});
$('loginForm').addEventListener('submit',async event=>{
  event.preventDefault();if(busy)return;busy=true;const button=event.target.querySelector('button');button.disabled=true;
  try {const form=new FormData(event.target);const data=await api('/auth/login',{email:form.get('email'),password:form.get('password')});
    event.target.reset();if(!data.token)throw new Error('Login sem sessão.');token=data.token;
    const status=await api('/kael-movie/api/config');$('engine').textContent=`Motor: ${status.config.provider}`;$('engineNote').textContent=status.config.note;
    canGenerate=!!status.config.enabled&&!!status.config.configured&&!status.config.paidBlocked;
    $('generate').disabled=!canGenerate;
    $('login').hidden=true;$('studio').hidden=false;message('');await load();
  }catch(error){message(error.message);}finally{busy=false;button.disabled=false;}
});
$('movieForm').addEventListener('submit',async event=>{
  event.preventDefault();if(busy)return;busy=true;$('generate').disabled=true;
  try {await api('/kael-movie/api/tasks',{link:new FormData(event.target).get('link')});message('Teste cadastrado. A montagem continua no servidor; você pode fechar esta página.');await load();}
  catch(error){message(error.message);}finally{busy=false;$('generate').disabled=!canGenerate;}
});
const statuses={queued:'Na fila',processing:'Produzindo',ready:'Vídeo pronto',failed:'Geração interrompida'};
function element(tag,text,className){const el=document.createElement(tag);el.textContent=text;if(className)el.className=className;return el;}
async function load(){
  clearTimeout(timer);if(!token)return;
  try {const data=await api('/kael-movie/api/tasks');if(!token)return;const cards=[];
    for(const task of data.tasks){const card=element('article','','card');card.append(element('span',statuses[task.status]||task.status,'tag'),element('h3',task.title||'Identificando produto','task-title'));
      if(task.movie){card.append(element('p',task.movie.phase||'Preparando cenas'));const progress=document.createElement('progress');progress.max=task.movie.totalScenes;progress.value=task.movie.completedScenes;progress.setAttribute('aria-label','Cenas concluídas');card.append(progress,element('p',`${task.movie.completedScenes} de ${task.movie.totalScenes} cenas concluídas`,'small'));}
      if(task.status==='ready'&&task.previewUrl){const url=new URL(task.previewUrl);if(url.protocol==='https:'&&!url.username&&!url.password){const video=document.createElement('video');video.controls=true;video.preload='none';video.src=url.href;card.append(video);const link=element('a','Abrir vídeo');link.href=url.href;link.target='_blank';link.rel='noopener noreferrer';card.append(link);}}
      if(task.status==='ready'&&task.canReedit){const edit=element('button','Melhorar edição sem gerar cenas','secondary');edit.addEventListener('click',async()=>{edit.disabled=true;try{await api(`/kael-movie/api/tasks/${encodeURIComponent(task.id)}/reedit`,{});message('Reedição cadastrada com as cenas salvas. Nenhuma nova geração de IA será solicitada.');await load();}catch(error){message(error.message);}finally{edit.disabled=false;}});card.append(edit);}
      if(task.status==='failed'){card.append(element('p',task.lastError,'task-error'));const retry=element('button','Retomar tarefa','secondary');retry.addEventListener('click',async()=>{retry.disabled=true;try{await api(`/kael-movie/api/tasks/${encodeURIComponent(task.id)}/resume`,{});await load();}catch(error){message(error.message);}finally{retry.disabled=false;}});card.append(retry);}
      cards.push(card);
    }
    $('tasks').replaceChildren(...(cards.length?cards:[element('p','Seu primeiro vídeo aparecerá aqui.')]));
  }catch(error){message(error.message);}finally{if(token)timer=setTimeout(load,15000);}
}
