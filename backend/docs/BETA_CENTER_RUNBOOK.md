# Centro da Beta

## Objetivo

Medir se os usuarios fundadores percebem valor durante os 30 dias gratuitos sem armazenar navegacao detalhada ou dados desnecessarios.

## Indicadores

- ativacao: criou pelo menos uma campanha;
- primeiro valor: concluiu pelo menos uma distribuicao;
- KAEL: possui distribuicao criada pelo Autopilot;
- retencao: voltou ao aplicativo depois dos dias 7, 14 e 28;
- conversao: mudou de `FOUNDER_TRIAL` para `STRIPE`;
- opiniao: nota, recomendacao, recurso mais valioso, maior dificuldade e comentario opcional.

## Privacidade

O registro diario de atividade armazena somente:

- identificador interno do usuario;
- dia em UTC;
- primeiro e ultimo acesso daquele dia;
- quantidade de requisicoes autenticadas no dia.

Nao armazena pagina visitada, texto digitado, senha, token, IP ou conteudo das campanhas.

## Rotas

Fundador autenticado:

```text
GET  /beta/feedback
POST /beta/feedback
```

Administrador autorizado:

```text
GET /admin/founding-cohort
```

O painel administrativo retorna contagens agregadas, sem listar emails ou comentarios individuais.

## Ambientes do aplicativo

O aplicativo usa producao por padrao:

```text
https://afiliados-pro-v3-2.onrender.com
```

Para executar localmente contra staging no PowerShell:

```powershell
$env:EXPO_PUBLIC_API_URL="https://afiliados-pro-v4-staging.onrender.com"
npx expo start --clear
```

Feche o terminal ao terminar o teste. Nao publique uma build de producao com a URL de staging.

## Validacao de staging

1. manter `FOUNDING_COHORT_ENABLED=false`;
2. entrar com a conta fundadora ficticia ja criada;
3. confirmar o banner Fundador e a data restante;
4. abrir `Enviar opiniao`;
5. enviar uma resposta de teste;
6. entrar como administrador e abrir o Centro da Beta;
7. confirmar uma resposta, nota media e recomendacao;
8. atualizar a tela e confirmar que nao duplica o feedback;
9. confirmar que usuario nao fundador recebe `403` na rota de feedback.

## Interpretacao

Os indicadores servem para orientar decisoes, nao para punir usuarios. Comentarios individuais devem ser acessados somente quando houver uma necessidade de suporte e uma futura tela autorizada para isso.
