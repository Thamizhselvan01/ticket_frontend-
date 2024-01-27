const { Query } = require("../../model/query");
const { canViewQuery } = require("../../permissions/BasicPermissions");

module.exports = async function (req, res, next) {
    const allQuery = await Query.find()
        .populate("rasiedBy", "firstName email")
        .populate("assignedTo", "firstName email")
        .sort("-_id");

    const filteredQuery = canViewQuery(req.user, allQuery);

    const success = { query: filteredQuery };

    res.send({ success });
};
