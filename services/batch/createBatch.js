const { pick } = require("lodash");
const Batch = require("../../model/batch");

const pickBody = ["name", "courseTitle", "startDate", "endDate"];

module.exports = async function (req, res, next) {
    const data = req.body;

    const newBatch = await Batch(pick(data, pickBody));

    await newBatch.save();

    const success = { message: "Batch Create Successfully", batch: newBatch };

    res.send({ success });
};
