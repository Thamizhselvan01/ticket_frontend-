const { ADMIN } = require("../../model/role");
const User = require("../../model/user");

module.exports = async (req, res, next) => {
    // query id
    // assigned to id
    const role = req.body.role;
    const userId = req.body.user;

    const user = await User.findById(userId);
    if (!user) return res.status(404).send({ error: "No User Found for given user ID" });

    if (user.role === ADMIN) {
        const adminUser = await User.find({ role: ADMIN }).count();
        if (adminUser <= 1)
            return res
                .status(400)
                .send({ error: "There Should be atleast One Admin Role User Required" });
    }

    user.role = role;

    await user.save();
    res.send({ success: { message: "Role Assigned" } });
};
