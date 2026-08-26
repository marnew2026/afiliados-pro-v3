import { acquireLock, releaseLock } from "../lib/lock.js";
import { addRobotJob } from "../queue/robotQueue.js";

export async function processUser(user) {
  const lockKey = `lock:user:${user._id}`;
  const jobId = `robot:${user._id}`;

  const locked = await acquireLock(lockKey, 120);

  if (!locked) {
   
    return;
  }

  try {
    await addRobotJob(
      {
        userId: user._id,
        email: user.email,
      },
      {
        jobId, // 🔥 ESSENCIAL: evita duplicação no BullMQ
      }
    );

  

  } finally {
    await releaseLock(lockKey);
  }
}