const Query = require("../../model/query");
const { UNASSIGNED } = require("../../model/status");

module.exports = async (req, res, next) => {
    // query id
    // assigned to id
    const queryId = req.body.queryId;

    const query = await Query.findById(queryId);
    if (!query) return res.status(404).send({ error: "No Query Found for given Query ID" });

    query.assignedTo = null;
    query.status = UNASSIGNED;

    await query.save();
    res.send({ success: { message: "Query Unassigned" } });
};
