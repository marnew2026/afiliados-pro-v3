import { createWithdraw } from "../services/withdrawService.js";

export const createWithdrawController = async (req, res) => {
  try {
    const { userId, amount, pixKey } = req.body;

    const withdraw = await createWithdraw(userId, amount, pixKey);

    return res.json({
      success: true,
      withdraw,
    });

  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
};