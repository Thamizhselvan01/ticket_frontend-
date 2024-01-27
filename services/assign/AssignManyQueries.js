const findMissing = require("../../helper/findMissing");
const { Query } = require("../../model/query");
const { ASSIGNED } = require("../../model/status");
const User = require("../../model/user");

module.exports = async (req, res, next) => {
    // query ids
    // assigned to id
    const queryIds = req.body.queryIds;
    const assignedToId = req.body.assignedToId;

    const queries = await Query.find({ _id: { $in: queryIds } });

    const missingQueryIds = findMissing(
        queryIds,
        queries.map((q) => q._id)
    );
    if (missingQueryIds.length > 0)
        return res
            .status(404)
            .send({ error: "No Query Found for given Query IDs", missingQueryIds });

    const assignedTo = await User.findById(assignedToId);
    if (!assignedTo)
        return res.status(404).send({ error: "No User Found for given AssignedTo ID" });

    await Query.updateMany(
        { _id: { $in: queryIds } },
        {
            $set: {
                assignedTo: assignedToId,
                status: ASSIGNED,
            },
        }
    );

    res.send({ success: { message: "Query Assigned" } });
};
