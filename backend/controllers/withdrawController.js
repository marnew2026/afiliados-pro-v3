import { requestWithdraw } from "../services/walletService.js";

export const createWithdraw = async (req, res) => {
  try {
    const { userEmail, amount, pixKey } = req.body;

    const withdraw = await requestWithdraw({
      userEmail,
      amount,
      pixKey,
    });

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