import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.get("/users", async (req, res) => {
  const users = await User.find({}, "name email affiliateCode");
  res.json(users);
});

export default router;