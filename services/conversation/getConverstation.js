const Converstation = require("../../model/converstation");

module.exports = async (req, res, next) => {
    const converstation = await Converstation.find({ users: { $in: [req.user?._id] } })
        .populate("messages")
        .populate("users", "firstName email");
    res.send({ success: { converstation } });
};
