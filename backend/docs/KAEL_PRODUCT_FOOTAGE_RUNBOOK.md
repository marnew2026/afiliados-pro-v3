# Filmagens reais de produtos — staging

O operador abastece o acervo. O usuario continua cadastrando links. Este patch nao baixa Clips do Mercado Livre, nao fornece filmagens e nao altera videos ja prontos.

## Configuracao

Mantenha KAEL_PRODUCT_VIDEO_STYLE=narrated_v2. Configure KAEL_PRODUCT_FOOTAGE_DIR para uma pasta persistente do servidor, contendo catalog.json e os MP4. Nao inclua autorizacoes particulares ou filmagens no repositorio publico. Em Render, use disco persistente quando disponivel; a pasta temporaria nao sobrevive a deploys. Sem a variavel, o comportamento atual permanece.

Exemplo de catalog.json (substitua produto, evidencia e validade reais):

```json
{
  "version": 1,
  "entries": [{
    "provider": "mercadolivre",
    "itemId": "MLB7071403358",
    "active": true,
    "files": ["faixas/demonstracao.mp4", "faixas/detalhes.mp4"],
    "rights": {
      "editing": true,
      "socialPublishing": true,
      "evidence": "referencia-da-autorizacao-do-responsavel",
      "expiresAt": "2027-10-03T00:00:00Z"
    }
  }]
}
```

Cadastre somente autorizacoes que cubram edicao e publicacao comercial em TODAS as redes utilizadas. Os campos registram sua verificacao; nao constituem autorizacao por si mesmos. Use filmagens sem musica ou vozes de terceiros: o KAEL substitui o audio pela narracao e trilha atual.

Correspondencia e por provider + itemId exatos, sem escolha por titulo parecido. Ate quatro arquivos MP4 locais, cada um ate 100 MB. Caminhos externos e symlinks que escapam da pasta sao recusados. Sem entrada ativa e autorizada, utiliza imagens. Entrada selecionada com arquivo corrompido falha explicitamente. Autorizacao e conferida na montagem; este patch nao implementa revogacao de videos derivados ja armazenados.

A montagem conserva o layout atual, narracao, legendas e trilha, trocando as fotos pelas filmagens. Arquivos curtos sao repetidos; para evitar repeticao visual, forneca tomadas suficientes para as quatro cenas. Nao e ainda um editor que detecta os melhores momentos.

## Verificacao

node --test tests/productFootageCatalog.test.js tests/productVideo.test.js tests/narratedProductVideo.test.js

Teste em staging com nova tarefa/produto com entrada no acervo; videos prontos sao reutilizados. Confira produto correto, movimento, enquadramento, audio e legendas antes de ativar publicacao desse teste.
