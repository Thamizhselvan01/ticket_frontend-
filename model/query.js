const mongoose = require("mongoose");
const Joi = require("joi");
const { ASSIGNED, UNASSIGNED, RESOLVED, CLOSE, OPEN, REOPEN } = require("./status");
const Converstation = require("./converstation");

const Schema = mongoose.Schema;
const model = mongoose.model;
const ObjectId = mongoose.SchemaTypes.ObjectId;

const QuerySchema = new Schema({
    title: {
        type: String,
        minlength: 5,
        maxlength: 255,
        trim: true,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    subCategory: {
        type: String,
    },
    description: {
        type: String,
        minlength: 5,
        maxlength: 1000,
        trim: true,
        required: true,
    },
    tags: {
        type: [String],
        required: true,
    },
    preferredLanguage: {
        type: String,
        required: true,
    },
    availableTime: {
        from: {
            type: String,
            required: true,
        },
        till: {
            type: String,
            required: true,
        },
    },
    rasiedBy: {
        type: ObjectId,
        required: true,
        ref: "User",
    },
    assignedTo: {
        type: ObjectId,
        ref: "User",
    },
    converstationId: {
        type: ObjectId,
        ref: "converstation",
    },
    solution: {
        type: String,
        minlength: 5,
        maxlength: 1000,
        trim: true,
    },
    feedback: {
        type: String,
        minlength: 5,
        maxlength: 1000,
        trim: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
    },
    status: {
        type: String,
        enum: [UNASSIGNED, ASSIGNED, RESOLVED, OPEN, CLOSE, REOPEN],
        default: UNASSIGNED,
    },
});

QuerySchema.methods.createConverstation = async function () {
    const converstation = await new Converstation({ users: [this.rasiedBy] });
    this.converstationId = converstation._id;
    converstation.save();
};

const Query = model("Query", QuerySchema);

const QueryJoiSchema = Joi.object({
    title: Joi.string().min(5).max(255).required(),
    description: Joi.string().min(5).max(1000).required(),
    category: Joi.string().required(),
    subCategory: Joi.string().allow(""),
    tags: Joi.array().items(Joi.string()).required(),
    preferredLanguage: Joi.string().required(),
    availableTime: Joi.object({
        from: Joi.string()
            .pattern(/(\d{2}):(\d{2})/, "hh:mm Time")
            .required(),
        till: Joi.string()
            .pattern(/(\d{2}):(\d{2})/, "hh:mm Time")
            .required(),
    }).required(),
});

module.exports.Query = Query;
module.exports.QueryJoiSchema = QueryJoiSchema;
