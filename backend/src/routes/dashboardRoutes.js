import express from "express";
import { getQueueMetrics } from "../observability/queueMetrics.js";
import { redis } from "../queue/redis.js";

const router = express.Router();

router.get("/metrics", async (req, res) => {
  const metrics = await getQueueMetrics();

  res.json({
    ok: true,
    queue: metrics,
  });
});

router.get("/events", async (req, res) => {
  const events = await redis.lrange("saas:events", 0, 50);

  res.json({
    ok: true,
    events: events.map((e) => JSON.parse(e)),
  });
});

export default router;