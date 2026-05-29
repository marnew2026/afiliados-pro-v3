import express from "express";

const router = express.Router();

router.get("/:code", async (req, res) => {
  try {
    res.send("tracking ok");
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

export default router;