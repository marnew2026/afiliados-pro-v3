import test from "node:test";
import assert from "node:assert/strict";

import {
  renderDataDeletion,
  renderPrivacyPolicy,
  renderTermsOfService,
} from "../services/legal/LegalPageService.js";

const contactEmail = "privacidade@example.test";

test("gera paginas legais publicas com contato configurado", () => {
  const privacy = renderPrivacyPolicy({ contactEmail });
  const terms = renderTermsOfService({ contactEmail });
  const deletion = renderDataDeletion({ contactEmail });

  assert.match(privacy, /Política de Privacidade/);
  assert.match(privacy, /LGPD/);
  assert.match(privacy, new RegExp(contactEmail));
  assert.match(terms, /Termos de Serviço/);
  assert.match(terms, /Publicações automatizadas/);
  assert.match(deletion, /Exclusão de Dados/);
  assert.match(deletion, /Não envie senhas, tokens/);
});

test("recusa publicar paginas sem email de contato valido", () => {
  assert.throws(
    () => renderPrivacyPolicy({ contactEmail: "" }),
    /LEGAL_CONTACT_EMAIL/
  );

  assert.throws(
    () => renderTermsOfService({ contactEmail: "email-invalido" }),
    /LEGAL_CONTACT_EMAIL/
  );
});
