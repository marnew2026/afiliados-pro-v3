import express from "express";
import {
  createCampaign,
  getCampaigns,
} from "../controllers/campaign.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createCampaign);
router.get("/", protect, getCampaigns);

export default router;