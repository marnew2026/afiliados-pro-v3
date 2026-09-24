export function renderHomePage() {
  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="index,follow">
  <meta name="description" content="Afiliados Pro: plataforma para organizar campanhas de afiliados e publicar conteúdo em canais conectados com autorização do usuário.">
  <title>Afiliados Pro | Campanhas de afiliados</title>
  <style>
    :root { color-scheme: light; }
    * { box-sizing: border-box; }
    body { margin: 0; color: #182239; background: #f5f7fc; font: 16px/1.65 Arial, sans-serif; }
    header, main, footer { width: min(1000px, calc(100% - 36px)); margin: auto; }
    header { padding: 28px 0; font-size: 1.2rem; font-weight: 700; }
    main { padding: 48px 0 72px; }
    h1 { max-width: 750px; font-size: clamp(2rem, 5vw, 3.5rem); line-height: 1.15; }
    h2 { font-size: 1.4rem; }
    p { max-width: 760px; }
    .lead { font-size: 1.2rem; }
    .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 18px; margin: 38px 0; }
    .card { background: white; border: 1px solid #e2e7f2; border-radius: 14px; padding: 24px; }
    .card h2 { margin-top: 0; }
    a { color: #244ac0; }
    footer { border-top: 1px solid #dce2ed; padding: 26px 0 40px; }
    footer a { display: inline-block; margin: 0 18px 8px 0; }
  </style>
</head>
<body>
  <header>Afiliados Pro</header>
  <main>
    <h1>Organize e acompanhe suas campanhas de afiliados</h1>
    <p class="lead">O Afiliados Pro é uma plataforma de software para cadastrar campanhas, organizar links de divulgação, acompanhar métricas e gerenciar a publicação de conteúdo em canais conectados.</p>
    <div class="cards">
      <section class="card"><h2>Campanhas</h2><p>Cadastre produtos e links de afiliado e acompanhe o desempenho das suas divulgações em um só lugar.</p></section>
      <section class="card"><h2>Conteúdo</h2><p>Prepare conteúdo para os canais disponíveis e organize as publicações das campanhas.</p></section>
      <section class="card"><h2>Conexões autorizadas</h2><p>Conecte contas e páginas que você administra. O acesso a dados e recursos de cada plataforma depende das permissões concedidas e da disponibilidade da integração.</p></section>
    </div>
    <h2>Como funcionam as conexões sociais</h2>
    <p>Quando você autoriza uma conexão, o Afiliados Pro usa as informações e permissões concedidas para identificar as páginas disponíveis, apresentar as opções de publicação e executar as ações que você solicitar ou configurar. Você pode revogar o acesso na plataforma conectada ou solicitar a remoção dos seus dados.</p>
    <p>Recursos de publicação dependem da aprovação das plataformas e podem não estar disponíveis para todos os usuários. O Afiliados Pro não garante vendas ou resultados financeiros.</p>
  </main>
  <footer>
    <strong>Afiliados Pro</strong><br>
    <a href="/legal/privacy">Política de Privacidade</a>
    <a href="/legal/terms">Termos de Serviço</a>
    <a href="/legal/data-deletion">Exclusão de dados</a>
  </footer>
</body>
</html>`;
}
