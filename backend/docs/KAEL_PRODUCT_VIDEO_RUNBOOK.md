# KAEL: campanha pelo link e video automatico

Este patch adiciona o backend e a tela mobile Criar com KAEL, acessivel em Nova Campanha. A leitura real do produto e o upload devem ser validados no staging.

## Comportamento

- POST /campaigns/from-link recebe {"link":"https://..."}, autenticado pelo JWT existente.
- Aceita HTTPS de meli.la, mercadolivre.com.br, www.mercadolivre.com.br e produto.mercadolivre.com.br.
- Uma tarefa persistida e uma fila BullMQ criam a campanha e o video em segundo plano.
- O link fornecido, incluindo os parametros de afiliado, e preservado. Nao gera um novo link de comissao nem garante que um link comum seja de afiliado.
- Consulta o anuncio na API do Mercado Livre. Em 401/403 tenta dados Product publicados em JSON-LD na pagina. Se faltarem dados, registra falha em vez de inventar titulo ou imagens.
- Imagens devem vir de mlstatic.com. URLs/redirects externos sao recusados.
- Mesmo usuario + mesmo link normalizado reutiliza a tarefa. Uma campanha existente com o mesmo link e reutilizada.
- Video MP4 H.264 720x1280, de 12 a 20 segundos, fotos animadas, titulo e chamada para acao. Sem narracao, musica ou preco nesta primeira versao.
- R2 recebe o video como MediaAsset source=kael/status=ready; o resolvedor atual do KAEL pode utiliza-lo.
- GET /campaigns/from-link/:taskId consulta status, campanha, asset e erro. So o dono acessa a tarefa.
- Publicacao e cron existentes nao sao ativados por este patch.

## Instalacao inicial: staging

1. Copie os arquivos do ZIP para a raiz do repositorio preservando a pasta backend.
2. Em backend, execute npm install.
3. Execute node --test tests/*.test.js a partir do repositorio completo (os testes existentes de sessao tambem leem arquivos mobile).
4. Commit/push somente dos arquivos deste patch na branch de desenvolvimento.
5. No servico Render de staging, configure KAEL_PRODUCT_VIDEO_ENABLED=true e mantenha os crons existentes desligados.
6. Redis e R2 continuam usando as variaveis existentes. ffmpeg-static fornece o executavel; FFMPEG_PATH e uma alternativa opcional para instalacao propria.
7. Se API e pagina publica nao permitirem consulta, sera necessario MERCADO_LIVRE_ACCESS_TOKEN valido, obtido pela autorizacao oficial do Mercado Livre. Nao colocar esse segredo no aplicativo nem enviar no chat. Este patch nao implementa renovacao desse token.

Nao altere o servico de producao nesta etapa. Valide primeiro um produto real no staging. Leitura real do Mercado Livre e upload R2 nao foram executados neste ambiente.

## Teste PowerShell apos deploy

Use a conta staging-v4@afiliadospro.local. Os exemplos pressupõem $kaelHeaders com o JWT dessa conta, obtido pelo login ja utilizado.

```powershell
$kaelBase = "https://afiliados-pro-v4-staging.onrender.com"
$kaelLink = Read-Host "Cole o link de afiliado do produto"
$kaelBody = @{ link = $kaelLink.Trim() } | ConvertTo-Json
$kaelCriacao = Invoke-RestMethod -Method Post -Uri "$kaelBase/campaigns/from-link" -Headers $kaelHeaders -ContentType "application/json" -Body $kaelBody -TimeoutSec 60 -ErrorAction Stop
$kaelCriacao | ConvertTo-Json -Depth 5
```

Depois consulte a tarefa (sem repetir o POST para acompanhar):

```powershell
Invoke-RestMethod -Method Get -Uri "$kaelBase/campaigns/from-link/$($kaelCriacao.task.id)" -Headers $kaelHeaders -TimeoutSec 60 -ErrorAction Stop | ConvertTo-Json -Depth 5
```

Status queued/processing: aguarde. ready: campanha e video disponiveis. failed: leia lastError. Para tentar novamente apos corrigir a causa, envie o mesmo link novamente; a tarefa/campanha sera reutilizada.

## Limites e operacao

- Um worker de renderizacao por processo. Instancias adicionais podem processar em paralelo pela mesma fila.
- FFmpeg consome CPU/memoria: ausencia de creditos de IA nao elimina custo de infraestrutura.
- Nao contorna captcha, login ou restricoes da loja. Catalogos sem anuncio identificado e alguns links curtos podem exigir um link completo com item_id/wid.
- Jobs concluidos/falhos ficam retidos para manter idempotencia. Planejar limpeza de filas/tarefas em uma etapa operacional posterior.
- Ainda precisa de teste real no Render/celular. A interface mobile ja permite colar o link e acompanhar o processamento.

## Licencas

ffmpeg-static e distribuido sob GPL-3.0-or-later. FFmpeg e suas bibliotecas tem suas proprias licencas; consulte o pacote/upstream ao distribuir binarios. A fonte DejaVu acompanha seu arquivo de licenca em assets/fonts/LICENSE-DejaVu.txt.

## Interface mobile

Em Nova Campanha, toque em Criar campanha e video com KAEL. Cole o link e toque em Criar campanha e video. O andamento e consultado automaticamente enquanto a tela esta ativa. A ultima tarefa fica salva por ambiente e usuario, para retomada quando o aplicativo for reaberto. A montagem continua no servidor mesmo com o aplicativo fechado.

Ao concluir, Abrir divulgacao leva ao fluxo de canais existente; selecione a campanha criada. A publicacao nao e disparada por esta tela. Em falha, Tentar novamente retoma a tarefa com o mesmo link. Erros de rede permitem Atualizar acompanhamento sem criar outra campanha.

Validacao local da integracao: TypeScript sem erros, exportacao web do Expo concluida e 202 testes do backend passaram. Teste real de leitura do Mercado Livre/R2/Render e de uso no celular pendente.
