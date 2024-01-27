const findMissing = require("../../helper/findMissing");
const { Query } = require("../../model/query");
const { UNASSIGNED } = require("../../model/status");

module.exports = async (req, res, next) => {
    // query ids
    // assigned to id
    const queryIds = req.body.queryIds;

    const queries = await Query.find({ _id: { $in: queryIds } });

    const missingQueryIds = findMissing(
        queryIds,
        queries.map((q) => q._id)
    );
    if (missingQueryIds.length > 0)
        return res
            .status(404)
            .send({ error: "No Query Found for given Query IDs", missingQueryIds });

    await Query.updateMany(
        { _id: { $in: queryIds } },
        {
            $unset: {
                assignedTo: null,
            },
            $set: {
                status: UNASSIGNED,
            },
        }
    );

    res.send({ success: { message: "Query Unassigned" } });
};
