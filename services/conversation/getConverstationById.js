const Converstation = require("../../model/converstation");

module.exports = async (req, res, next) => {
    const id = req.params.id;
    const converstation = await Converstation.findOne({
        _id: id,
        users: { $in: [req.user?._id] },
    })
        .populate("messages")
        .populate("users", "name email");

    res.send({ success: { converstation } });
};
