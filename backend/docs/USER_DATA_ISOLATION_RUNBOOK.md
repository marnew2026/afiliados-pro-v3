# Isolamento de dados por usuario

## Rotas protegidas

- `GET /dashboard/:userId`
- `GET /wallet/:userId`
- `GET /campaigns/user/:userId`
- `POST /withdraw/create`

Todas exigem JWT valido e confirmam que o `userId` solicitado pertence ao usuario autenticado.

## Diagnostico financeiro

As rotas `/dashboard/debug/finance/:userId` e `/dashboard/debug/ledger-total/:userId` exigem JWT e permissao administrativa.

## Idempotencia de saque

A busca de um saque duplicado passou a combinar `withdrawId` e `userId`, evitando que um identificador pertencente a outra conta seja retornado.

## Respostas esperadas

- Sem token: `401`.
- Token valido tentando acessar outro usuario: `403`.
- Dono autenticado: fluxo normal.
