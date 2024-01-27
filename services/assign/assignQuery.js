const { Query } = require("../../model/query");
const User = require("../../model/user");
const { ASSIGNED, UNASSIGNED } = require("../../model/status");
const Converstation = require("../../model/converstation");

module.exports = async (req, res, next) => {
    // query id
    // assigned to id
    const queryId = req.body.queryId;
    const assignedToId = req.body.assignedToId;

    const query = await Query.findById(queryId);
    if (!query) return res.status(404).send({ error: "No Query Found for given Query ID" });

    const assignedTo = await User.findById(assignedToId);
    if (!assignedTo)
        return res.status(404).send({ error: "No User Found for given AssignedTo ID" });

    if (query.status !== UNASSIGNED)
        return res.status(400).send({ error: "Query is already Assigned" });

    const converstation = await Converstation.findById(query.converstationId);
    converstation.users = [...converstation.users, assignedToId];
    await converstation.save();

    query.assignedTo = assignedTo._id;
    query.status = ASSIGNED;

    await query.save();

    res.send({ success: { message: "Updated Status", query } });
};
