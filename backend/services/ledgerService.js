import Ledger from "../models/Ledger.js";

export async function addCredit({
  userEmail,
  amount,
  referenceId,
  source = "campaign",
  description = "",
  status = "confirmed",
  metadata = {},
}) {
  await Ledger.create({
    userEmail,
    type: "credit",
    amount,
    source,
    referenceId,
    description,
    status,
    metadata,
  });
}

export async function addDebit({
  userEmail,
  amount,
  referenceId,
  source = "withdraw",
  description = "",
  status = "pending",
  metadata = {},
}) {
  await Ledger.create({
    userEmail,
    type: "debit",
    amount,
    source,
    referenceId,
    description,
    status,
    metadata,
  });
}
  

export async function getBalance(userEmail) {
  const credits = await Ledger.aggregate([
    { $match: { userEmail, type: "credit" } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  const debits = await Ledger.aggregate([
    { $match: { userEmail, type: "debit" } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  const creditTotal = credits[0]?.total || 0;
  const debitTotal = debits[0]?.total || 0;

  return creditTotal - debitTotal;
}