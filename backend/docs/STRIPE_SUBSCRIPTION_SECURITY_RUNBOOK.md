# Segurança do checkout e da assinatura Stripe

## Garantias

- `POST /checkout/create-checkout` exige JWT válido.
- E-mail e ID usados no checkout vêm do usuário autenticado, nunca do corpo da requisição.
- A Checkout Session e a Subscription recebem `metadata.userId` e `purpose`.
- O webhook continua usando o corpo bruto antes de `express.json()` para validar a assinatura Stripe.
- A ativação PRO procura o usuário pelo ID interno assinado pela Stripe.
- `stripeLastCheckoutSessionId` torna a ativação repetida idempotente.
- Cancelamento só remove acesso originado pela mesma assinatura Stripe.
- Falha de cobrança marca `past_due`, sem cancelar antes das tentativas automáticas da Stripe.

## Eventos necessários no webhook Stripe

- `checkout.session.completed`
- `customer.subscription.deleted`
- `invoice.payment_failed`

Endpoint: `https://SEU_DOMINIO/stripe/webhook`

## Validação antes de produção

1. Confirmar `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID`, `STRIPE_WEBHOOK_SECRET` e `BASE_URL`.
2. Criar checkout usando uma conta de teste autenticada.
3. Pagar com cartão de teste da Stripe.
4. Confirmar que apenas a conta autenticada recebeu plano PRO.
5. Reenviar o mesmo evento no painel Stripe e confirmar que o estado não foi duplicado.
6. Cancelar a assinatura de teste e confirmar retorno ao plano FREE.
