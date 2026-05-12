router.post("/upgrade", async (req, res) => {
  const { userId } = req.body;

  const user = await User.findOneAndUpdate(
    { firebaseId: userId },
    { plan: "pro" },
    { new: true }
  );

  res.json(user);
});