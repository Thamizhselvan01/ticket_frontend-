const User = require("../../model/user");

module.exports = async function (req, res, next) {
    const allUser = await User.find().select("firstName lastName email isActivated role");

    const success = { users: allUser };

    res.send({ success });
};
