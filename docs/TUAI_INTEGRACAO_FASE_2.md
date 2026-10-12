# Tuaí — Integração Fase 2

## Objetivo

Dar ao Tuaí um catálogo independente e uma memória de comportamento para que o
motor aprenda com fatos observados, não apenas com estimativas.

## Componentes

- `TuaiProduct`: produto, origem, link afiliado, preço, confiança e métricas.
- `TuaiEvent`: impressão, clique, salvamento e conversão.
- `POST /tuai/v1/events`: registra eventos validados.
- `GET /tuai/v1/out/:productId`: contabiliza o clique e redireciona para a loja.
- `GET /tuai/v1/feed`: prioriza o catálogo Tuaí e usa campanhas como transição.

## Proteções

- Sessão armazenada apenas como hash.
- Cliques e impressões repetidos em 30 segundos não aumentam a métrica.
- Eventos desconhecidos e produtos inválidos são rejeitados.
- Conversão e receita exigem o segredo `TUAI_EVENT_SECRET` no servidor.
- Hash de sessão exige `TUAI_SESSION_HASH_SECRET` (ou usa o segredo de eventos).
- O aplicativo consumidor não recebe o link afiliado original no feed.

## Próximo marco

Criar importação autorizada de catálogos, painel de curadoria e a primeira
tela vertical do aplicativo Tuaí.
