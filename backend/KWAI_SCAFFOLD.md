# Kwai scaffold

Status: preparado e desativado.

## O que foi adicionado

- `kwai` nos schemas de conexao e distribuicao.
- `KwaiAdapter` com bloqueio seguro por feature flag.
- `CreateKwaiDistributionService` para o fluxo manual de video.
- rota autenticada `POST /distribution/kwai`.
- testes unitarios do adapter e da criacao de distribuicao.

## Regra de ativacao

Nao defina `KWAI_ENABLED=true` enquanto o Kwai nao fornecer:

- documentacao oficial aplicavel ao Kwai internacional;
- credenciais aprovadas;
- endpoints e escopos de OAuth/publicacao;
- regras de consulta do status da publicacao.

Com a flag ausente ou diferente de `true`, o endpoint responde `503` antes de
consultar banco, criar distribuicao ou enfileirar qualquer trabalho.

Mesmo com a flag ativa, o adapter exige um cliente oficial com o contrato
`publishVideo`. Portanto, este scaffold nao realiza chamadas para endpoints
inferidos ou nao documentados.

## Testes

Com as dependencias instaladas:

```bash
node --test tests/*.test.js
```

Resultado no pacote preparado: 51 testes aprovados, 0 falhas.
