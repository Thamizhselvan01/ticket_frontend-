const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const model = mongoose.model;
const ObjectId = mongoose.SchemaTypes.ObjectId;

const converstationSchema = new Schema({
    users: {
        type: [ObjectId],
        required: true,
        ref: "User",
    },
    messages: {
        type: [ObjectId],
        ref: "Message",
    },
});

const Converstation = model("converstation", converstationSchema);

module.exports = Converstation;
