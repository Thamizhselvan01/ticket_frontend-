const { isValidObjectId } = require("mongoose");
const Batch = require("../../model/batch");

module.exports = async function (req, res, next) {
    const id = req.params.id;

    if (!isValidObjectId(id)) return res.status(400).send({ error: "The given Id is Invalid" });

    const batch = await Batch.findByIdAndDelete(id);

    if (!batch) return res.status(404).send({ error: "No Batch Found for given ID" });

    const success = { message: "Deleted the Batch", batch: {} };

    res.send({ success });
};
