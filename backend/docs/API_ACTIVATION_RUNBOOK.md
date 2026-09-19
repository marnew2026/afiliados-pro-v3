# Kit de Ativacao Segura das APIs

Este roteiro e a referencia operacional para ativar Facebook, Instagram, TikTok e, futuramente, Kwai no Afiliados Pro. Nenhuma credencial, token ou senha deve ser registrada neste arquivo, em commits, capturas de tela ou mensagens.

## Regra de ouro

Uma integracao so pode executar quando:

1. a aprovacao oficial estiver confirmada;
2. as credenciais e URLs oficiais estiverem configuradas;
3. a chave `*_ENABLED` estiver explicitamente como `true`;
4. o desligamento emergencial `*_EMERGENCY_DISABLED` nao estiver ativo.

O bloqueio e aplicado em dois pontos: ao criar uma distribuicao e novamente no worker antes de chamar a API externa. Assim, uma tarefa que ja estava na fila tambem e interrompida se o desligamento emergencial for ativado.

`*_STAGING_TESTED` e `*_PRODUCTION_RELEASED` registram a progressao operacional. Eles nao substituem aprovacao, habilitacao nem o desligamento emergencial.

## Estado esperado enquanto as analises estao pendentes

| Canal | Aprovacao | Habilitado | Testado em staging | Producao |
|---|---|---:|---:|---:|
| Telegram | approved | true | true | false |
| Facebook | pending | false | false | false |
| Instagram | pending | false | false | false |
| TikTok | pending | false | false | false |
| Kwai | pending | false | false | false |

Nao altere um canal pendente apenas para fazer o painel ficar verde.

## Enderecos do staging

Base atual:

`https://afiliados-pro-v4-staging.onrender.com`

Callbacks oficiais que devem coincidir exatamente com os paineis dos provedores:

| Canal | Callback |
|---|---|
| Facebook | `https://afiliados-pro-v4-staging.onrender.com/channel/facebook/oauth/callback` |
| Instagram | `https://afiliados-pro-v4-staging.onrender.com/channel/instagram/oauth/callback` |
| TikTok | `https://afiliados-pro-v4-staging.onrender.com/channel/tiktok/oauth/callback` |

Paginas publicas exigidas para revisao:

- Politica de privacidade: `https://afiliados-pro-v4-staging.onrender.com/legal/privacy`
- Termos: `https://afiliados-pro-v4-staging.onrender.com/legal/terms`
- Exclusao de dados: `https://afiliados-pro-v4-staging.onrender.com/legal/data-deletion`
- Desautorizacao do Instagram: `POST https://afiliados-pro-v4-staging.onrender.com/legal/instagram/deauthorize`

## Facebook

Permissoes solicitadas pelo codigo:

- `pages_show_list`
- `pages_read_engagement`
- `pages_manage_posts`

Variaveis necessarias:

- `FACEBOOK_APP_ID`
- `FACEBOOK_APP_SECRET`
- `FACEBOOK_REDIRECT_URI`
- `META_GRAPH_API_VERSION`
- `JWT_SECRET`
- `CHANNEL_CREDENTIAL_KEY`
- `FACEBOOK_PAGE_ID` somente se for necessario fixar uma Pagina autorizada

Controles operacionais:

- `FACEBOOK_API_APPROVAL_STATUS=pending|approved|rejected`
- `FACEBOOK_ENABLED=true|false`
- `FACEBOOK_STAGING_TESTED=true|false`
- `FACEBOOK_PRODUCTION_RELEASED=true|false`
- `FACEBOOK_EMERGENCY_DISABLED=true|false`

Teste de aceitacao em staging:

1. confirmar por escrito a aprovacao das permissoes solicitadas;
2. definir `FACEBOOK_API_APPROVAL_STATUS=approved`, mantendo `FACEBOOK_ENABLED=false`;
3. confirmar no Centro de Prontidao que nao ha configuracao ausente;
4. definir `FACEBOOK_ENABLED=true` somente no staging;
5. conectar uma Pagina de teste autorizada pelo OAuth;
6. publicar um unico Reel vertical de teste;
7. confirmar identificador externo, estado publicado e destino correto;
8. definir `FACEBOOK_STAGING_TESTED=true`;
9. manter `FACEBOOK_PRODUCTION_RELEASED=false`.

## Instagram

Permissoes solicitadas pelo codigo:

- `instagram_business_basic`
- `instagram_business_content_publish`

Variaveis necessarias:

- `INSTAGRAM_APP_ID`
- `INSTAGRAM_APP_SECRET`
- `INSTAGRAM_REDIRECT_URI`
- `JWT_SECRET`
- `CHANNEL_CREDENTIAL_KEY`

Controles operacionais:

- `INSTAGRAM_API_APPROVAL_STATUS=pending|approved|rejected`
- `INSTAGRAM_ENABLED=true|false`
- `INSTAGRAM_STAGING_TESTED=true|false`
- `INSTAGRAM_PRODUCTION_RELEASED=true|false`
- `INSTAGRAM_EMERGENCY_DISABLED=true|false`

Teste de aceitacao em staging:

