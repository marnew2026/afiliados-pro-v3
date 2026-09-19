# Visibilidade administrativa

- O backend calcula `isAdmin` usando `INTEGRATION_ADMIN_EMAILS`.
- O aplicativo recebe somente `true` ou `false`; a lista de emails nao e exposta.
- O botao administrativo aparece apenas quando `isAdmin` e verdadeiro.
- A tela administrativa trata `401` e `403` com uma tela de acesso restrito.
- A protecao real permanece no backend; a ocultacao visual e uma melhoria de experiencia.
