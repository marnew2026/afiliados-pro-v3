import express from "express";

import {
  renderDataDeletion,
  renderPrivacyPolicy,
  renderTermsOfService,
} from "../services/legal/LegalPageService.js";

const router = express.Router();

function sendLegalPage(renderer, req, res) {
  try {
    const html = renderer({
      contactEmail: process.env.LEGAL_CONTACT_EMAIL,
    });

    return res
      .status(200)
      .type("html")
      .set("Cache-Control", "public, max-age=300")
      .send(html);
  } catch (error) {
    console.error("ERRO LEGAL PAGE:", error.message);
    return res.status(503).type("text").send(
      "Pagina temporariamente indisponivel."
    );
  }
}

router.get("/privacy", (req, res) =>
  sendLegalPage(renderPrivacyPolicy, req, res)
);

router.get("/terms", (req, res) =>
  sendLegalPage(renderTermsOfService, req, res)
);

router.get("/data-deletion", (req, res) =>
  sendLegalPage(renderDataDeletion, req, res)
);

export default router;
