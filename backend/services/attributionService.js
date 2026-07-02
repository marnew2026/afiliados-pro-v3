import Click from "../models/Click.js";

export async function getLastClick(userId) {
  const click = await Click.findOne({
    userId,
  }).sort({ createdAt: -1 });

  return click;
}