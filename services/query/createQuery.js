const { pick } = require("lodash");
const { Query } = require("../../model/query");

const pickBody = [
    "title",
    "subTitle",
    "category",
    "subCategory",
    "description",
    "tags",
    "preferredLanguage",
    "availableTime.from",
    "availableTime.till",
    "contactInfo.email",
    "rasiedBy",
];

module.exports = async function (req, res, next) {
    const data = req.body;
    const user = req.user;

    data.rasiedBy = user._id;
    data.contactInfo = {};
    data.contactInfo.email = user.email;

    const newQuery = await Query(pick(data, pickBody));

    newQuery.createConverstation();

    await newQuery.save();

    const success = { message: "Query Create Successfully", query: newQuery };

    res.send({ success });
};
