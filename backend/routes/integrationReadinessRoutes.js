import express from "express";

import { protect } from "../middlewares/authMiddleware.js";
import { requireIntegrationAdmin } from "../middlewares/integrationAdminMiddleware.js";
import { getIntegrationReadiness } from "../services/readiness/IntegrationReadinessService.js";

const router = express.Router();

router.get("/", protect, requireIntegrationAdmin, (req, res) => {
  return res.status(200).json({
    success: true,
    readiness: getIntegrationReadiness(),
  });
});

export default router;

