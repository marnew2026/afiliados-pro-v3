# Tuaí — Integração Fase 1

Esta fase cria uma ponte controlada entre o Afiliados Pro e o futuro aplicativo
Tuaí. O Afiliados Pro continua sendo a central profissional de campanhas. O
Tuaí consumirá apenas dados preparados por uma API própria.

## Entregue nesta fase

- Motor determinístico e explicável de oportunidades.
- Pontuação baseada em interesse, conversão, receita, atualidade e confiança.
- Rota de saúde: `GET /tuai/v1/health`.
- Feed inicial: `GET /tuai/v1/feed?limit=20`.
- Resposta sem `userId`, carteira ou dados privados do afiliado.
- Testes automatizados do motor.

## Limites atuais

- A pontuação ainda usa o histórico interno de campanhas.
- Tendências externas, catálogo de parceiros e eventos do consumidor entram
  nas fases seguintes.
- O feed não constitui garantia de venda ou renda.

## Próxima fase

Criar os modelos independentes de produto, oferta e evento do Tuaí; depois
registrar impressão, clique, salvamento e conversão para aprendizado contínuo.
