# Protecao das rotas administrativas

## Rotas protegidas

- `/adminWithdraw`
- `/admin/dashboard`

As duas familias de rotas executam, nesta ordem:

1. `protect`: valida o JWT e carrega o usuario atual.
2. `requireIntegrationAdmin`: permite apenas emails configurados em `INTEGRATION_ADMIN_EMAILS`.

## Minimizacao de dados

A listagem administrativa de saques retorna somente `_id`, `name`, `email`, `plan` e `isPro` do usuario associado. Senha, tokens e demais campos internos nao sao selecionados.

## Validacao em staging

- Sem token: resposta `401`.
- Token de usuario comum: resposta `403`.
- Token administrativo autorizado: resposta `200`.
