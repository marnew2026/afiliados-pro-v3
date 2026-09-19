# Painel Administrativo da Beta

## Objetivo

Exibir metricas, fundadores e opinioes recentes em uma tela administrativa somente para leitura.

## Seguranca

- A rota continua protegida por `protect` e `requireIntegrationAdmin`.
- A resposta individual usa apenas o numero publico da vaga fundadora.
- Nome, email, ID interno, token e credenciais nao sao retornados.
- O painel nao ativa nem desativa a campanha fundadora.

## Validacao

1. Execute todos os testes do backend.
2. Execute `npx tsc --noEmit` no aplicativo.
3. Entre com a conta administrativa e abra `Painel Admin > Centro da Beta`.
4. Confirme os blocos `Fundadores` e `Opinioes recentes`.
