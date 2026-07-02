import { addJob } from "./robotQueue.js";
import User from "../../models/User.js";

export async function enqueueRobotJobs() {
  const users = await User.find();

  for (const user of users) {
    addJob({
      userId: user._id,
      email: user.email,
      createdAt: Date.now()
    });
  }

  console.log("📦 Jobs enfileirados:", users.length);
}