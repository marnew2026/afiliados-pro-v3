import express from "express";

export const TIKTOK_VERIFICATION_FILENAME =
  "tiktokLdygK6cKRFkKjorbh1uoLxyXlXpGlU0Z.txt";

export const TIKTOK_VERIFICATION_CONTENT =
  "tiktok-developers-site-verification=LdygK6cKRFkKjorbh1uoLxyXlXpGlU0Z";

const router = express.Router();

router.get(`/${TIKTOK_VERIFICATION_FILENAME}`, (req, res) =>
  res
    .status(200)
    .type("text/plain")
    .set("Cache-Control", "public, max-age=300")
    .send(TIKTOK_VERIFICATION_CONTENT)
);

export default router;