1. confirmar por escrito a aprovacao das permissoes solicitadas;
2. definir `INSTAGRAM_API_APPROVAL_STATUS=approved`, mantendo `INSTAGRAM_ENABLED=false`;
3. confirmar no Centro de Prontidao que nao ha configuracao ausente;
4. definir `INSTAGRAM_ENABLED=true` somente no staging;
5. conectar uma conta profissional de teste pelo OAuth;
6. abrir a pagina de revisao e confirmar conta, video e consentimento;
7. publicar um unico Reel e aguardar o container chegar a `FINISHED`;
8. confirmar identificador externo, estado publicado e destino correto;
9. validar o fluxo de desautorizacao sem afetar outra conexao;
10. definir `INSTAGRAM_STAGING_TESTED=true`;
11. manter `INSTAGRAM_PRODUCTION_RELEASED=false`.

## TikTok

Permissoes solicitadas pelo codigo:

- `user.info.basic`
- `video.publish`
- `video.upload`

Variaveis necessarias:

- `TIKTOK_CLIENT_KEY`
- `TIKTOK_CLIENT_SECRET`
- `TIKTOK_REDIRECT_URI`
- `JWT_SECRET`
- `CHANNEL_CREDENTIAL_KEY`

Controles operacionais:

- `TIKTOK_API_APPROVAL_STATUS=pending|approved|rejected`
- `TIKTOK_ENABLED=true|false`
- `TIKTOK_STAGING_TESTED=true|false`
- `TIKTOK_PRODUCTION_RELEASED=true|false`
- `TIKTOK_EMERGENCY_DISABLED=true|false`

Teste de aceitacao em staging:

1. confirmar por escrito a aprovacao dos produtos e escopos solicitados;
2. definir `TIKTOK_API_APPROVAL_STATUS=approved`, mantendo `TIKTOK_ENABLED=false`;
3. confirmar no Centro de Prontidao que nao ha configuracao ausente;
4. definir `TIKTOK_ENABLED=true` somente no staging;
5. conectar uma conta de teste pelo OAuth;
6. consultar as opcoes atuais do criador;
7. enviar primeiro um rascunho e confirmar sua chegada a caixa de entrada;
8. executar depois um teste direto com privacidade `SELF_ONLY`;
9. confirmar identificador externo, estado publicado e destino correto;
10. definir `TIKTOK_STAGING_TESTED=true`;
11. manter `TIKTOK_PRODUCTION_RELEASED=false`.

## Kwai

O scaffold permanece bloqueado. Nao inventar nomes de credenciais, URLs, escopos ou regras de status.

Somente iniciar a implementacao final quando o Kwai fornecer documentacao oficial aplicavel, acesso aprovado, credenciais, endpoints OAuth/publicacao, escopos e regras de consulta de status.

Controles ja reservados:

- `KWAI_API_APPROVAL_STATUS=pending|approved|rejected`
- `KWAI_ENABLED=true|false`
- `KWAI_STAGING_TESTED=true|false`
- `KWAI_PRODUCTION_RELEASED=true|false`
- `KWAI_EMERGENCY_DISABLED=true|false`

Enquanto essas informacoes nao existirem, manter `KWAI_API_APPROVAL_STATUS=pending` e `KWAI_ENABLED=false`.

## Promocao de staging para producao

Para cada canal, registrar estas evidencias antes da liberacao:

- data e referencia da aprovacao oficial;
- conta de teste e destino usados, sem tokens;
- tipo e identificador interno da distribuicao;
- identificador externo retornado pelo provedor;
- resultado do rascunho ou publicacao privada;
- verificacao de que outro usuario nao acessa o asset nem o destino;
- teste do desligamento emergencial;
- responsavel que aprovou a promocao.

Somente depois disso:

1. definir `*_STAGING_TESTED=true`;
2. repetir a configuracao no ambiente de producao sem copiar tokens de teste;
3. definir `*_ENABLED=true` em producao;
4. executar uma publicacao controlada;
5. definir `*_PRODUCTION_RELEASED=true`.

## Desligamento e recuperacao

Em incidente, vazamento suspeito, publicacao indevida ou comportamento inesperado:

1. definir imediatamente `CANAL_EMERGENCY_DISABLED=true` no ambiente afetado;
2. realizar o deploy/restart necessario para aplicar a variavel;
3. confirmar no Centro de Prontidao o bloqueador `emergency_disabled`;
4. investigar filas, conexoes e distribuicoes afetadas;
5. revogar ou renovar credenciais no provedor se houver suspeita de exposicao;
6. corrigir e repetir os testes em staging;
7. somente entao retornar `CANAL_EMERGENCY_DISABLED=false`.

Como segundo bloqueio, `CANAL_ENABLED=false` tambem impede novas criacoes e execucoes.

## Verificacao tecnica antes de cada deploy

No diretorio `backend`:

```powershell
$tests = Get-ChildItem ".\tests\*.test.js" | ForEach-Object { $_.FullName }
node --test $tests
```

Na raiz do repositorio:

```powershell
git diff --check
git status --short
```

O deploy nao deve prosseguir com testes falhando, arquivos inesperados ou segredos no diff.
