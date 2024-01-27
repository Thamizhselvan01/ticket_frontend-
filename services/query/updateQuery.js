const { Query } = require("../../model/query");
const { pick } = require("lodash");
const { isValidObjectId } = require("mongoose");

const pickBody = [
    "title",
    "category",
    "subCategory",
    "description",
    "tags",
    "availableTime.from",
    "availableTime.till",
    "rasiedBy",
    "status",
];

module.exports = async function (req, res) {
    const id = req.params.id;

    if (!isValidObjectId(id)) return res.status(400).send({ error: "The given Id is Invalid" });

    const query = await Query.findByIdAndUpdate(
        id,
        { $set: pick(req.body, pickBody) },
        { new: true }
    );

    if (!query) return res.status(404).send({ error: "No Query Found for given ID" });

    const success = {
        message: "Updated the query",
        query: pick(query, pickBody),
    };

    res.send({ success });
};
