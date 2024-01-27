const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const model = mongoose.model;
const ObjectId = mongoose.SchemaTypes.ObjectId;

const MessageSchema = new Schema({
    from: {
        type: ObjectId,
        required: true,
        ref: "User",
    },
    to: {
        type: [ObjectId],
        required: true,
        ref: "User",
    },
    content: {
        type: String,
        required: true,
        maxlength: 1024,
    },
});

const Message = model("Message", MessageSchema);

module.exports = Message;
