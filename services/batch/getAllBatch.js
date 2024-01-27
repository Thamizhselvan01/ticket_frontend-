const Batch = require("../../model/batch");

module.exports = async function (req, res, next) {
    const allBatch = await Batch.find();

    const success = { batch: allBatch };

    res.send({ success });
};
