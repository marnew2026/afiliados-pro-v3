import express from "express";
import { renderInstagramReviewPage } from "../services/review/InstagramReviewPage.js";

const router = express.Router();

router.get("/", (_req, res) => {
  res.set(
    "Content-Security-Policy",
    "default-src 'self'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; connect-src 'self'; img-src 'self' data:; base-uri 'none'; frame-ancestors 'none'"
  );
  res.set("Referrer-Policy", "no-referrer");
  res.set("X-Content-Type-Options", "nosniff");
  return res.status(200).type("html").send(renderInstagramReviewPage());
});

export default router;
