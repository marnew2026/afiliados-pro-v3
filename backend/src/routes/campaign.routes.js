const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const controller = require("../controllers/campaign.controller");

router.post("/", authMiddleware, controller.createCampaign);
router.get("/", authMiddleware, controller.getCampaigns);

router.get("/r/:id", controller.redirectCampaign);

module.exports = router;