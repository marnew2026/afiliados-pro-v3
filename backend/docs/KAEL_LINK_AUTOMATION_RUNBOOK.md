# KAEL: links em lote e divulgação automática — staging

Base do patch: v4-development, f52d4c0. Aplicar somente ao staging nesta etapa.

## Resultado

A Central de Divulgação reúne os cartões existentes de TikTok/Instagram/Facebook, a escolha das redes, o botão de automático e o cadastro de até 10 links do Mercado Livre por lote. O cadastro grava tarefas no servidor. Um worker cria as campanhas e vídeos, reutilizando vídeos prontos da campanha. Com o automático ativo, um scheduler seleciona as campanhas prontas e reserva uma divulgação por campanha/canal. O usuário não precisa abrir os formulários de cada postagem.

O dashboard inicial apresenta publicações concluídas hoje por rede, campanhas em geração, falhas e cliques acumulados das campanhas criadas por links. O dia é UTC-3. Não apresenta cliques por rede nem cliques diários: esses dados ainda não têm rastreamento específico nesta entrega. Uma entrega ao provedor ainda sem confirmação não conta como publicação concluída.

## Instalação

1. Na raiz C:\Users\marie\Desktop\afiliados-pro-v3, confirme `git branch --show-current`: v4-development.
2. Faça backup dos arquivos locais alterados antes de substituir. Extraia as pastas backend e afiliados-pro-mobile deste ZIP na raiz do projeto, mantendo as pastas.
3. Execute no backend: `node --test tests/*.test.js`.
4. Execute no mobile: `npx tsc --noEmit`.
5. Execute na raiz: `git diff --check` e revise `git diff --stat`.
6. Use a lista ARQUIVOS-DO-PATCH.txt para adicionar apenas os arquivos desta entrega. Não inclua .bak, .jscode nem outros arquivos locais.
7. Commit sugerido: ADD KAEL LINK AUTOMATION - Batch links and publish configured channels.
8. `git push origin v4-development`; confira que o Render de staging implantou o commit novo.

## Render: configurar uma vez, no serviço staging

Manter Build Command: `npm install && bash scripts/setup-product-voice.sh`.
Manter Start Command: `node index.js`.

- KAEL_PRODUCT_VIDEO_ENABLED=true
- KAEL_PRODUCT_VIDEO_STYLE=narrated_v2 (o identificador existente continua válido para os modelos melhorados)
- KAEL_LINK_AUTOMATION_ENABLED=true (nova variável)
- KAEL_VIDEO_AUTOPILOT_ENABLED=true
- KAEL_VIDEO_AUTOPILOT_ENV=staging
- NODE_ENV=staging
- BASE_URL=https://afiliados-pro-v4-staging.onrender.com
- KAEL_AUTOPILOT_CRON_ENABLED=false (o cron legado não é necessário para este fluxo)
- KAEL_MEDIA_RECOVERY_CRON_ENABLED=false (não é necessário para vídeos locais)

Não alterar aprovações nem liberar redes pendentes. A configuração de cada integração existente continua valendo. O boot deve mostrar `KAEL LINKS AUTOMATICO ATIVO: a cada minuto`. Também cria um índice único parcial em Distribution para a chave das publicações deste fluxo.

## Primeiro teste no app

Iniciar Expo no terminal mobile com:

```powershell
$env:EXPO_PUBLIC_API_URL = "https://afiliados-pro-v4-staging.onrender.com"
npx expo start --clear
```

Entrar com staging-v4@afiliadospro.local. Abrir Central de Divulgação. Reconectar TikTok se a autorização expirou. Selecionar somente TikTok no primeiro teste, habilitar automático e cadastrar um link novo. Acompanhar no dashboard. O scheduler verifica a cada minuto; geração, limites diários e intervalo podem adiar o envio. O TikTok mantém SELF_ONLY: esse teste não comprova publicação pública.

Depois de validar um link, testar lote de dois e retomada com app fechado. Ao desligar o automático, o worker revalida a opção antes de chamar a rede. Um envio já iniciado na rede não pode ser recolhido por essa pausa.

## Comportamento de retomada e limites

- Até 10 links por requisição; até 30 tarefas em fila/processamento por usuário. Mesma URL reutiliza a tarefa existente.
- A seleção conserva o limite diário e o intervalo da conta, por rede; padrão existente: 2 publicações e 180 minutos. Máximo 10 por rede/dia, mínimo 30 minutos.
- Campanha pausada/arquivada não é divulgada; vídeos de outro usuário não são aceitos.
- Falta de aprovação/configuração numa rede não impede o processamento nas redes disponíveis.
- Não cria novamente uma publicação automática existente para a mesma campanha/rede, incluindo publicações feitas pelo Autopilot anterior.
- Reservas no MongoDB são recolocadas na fila após falha entre banco e Redis. Pausas conservam reservas até a reativação.
- Após falha definitiva HTTP 401/access_token_invalid, uma autorização com connectedAt renovado retoma a MESMA publicação; até três retomadas por renovação. Falha de agendamento antes de qualquer tentativa também permite retomada limitada. Outros erros definitivos ficam no dashboard para diagnóstico.
- O registro único evita novas reservas duplicadas. Não é uma garantia de exactly-once na API externa: uma queda após a rede aceitar, antes de gravar sua resposta, ainda exige conciliação específica do provedor.

## Vídeo desta entrega

Roteiros determinísticos por categoria (pesca/calçados/tecnologia/casa/geral), informações efetivamente disponíveis, temas visuais e legendas por frases com tempos estimados pela duração da voz. Preserva narração Piper, trilha original, FFmpeg e R2. Persiste a legenda do vídeo para divulgação. Não usa LLM externo nem gera filmagens reais de uso a partir de fotografias.

O material continua sendo um vídeo vertical com as fotos disponíveis. Melhoria futura: roteiro baseado em descrição autorizada, cenas reais autorizadas e adaptador image-to-video opcional. Upload pessoal/empresarial permanece no fluxo anterior; este patch não adiciona um seletor de arquivos à tela única. Telegram conserva texto + link, não envio de vídeo. Kwai depende do cliente oficial configurado. Métricas por rede precisam de links de rastreamento por distribuição.

## Validação local

242 testes backend passaram; TypeScript sem erros. Renderização real de um vídeo de 22,6 s, 720x1280, H.264/AAC com narração e legendas conferida visualmente. Não houve publicação real em redes nem acesso ao seu Render nesta validação.
