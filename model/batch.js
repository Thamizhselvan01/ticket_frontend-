const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const model = mongoose.model;
const ObjectId = mongoose.SchemaTypes.ObjectId;

const BatchSchema = new Schema({
    name: {
        type: String,
        maxlength: 50,
        required: true,
        trim: true,
    },
    courseTitle: {
        type: String,
        maxlength: 255,
        required: true,
        trim: true,
    },
    startDate: {
        type: Date,
        default: Date.now(),
    },
    endDate: Date,
});

const Batch = model("Batch", BatchSchema);

module.exports = Batch;
