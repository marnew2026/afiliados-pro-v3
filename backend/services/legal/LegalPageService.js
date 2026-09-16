const UPDATED_AT = "16 de setembro de 2026";

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizeContactEmail(value) {
  const email = String(value || "").trim().toLowerCase();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("LEGAL_CONTACT_EMAIL ausente ou invalido.");
  }

  return email;
}

function renderLayout({ title, contactEmail, content }) {
  const safeTitle = escapeHtml(title);
  const safeEmail = escapeHtml(contactEmail);

  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="index,follow">
  <title>${safeTitle} | Afiliados Pro</title>
  <style>
    :root { color-scheme: light; }
    * { box-sizing: border-box; }
    body { margin: 0; background: #f6f7fb; color: #20222a; font: 16px/1.65 Arial, sans-serif; }
    main { width: min(920px, calc(100% - 32px)); margin: 36px auto; background: white; padding: 36px; border-radius: 16px; box-shadow: 0 8px 30px rgba(20,24,40,.08); }
    h1 { margin-top: 0; font-size: 2rem; }
    h2 { margin-top: 2rem; font-size: 1.25rem; }
    a { color: #3157d5; }
    .meta { color: #626776; }
    footer { margin-top: 36px; padding-top: 20px; border-top: 1px solid #e3e5eb; color: #626776; }
    @media (max-width: 600px) { main { margin: 0; width: 100%; padding: 24px; border-radius: 0; } }
  </style>
</head>
<body>
  <main>
    <h1>${safeTitle}</h1>
    <p class="meta">Última atualização: ${UPDATED_AT}</p>
    ${content}
    <footer>
      <strong>Afiliados Pro</strong><br>
      Contato: <a href="mailto:${safeEmail}">${safeEmail}</a>
    </footer>
  </main>
</body>
</html>`;
}

export function renderPrivacyPolicy({ contactEmail }) {
  const email = normalizeContactEmail(contactEmail);

  return renderLayout({
    title: "Política de Privacidade",
    contactEmail: email,
    content: `
      <p>Esta Política explica como o Afiliados Pro trata dados pessoais quando você usa nossos serviços de criação, organização, publicação e acompanhamento de campanhas de afiliados.</p>

      <h2>1. Dados tratados</h2>
      <p>Podemos tratar dados de cadastro e autenticação, informações de campanhas, registros técnicos de uso, identificadores das redes sociais conectadas, permissões concedidas e dados necessários à prestação, segurança e cobrança dos serviços.</p>

      <h2>2. Conexões com redes sociais</h2>
      <p>Quando você conecta uma rede social, recebemos os identificadores, tokens e permissões que você autorizar. As credenciais são armazenadas de forma protegida e usadas somente para executar as ações solicitadas ou configuradas por você. Você pode revogar a conexão diretamente na rede social ou solicitar sua remoção ao Afiliados Pro.</p>

      <h2>3. Finalidades e bases legais</h2>
      <p>Usamos os dados para autenticar usuários, manter campanhas, publicar conteúdo autorizado, gerar links rastreáveis, processar pagamentos, prevenir fraude, oferecer suporte, cumprir obrigações legais e melhorar a estabilidade do serviço. O tratamento se apoia, conforme o caso, na execução do contrato, consentimento, legítimo interesse e cumprimento de obrigação legal.</p>

      <h2>4. Compartilhamento e operadores</h2>
      <p>Os dados podem ser processados por provedores de hospedagem, banco de dados, filas, armazenamento, pagamentos e pelas plataformas sociais que você conectar. Compartilhamos apenas o necessário para fornecer o serviço, proteger direitos ou cumprir a lei. Não vendemos dados pessoais.</p>

      <h2>5. Transferência internacional</h2>
      <p>Alguns fornecedores e plataformas podem operar fora do Brasil. Nesses casos, adotamos medidas contratuais e técnicas compatíveis com a legislação aplicável.</p>

      <h2>6. Retenção e segurança</h2>
      <p>Mantemos os dados pelo período necessário às finalidades descritas, ao cumprimento de obrigações legais e ao exercício regular de direitos. Aplicamos controles de acesso, criptografia de credenciais, registros de segurança e medidas para reduzir acessos não autorizados.</p>

      <h2>7. Direitos do titular</h2>
      <p>Você pode solicitar confirmação de tratamento, acesso, correção, portabilidade quando aplicável, informação sobre compartilhamento, revogação de consentimento e exclusão ou anonimização nos limites da LGPD. Para exercer seus direitos, use o contato informado ao final desta página.</p>

      <h2>8. Crianças e adolescentes</h2>
      <p>O Afiliados Pro não é direcionado a crianças. Usuários devem possuir capacidade legal para contratar o serviço e atender aos requisitos mínimos de idade das plataformas conectadas.</p>

      <h2>9. Atualizações</h2>
      <p>Esta Política poderá ser atualizada para refletir mudanças legais, técnicas ou operacionais. A versão vigente permanecerá publicada nesta URL.</p>
    `,
  });
}

export function renderTermsOfService({ contactEmail }) {
  const email = normalizeContactEmail(contactEmail);

  return renderLayout({
    title: "Termos de Serviço",
    contactEmail: email,
    content: `
      <p>Estes Termos regulam o uso do Afiliados Pro. Ao criar uma conta ou utilizar o serviço, você declara ter lido e aceitado estas condições.</p>

      <h2>1. Serviço</h2>
      <p>O Afiliados Pro oferece ferramentas para cadastrar campanhas de afiliados, organizar conteúdo, criar links rastreáveis, conectar canais autorizados e agendar ou publicar divulgações.</p>

      <h2>2. Conta e segurança</h2>
      <p>Você é responsável pelas informações da conta, pela confidencialidade das credenciais e por todas as ações autorizadas em seu perfil. Informe imediatamente qualquer suspeita de acesso indevido.</p>

      <h2>3. Plataformas de terceiros</h2>
      <p>Instagram, Facebook, TikTok, Telegram e outras plataformas possuem regras próprias. A conexão depende da autorização do usuário e da disponibilidade de suas APIs. O Afiliados Pro não controla mudanças, suspensões ou limitações impostas por terceiros.</p>

      <h2>4. Conteúdo e campanhas</h2>
      <p>Você continua responsável pelos produtos, links, textos, imagens e vídeos utilizados. É proibido publicar conteúdo ilegal, enganoso, discriminatório, que viole direitos autorais, políticas das plataformas ou regras dos programas de afiliados.</p>

      <h2>5. Publicações automatizadas</h2>
      <p>Recursos automáticos somente podem operar dentro das permissões e limites configurados. O usuário deve revisar suas campanhas, conexões e regras aplicáveis. Autorizações podem ser revogadas a qualquer momento.</p>

      <h2>6. Links, métricas e resultados</h2>
      <p>Métricas e rastreamentos são fornecidos para apoio operacional e podem sofrer atrasos ou diferenças em relação às plataformas externas. Não garantimos vendas, comissões, alcance, monetização ou resultados financeiros.</p>

      <h2>7. Planos e pagamentos</h2>
      <p>Funcionalidades podem variar conforme o plano contratado. Preços, ciclos, cancelamentos e condições comerciais aplicáveis serão apresentados antes da contratação.</p>

      <h2>8. Disponibilidade</h2>
      <p>Buscamos manter o serviço seguro e disponível, mas manutenções, falhas de terceiros ou eventos fora de nosso controle podem causar interrupções. Podemos alterar funcionalidades para preservar segurança, conformidade e estabilidade.</p>

      <h2>9. Suspensão e encerramento</h2>
      <p>Contas podem ser restringidas em caso de fraude, abuso, risco de segurança, violação destes Termos ou exigência legal. O usuário pode solicitar o encerramento e a exclusão de dados, observadas as obrigações de retenção.</p>

      <h2>10. Legislação aplicável</h2>
      <p>Estes Termos são regidos pelas leis brasileiras. Direitos obrigatórios do consumidor e de proteção de dados permanecem preservados.</p>

      <h2>11. Alterações</h2>
      <p>Podemos atualizar estes Termos quando necessário. A versão vigente e sua data de atualização permanecerão publicadas nesta URL.</p>
    `,
  });
}

export function renderDataDeletion({ contactEmail }) {
  const email = normalizeContactEmail(contactEmail);
  const safeEmail = escapeHtml(email);

  return renderLayout({
    title: "Exclusão de Dados",
    contactEmail: email,
    content: `
      <p>Para solicitar a exclusão da sua conta e dos dados associados ao Afiliados Pro, envie um e-mail para <a href="mailto:${safeEmail}?subject=Exclusão%20de%20dados%20-%20Afiliados%20Pro">${safeEmail}</a> com o assunto <strong>Exclusão de dados - Afiliados Pro</strong>.</p>
      <p>Use o e-mail cadastrado na plataforma e informe somente os dados necessários para confirmarmos a titularidade. Não envie senhas, tokens ou códigos de autenticação.</p>
      <p>Após a verificação, removeremos ou anonimizaremos os dados que não precisem ser mantidos para cumprimento de obrigação legal, prevenção de fraude ou exercício regular de direitos.</p>
      <p>Você também pode revogar imediatamente o acesso do Afiliados Pro nas configurações de aplicativos conectados de cada rede social.</p>
    `,
  });
}
