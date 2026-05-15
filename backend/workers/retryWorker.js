import Sale from "../models/Sale.js";

export async function retryFailedSales() {
  const failed = await Sale.find({ status: "failed" });

  for (const sale of failed) {
    console.log("RETRY SALE:", sale._id);

    sale.status = "retrying";
    await sale.save();
  }
}