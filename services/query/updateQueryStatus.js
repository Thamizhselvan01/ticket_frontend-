const { Query } = require("../../model/query");
const { CLOSE } = require("../../model/status");

module.exports = async (req, res, next) => {
    // query id
    // assigned to id
    const queryId = req.params.id;
    const status = req.body.status;

    const query = await Query.findById(queryId);
    if (!query) return res.status(404).send({ error: "No Query Found for given Query ID" });

    if (status === CLOSE) {
        query.solution = req.body.solution;
        query.feedback = req.body.feedback;
        query.rating = req.body.rating;
    }

    query.status = status;

    await query.save();
    res.send({ success: { message: "Updated Status" } });
};
