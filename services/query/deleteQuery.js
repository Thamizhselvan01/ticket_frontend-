const { isValidObjectId } = require("mongoose");
const { Query } = require("../../model/query");

module.exports = async function (req, res, next) {
    const id = req.params.id;

    if (!isValidObjectId(id)) return res.status(400).send({ error: "The given Id is Invalid" });

    const query = await Query.findByIdAndDelete(id);

    if (!query) return res.status(404).send({ error: "No query Found for given ID" });

    const success = { message: "Deleted the Query", query: {} };

    res.send({ success });
};
