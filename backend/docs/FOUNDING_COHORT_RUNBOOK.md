# Lancamento dos 1.000 Fundadores

## Oferta aprovada

- Ate 1.000 novos usuarios.
- 30 dias de acesso PRO gratuito.
- Sem cartao no cadastro.
- Uma concessao por usuario.
- Preco de referencia apos o periodo: R$ 29,90 por mes.
- A campanha permanece desativada ate a decisao formal de lancamento.

## Variaveis

Configuracao segura enquanto a campanha nao foi lancada:

```text
FOUNDING_COHORT_ENABLED=false
FOUNDING_COHORT_LIMIT=1000
FOUNDING_COHORT_DURATION_DAYS=30
```

Opcionais, sempre em ISO 8601:

```text
FOUNDING_COHORT_START_AT=2026-10-01T12:00:00.000Z
FOUNDING_COHORT_END_AT=2026-10-31T23:59:59.000Z
```

Sem `START_AT`, a campanha comeca quando `ENABLED=true` for aplicado. Sem `END_AT`, ela termina somente ao ocupar as vagas ou quando for desativada.

## Comportamento

No cadastro de um novo usuario elegivel:

1. o servidor reserva uma vaga por incremento atomico;
2. o usuario recebe `plan=PRO` e `isPro=true`;
3. a origem fica registrada como `FOUNDER_TRIAL`;
4. a expiracao e calculada individualmente em 30 dias;
5. o numero da vaga e registrado no usuario;
6. se o salvamento falhar, a vaga e devolvida;
7. ao expirar, o acesso volta para `FREE` no proximo login ou acesso autenticado;
8. uma assinatura Stripe substitui a origem por `STRIPE` e nao e expirada pela regra fundadora.

## Metricas administrativas

Rota protegida:

```text
GET /admin/founding-cohort
```

Retorna apenas para os emails de `INTEGRATION_ADMIN_EMAILS`:

- limite;
- vagas concedidas;
- vagas restantes;
- testes ativos;
- testes expirados;
- fundadores convertidos para Stripe;
- taxa de conversao.

Nenhuma senha, token ou dado de pagamento e retornado.

## Ativacao em staging

1. manter `FOUNDING_COHORT_ENABLED=false` no primeiro deploy;
2. validar cadastro normal FREE;
3. configurar limite pequeno em staging, por exemplo `FOUNDING_COHORT_LIMIT=3`;
4. definir `FOUNDING_COHORT_DURATION_DAYS=30`;
5. definir `FOUNDING_COHORT_ENABLED=true`;
6. cadastrar uma conta de teste nova;
7. confirmar banner Fundador, numero da vaga e dias restantes;
8. consultar `/admin/founding-cohort`;
9. confirmar que uma assinatura Stripe muda a origem para `STRIPE`;
10. voltar `FOUNDING_COHORT_ENABLED=false` ao terminar.

Nunca use emails reais de clientes em testes de staging.

## Ativacao em producao

Somente depois da validacao de staging:

1. confirmar preco e texto final da oferta;
2. revisar Termos e Politica de Privacidade;
3. definir `LIMIT=1000` e `DURATION_DAYS=30`;
4. definir a data inicial e, se desejado, a data final;
5. criar backup antes do lancamento;
6. ativar `ENABLED=true`;
7. acompanhar as primeiras concessoes e o contador;
8. desativar imediatamente se os numeros divergirem.

## Encerramento emergencial

Definir:

```text
FOUNDING_COHORT_ENABLED=false
```

Isso interrompe novas concessoes sem remover o periodo ja prometido a quem recebeu uma vaga.

## Indicadores para decidir a continuidade

- ativacao: usuarios que criaram ao menos uma campanha;
- primeiro valor: usuarios que publicaram ou agendaram uma divulgacao;
- retencao: retorno nos dias 7, 14 e 28;
- uso do KAEL;
- falhas por canal;
- conversao para R$ 29,90;
- cancelamentos e motivos;
- sugestoes mais repetidas.

O objetivo nao e apenas ocupar 1.000 vagas, mas provar que o usuario percebe valor antes do fim dos 30 dias.
