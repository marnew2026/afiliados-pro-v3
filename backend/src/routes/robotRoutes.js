import express from "express";
import User from "../../models/User.js";
import { enqueueRobotJob } from "../queue/robotQueue.js";
import { resolveTenant } from "../core/tenant/resolveTenant.js";

const router = express.Router();

router.post("/run", async (req, res) => {
  const tenantId = resolveTenant(req);

  const users = await User.find({ tenantId });

  for (const user of users) {
    await enqueueRobotJob({
      tenantId,
      userId: user._id,
    });
  }

  res.json({
    ok: true,
    queued: users.length,
    tenantId,
  });
});

export default router;