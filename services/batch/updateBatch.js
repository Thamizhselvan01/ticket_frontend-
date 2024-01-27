const Batch = require("../../model/batch");
const { pick } = require("lodash");
const { isValidObjectId } = require("mongoose");

const bodyProps = ["name", "courseTitle", "startDate", "endDate"];

module.exports = async function (req, res) {
    const id = req.params.id;

    if (!isValidObjectId(id)) return res.status(400).send({ error: "The given Id is Invalid" });

    const batch = await Batch.findByIdAndUpdate(
        id,
        { $set: pick(req.body, bodyProps) },
        { new: true }
    );

    if (!batch) return res.status(404).send({ error: "No Batch Found for given ID" });

    const success = {
        message: "Updated the Batch",
        batch: pick(batch, bodyProps),
    };

    res.send({ success });
};
