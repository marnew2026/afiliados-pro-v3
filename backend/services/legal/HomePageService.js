export function renderHomePage() {
  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="index,follow">
  <meta name="description" content="Afiliados Pro organiza campanhas e conteúdos em uma operação de distribuição digital com controle, rastreabilidade e apoio do KAEL.">
  <meta name="theme-color" content="#101735">
  <title>Afiliados Pro | Sua operação de divulgação em movimento</title>
  <style>
    :root { color-scheme: light; --ink:#192347; --muted:#586583; --line:#e0e6f2; }
    * { box-sizing:border-box; }
    html { scroll-behavior:smooth; }
    body { margin:0; color:var(--ink); background:#f8faff; font:16px/1.6 system-ui,-apple-system,Segoe UI,sans-serif; }
    a { color:inherit; }
    .wrap { width:min(1160px,calc(100% - 40px)); margin-inline:auto; }
    header,footer { background:#101735; color:white; }
    .nav { min-height:76px; display:flex; align-items:center; justify-content:space-between; gap:20px; }
    .brand { display:flex; align-items:center; gap:11px; font-size:1.23rem; font-weight:800; text-decoration:none; letter-spacing:-.03em; }
    .mark { display:grid; place-items:center; width:35px; height:35px; border-radius:11px; color:#101735; background:#78ebcb; font-weight:900; }
    nav { display:flex; flex-wrap:wrap; gap:24px; font-size:.9rem; }
    nav a { color:#dce4ff; text-decoration:none; }
    nav a:hover,footer a:hover { text-decoration:underline; }
    .hero { color:white; background:radial-gradient(circle at 85% 25%,#303f8e 0,transparent 37%),linear-gradient(135deg,#101735,#192759); }
    .hero-grid { display:grid; grid-template-columns:1.1fr .9fr; align-items:center; gap:55px; min-height:560px; padding-block:65px 85px; }
    .eyebrow { display:inline-block; color:#78ebcb; font-size:.76rem; font-weight:800; letter-spacing:.16em; text-transform:uppercase; }
    h1 { font-size:clamp(2.6rem,5.2vw,4.9rem); line-height:1.07; letter-spacing:-.055em; margin:20px 0 24px; }
    .hero p { max-width:580px; color:#dce5ff; font-size:1.14rem; }
    .actions { display:flex; align-items:center; flex-wrap:wrap; gap:22px; margin-top:34px; }
    .button { background:#78ebcb; color:#10214a; padding:13px 21px; border-radius:10px; font-weight:800; text-decoration:none; }
    .actions .secondary { color:#eef4ff; text-underline-offset:5px; }
    .visual { padding:25px; border:1px solid #ffffff39; border-radius:24px; background:#ffffff10; box-shadow:0 28px 75px #070d2a66; }
    .visual-title { color:#c5d3ff; font-size:.8rem; font-weight:700; letter-spacing:.1em; text-transform:uppercase; }
    .step { display:flex; align-items:center; gap:15px; margin-top:13px; padding:16px; border-radius:14px; background:white; color:#19264c; }
    .number { display:grid; place-items:center; flex:0 0 34px; height:34px; border-radius:10px; background:#e9edff; color:#243db5; font-size:.88rem; font-weight:800; }
    .step strong { display:block; font-size:.94rem; }
    .step small { color:#596781; }
    .visual-foot { margin-top:18px; color:#9ff0d8; font-size:.84rem; }
    .content { padding-block:88px; }
    .intro { max-width:750px; }
    h2 { font-size:clamp(2rem,3.5vw,3rem); line-height:1.16; letter-spacing:-.045em; margin:14px 0 18px; }
    .content p { color:var(--muted); font-size:1.05rem; }
    .dark-label { color:#3d55d8; }
    .cards { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; margin-top:38px; }
    .card { padding:28px; border:1px solid var(--line); border-radius:18px; background:white; box-shadow:0 12px 40px #15264a08; }
    .icon { display:grid; place-items:center; width:43px; height:43px; border-radius:12px; background:#e9edff; color:#354bcb; font-size:1.4rem; font-weight:700; }
    .card h3 { margin:23px 0 8px; font-size:1.2rem; }
    .card p { margin:0; }
    .kael { background:#eaf0ff; }
    .split { display:grid; grid-template-columns:1fr 1fr; align-items:center; gap:65px; }
    .panel { padding:36px; border-radius:22px; background:#111a3a; color:white; box-shadow:0 22px 55px #14205725; }
    .panel .eyebrow { color:#78ebcb; }
    .panel p { color:#dbe3ff; }
    .cycle { display:flex; flex-wrap:wrap; gap:9px; margin-top:26px; }
    .cycle span { padding:7px 12px; border:1px solid #7080ba; border-radius:100px; font-size:.82rem; }
    .trust { background:white; border-top:1px solid var(--line); }
    .trust a { color:#354bcb; }
    footer { padding:36px 0; color:#cdd8f5; }
    .footer-inner { display:flex; justify-content:space-between; gap:25px; flex-wrap:wrap; }
    footer strong { color:white; }
    .footer-links { display:flex; flex-wrap:wrap; gap:18px; }
    footer a { color:#dce4ff; }
    @media(max-width:800px) { .hero-grid,.split { grid-template-columns:1fr; gap:35px; } .hero-grid { padding-block:64px; } .visual { max-width:550px; } .cards { grid-template-columns:1fr; } .content { padding-block:65px; } }
    @media(max-width:530px) { .nav { align-items:flex-start; flex-direction:column; padding-block:19px; gap:9px; } nav { gap:16px; } .hero-grid { padding-block:55px; } .visual { padding:16px; } }
  </style>
</head>
<body>
  <header><div class="wrap nav"><a class="brand" href="/"><span class="mark" aria-hidden="true">A</span> Afiliados Pro</a><nav aria-label="Navegação principal"><a href="#plataforma">A plataforma</a><a href="#kael">Conheça o KAEL</a><a href="#conexoes">Conexões e dados</a></nav></div></header>
  <main>
    <section class="hero"><div class="wrap hero-grid">
      <div><span class="eyebrow">Sua operação digital em movimento</span><h1>De campanhas soltas a uma operação que avança com você.</h1><p>Organize campanhas e conteúdos, distribua nos canais autorizados e acompanhe o que acontece. O Afiliados Pro reúne sua operação de divulgação em um só lugar, com apoio do KAEL e controle nas suas mãos.</p><div class="actions"><a class="button" href="#plataforma">Entenda a plataforma</a><a class="secondary" href="#kael">Descubra o papel do KAEL →</a></div></div>
      <div class="visual" aria-label="Etapas da operação de divulgação"><div class="visual-title">Sua operação, passo a passo</div><div class="step"><span class="number">01</span><div><strong>Organize</strong><small>Campanhas, links e conteúdos</small></div></div><div class="step"><span class="number">02</span><div><strong>Distribua</strong><small>Publicações em canais autorizados</small></div></div><div class="step"><span class="number">03</span><div><strong>Acompanhe</strong><small>Histórico e métricas disponíveis</small></div></div><div class="step"><span class="number">04</span><div><strong>Melhore</strong><small>Decisões apoiadas por dados</small></div></div><div class="visual-foot">KAEL • assistência e automação sob seu controle</div></div>
    </div></section>
    <section class="content" id="plataforma"><div class="wrap"><div class="intro"><span class="eyebrow dark-label">Muito mais que um link</span><h2>Um lugar para fazer sua divulgação funcionar como operação.</h2><p>Para afiliados e criadores, divulgar envolve preparar materiais, adaptar formatos, manter consistência e entender o desempenho. O Afiliados Pro ajuda a reunir essas etapas e reduzir o trabalho repetitivo.</p></div><div class="cards"><article class="card"><span class="icon" aria-hidden="true">↗</span><h3>Campanhas organizadas</h3><p>Centralize produtos, links e materiais para saber o que está sendo divulgado e onde.</p></article><article class="card"><span class="icon" aria-hidden="true">◎</span><h3>Distribuição com controle</h3><p>Prepare conteúdos e gerencie ações nos canais conectados, conforme permissões e recursos disponíveis.</p></article><article class="card"><span class="icon" aria-hidden="true">▥</span><h3>Histórico e métricas</h3><p>Acompanhe cliques e outros eventos mensuráveis para entender a execução das campanhas.</p></article></div></div></section>
    <section class="content kael" id="kael"><div class="wrap split"><div><span class="eyebrow dark-label">Conheça o KAEL</span><h2>Um parceiro para a rotina. Você continua no comando.</h2><p>KAEL é a camada de assistência e automação do Afiliados Pro. A visão é apoiar o ciclo de preparar, distribuir, rastrear e otimizar campanhas e conteúdos, com níveis de autonomia definidos pelo usuário.</p><p>As funções automáticas são liberadas gradualmente, conforme a integração de cada canal e as autorizações concedidas. Você decide as regras e mantém o controle sobre as contas conectadas.</p></div><div class="panel"><span class="eyebrow">O ciclo KAEL</span><h3>Da ideia ao aprendizado</h3><p>Organização, distribuição e acompanhamento conectados em um fluxo contínuo.</p><div class="cycle"><span>Preparar</span><span>Adaptar</span><span>Programar</span><span>Distribuir</span><span>Rastrear</span><span>Otimizar</span></div></div></div></section>
    <section class="content trust" id="conexoes"><div class="wrap split"><div><span class="eyebrow dark-label">Transparência</span><h2>Suas conexões, suas permissões.</h2></div><div><p>Ao conectar uma conta ou página que você administra, o Afiliados Pro usa os dados e as permissões que você conceder para identificar os canais disponíveis e executar publicações solicitadas ou configuradas por você. O acesso pode ser revogado na plataforma conectada.</p><p>Algumas funções dependem da aprovação e disponibilidade das APIs de terceiros. O serviço não promete vendas, receita, alcance ou crescimento de audiência.</p><p><a href="/legal/privacy">Como tratamos seus dados</a> · <a href="/legal/data-deletion">Como solicitar a exclusão</a></p></div></div></section>
  </main>
  <footer><div class="wrap footer-inner"><div><strong>Afiliados Pro</strong><br>Organize. Distribua. Acompanhe. Evolua.</div><div class="footer-links"><a href="/legal/privacy">Política de Privacidade</a><a href="/legal/terms">Termos de Serviço</a><a href="/legal/data-deletion">Exclusão de dados</a></div></div></footer>
</body>
</html>`;
}
