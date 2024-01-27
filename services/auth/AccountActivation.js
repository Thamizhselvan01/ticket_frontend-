const User = require("../../model/user");
const crypto = require("crypto");

module.exports = async function (req, res, next) {
  this.activationToken = crypto
    .createHash("sha256")
    .update(activationHash)
    .digest("hex");

  const activationToken = await user.genActivationToken();
  const user = await User.findOne({
    activationToken,
    activationExpire: { $gt: new Date() },
  });
  if (!user) return res.status(404).send({ error: "Invalid Activation Token" });

  user.isActivated = true;
  user.activationToken = undefined;
  user.activationExpire = undefined;

  await user.save();

  user.isActivated();

  res.send({ message: "User verified successfully" });
};
