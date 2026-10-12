# Relatório de evolução — Tuaí Fase 2

Data: 12/10/2026

## Entregue

- Catálogo independente com o modelo `TuaiProduct`.
- Histórico de comportamento com o modelo `TuaiEvent`.
- Eventos de impressão, clique, salvamento e conversão.
- Bloqueio de repetição imediata de impressão e clique.
- Sessão transformada em hash antes de ser armazenada.
- Conversões aceitas somente de uma origem autenticada por segredo do servidor.
- Redirecionamento rastreável para o link afiliado.
- Feed compatível com as campanhas existentes enquanto o catálogo Tuaí é
  alimentado.

## Variáveis necessárias no ambiente de testes

- `TUAI_EVENT_SECRET`: protege conversões confirmadas pelo backend/parceiro.
- `TUAI_SESSION_HASH_SECRET`: protege a identificação anônima das sessões.

Esses valores não devem ser colocados no código nem enviados ao aplicativo.

## Validação

- Testes unitários do motor e da política de eventos.
- Verificação de sintaxe das novas rotas e serviços.
- Compilação do frontend e checagem TypeScript do mobile.

## Limite atual

O sistema já consegue guardar aprendizado, mas ainda precisa receber produtos
por uma importação autorizada e ser ligado à primeira tela do aplicativo Tuaí.
