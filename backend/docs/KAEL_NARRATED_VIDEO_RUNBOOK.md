# KAEL: piloto narrado de anúncio

Objetivo de produto: conectar redes uma vez, cadastrar links e habilitar automático. O KAEL cria materiais e distribui segundo a configuração; acompanhamento e métricas pertencem ao dashboard inicial. Este patch implementa somente a nova composição de vídeo. Importação em lote e publicação automática integrada ainda não estão implementadas por este patch.

## O que entrega

- Quatro cenas com abertura, informação do produto, detalhe e chamada para ação.
- Narração em português brasileiro gerada localmente com Piper 1.3.0.
- Trilha instrumental discreta criada por síntese de tons, sem arquivo musical externo.
- Imagens reais do produto; enquadramentos de detalhe quando há uma única imagem.
- Texto derivado do título e dos atributos disponíveis, sem inventar preço ou desconto.
- Saída MP4 720x1280, H.264 e AAC. Legenda sugerida retornada pelo renderizador; seu uso na distribuição será integrado na próxima etapa.
- Opt-in de servidor `KAEL_PRODUCT_VIDEO_STYLE=narrated_v2`; o padrão existente permanece `simple_v1`.

Uma foto de catálogo limita a variedade de cenas: o piloto não simula pessoas usando o produto. Vídeos demonstrativos enviados pelo usuário podem ser incorporados em uma próxima etapa. A voz é sintética; a qualidade editorial ainda precisa da avaliação da amostra.

## Instalação pelo responsável técnico (staging)

No serviço `afiliados-pro-v4-staging`, branch `v4-development`, configurar o Build Command:

```sh
npm install && bash scripts/setup-product-voice.sh
```

O script requer Python 3 com venv e downloads HTTPS do PyPI e Hugging Face. Instala a dependência em `.kael-runtime/venv`, baixa aproximadamente 61 MB de modelo pt_BR-jeff-medium e verifica SHA-256 do modelo e configuração. A pasta é ignorada pelo Git. Se o ambiente não disponibilizar Python/venv, preparar um worker com esse runtime antes de ativar o formato; não ativar com a instalação incompleta.

Variáveis:

```text
KAEL_PRODUCT_VIDEO_ENABLED=true
KAEL_PRODUCT_VIDEO_STYLE=narrated_v2
```

Manter `KAEL_AUTOPILOT_CRON_ENABLED=false` durante a avaliação. Não é necessário Runway, chave de voz ou crédito externo por geração. Há consumo de CPU/RAM do servidor. A capacidade deve ser medida no staging; o tempo obtido localmente não garante o tempo no Render. Worker existente tem concorrência 1.

Caminhos opcionais de uma instalação existente: `KAEL_PIPER_PYTHON` e `KAEL_PIPER_MODEL`. O arquivo `.onnx.json` deve ficar ao lado do modelo. O modelo deve ser pt_BR.

## Validar

```sh
node --test tests/*.test.js
```

No app usando a API de staging, entrar com **staging-v4@afiliadospro.local**. Criar uma campanha com um novo link de produto; abrir o vídeo pronto e verificar áudio e cenas. Campanhas com vídeo pronto continuam reutilizando esse material, inclusive uploads. Este patch não substitui vídeos existentes nem reprocessa automaticamente tarefas já concluídas. A ausência/falha da voz gera erro na tarefa, em vez de marcar um vídeo silencioso como pronto.

Não promover para produção antes de verificar instalação, memória e qualidade no staging. Publicação em redes continua sujeita à autorização válida e aos gates já existentes.

## Dependências e fontes

- Piper: https://github.com/OHF-Voice/piper1-gpl (motor GPL-3.0; preservar os avisos e obrigações de distribuição da dependência).
- Modelo: https://huggingface.co/rhasspy/piper-voices/tree/main/pt/pt_BR/jeff/medium
- Ficha: https://huggingface.co/rhasspy/piper-voices/blob/main/pt/pt_BR/jeff/medium/MODEL_CARD (identifica o conjunto de dados como CC0).
- Fonte DejaVu já fornecida no projeto, com licença em `assets/fonts/LICENSE-DejaVu.txt`.

Próxima entrega: uma única entrada de links/upload na Central, preferência automática persistente, fila por campanha/canal com deduplicação, renovação de autorização quando suportada e resultados reais no dashboard. Falhas de um canal não devem bloquear os demais nem obrigar o usuário a refazer a configuração.
