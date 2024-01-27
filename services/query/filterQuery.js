const { Query } = require("../../model/query");

module.exports = async function (req, res, next) {
    const { status, category, preferredLanguage, subCategory } = req.query;

    const filter = {};
    if (status) filter.status = { $in: status };
    if (category) filter.category = { $in: category };
    if (subCategory) filter.subCategory = { $in: subCategory };
    if (preferredLanguage) filter.preferredLanguage = { $in: preferredLanguage };

    const allQuery = await Query.find(filter)
        .populate("rasiedBy", "firstName email")
        .populate("assignedTo", "firstName email")
        .sort("-_id");

    const success = { query: allQuery };

    res.send({ success });
};
