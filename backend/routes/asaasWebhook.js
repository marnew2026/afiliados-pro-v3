import express from "express";
import { asaasWebhook } from "../webhooks/asaasWebhook.js";

const router = express.Router();

router.post("/", asaasWebhook);

export default router;