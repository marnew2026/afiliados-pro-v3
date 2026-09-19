import FounderActivityDay from "../../models/FounderActivityDay.js";

export function utcDay(date = new Date()) {
  return new Date(Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate()
  ));
}

export async function recordFounderActivity({
  user,
  activityModel = FounderActivityDay,
  now = () => new Date(),
}) {
  if (!user?.founderTrialGrantedAt) {
    return { recorded: false, reason: "not_founder" };
  }

  const seenAt = now();
  const day = utcDay(seenAt);

  await activityModel.updateOne(
    { userId: user._id, day },
    {
      $setOnInsert: {
        userId: user._id,
        day,
        firstSeenAt: seenAt,
      },
      $set: { lastSeenAt: seenAt },
      $inc: { requestCount: 1 },
    },
    { upsert: true }
  );

  return { recorded: true, day };
}

export function recordFounderActivitySafely(input) {
  void recordFounderActivity(input).catch((error) => {
    console.error("ERRO FOUNDER ACTIVITY:", error.message);
  });
}
