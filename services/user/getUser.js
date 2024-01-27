const { isValidObjectId } = require("mongoose");
const User = require("../../model/user");

module.exports = async function (req, res, next) {
    const id = req.params.id;

    if (!isValidObjectId(id)) return res.status(400).send({ error: "The given Id is Invalid" });

    const user = await User.findById(id).select("firstName lastName email isActivated role");

    if (!user) return res.status(404).send({ error: "No user Found for given ID" });

    const success = { user };

    res.send({ success });
};
