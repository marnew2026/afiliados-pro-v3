import { robotQueue } from "../queue/robotQueue.js";
import User from "../../models/User.js";

export async function enqueueRobotJobs() {
  const users = await User.find();

  for (const user of users) {
    await robotQueue.add(
      "process-user",
      {
        userId: user._id.toString()
      },
      {
        attempts: 3,
        backoff: {
          type: "exponential",
          delay: 5000
        },
        removeOnComplete: true,
        removeOnFail: false
      }
    );
  }

  console.log("📦 Jobs enviados para Redis:", users.length);
}