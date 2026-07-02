let ioInstance = null;

export function initWalletSocket(io) {
  ioInstance = io;
}

export function emitWalletUpdate(userId, wallet) {
  if (!ioInstance) return;

  ioInstance.to(userId).emit("wallet:update", {
    userId,
    availableBalance: wallet.availableBalance,
    totalEarned: wallet.totalEarned,
    lockedBalance: wallet.lockedBalance,
  });
}