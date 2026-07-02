import { redlock } from "../lib/redlock.js";

await redlock.acquire([`withdraw:${userId}`], 5000);



await safeCreateLedger({
  userId,
  type: "debit",
  amount,
  status: "pending",
  referenceId: withdrawId,
  source: "withdraw",
});

await rebuildWallet(userId);

