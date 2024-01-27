const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const { QueryJoiSchema } = require("../model/query");
const { ASSIGNED, UNASSIGNED, RESOLVED, REOPEN, OPEN, CLOSE } = require("../model/status");

const type = {
    LOGIN: "LOGIN",
    USER: "USER",
    UPDATE_USER: "UPDATE_USER",
    PASSWORD: "PASSWORD",
    EMAIL: "EMAIL",
    BATCH: "BATCH",
    QUERY: "QUERY",
    QUERY_PARAMS: "QUERY_PARAMS",
    ASSIGN_QUERY: "ASSIGN_QUERY",
    UNASSIGN_QUERY: "UNASSIGN_QUERY",
};

const schema = {
    LOGIN: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }),

    USER: Joi.object({
        firstName: Joi.string().min(5).max(50).required(),
        lastName: Joi.string().max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).required(),
        conformPassword: Joi.ref("password"),
        address: {
            street: Joi.string(),
            city: Joi.string(),
            state: Joi.string(),
            zip: Joi.string(),
        },
    }),
    UPDATE_USER: Joi.object({
        firstName: Joi.string().min(5).max(50),
        lastName: Joi.string().max(50),
        address: {
            street: Joi.string(),
            city: Joi.string(),
            state: Joi.string(),
            zip: Joi.string(),
        },
    }),

    EMAIL: Joi.object({
        email: Joi.string().email().required(),
    }),

    PASSWORD: Joi.object({
        password: Joi.string().min(5).required(),
        conformPassword: Joi.ref("password"),
    }),

    BATCH: Joi.object({
        name: Joi.string().max(50).required(),
        courseTitle: Joi.string().max(255).required(),
        startDate: Joi.string().pattern(/(\d{4})-(\d{2})-(\d{2})/, "yyyy-mm-dd Date"),
        endDate: Joi.string().pattern(/(\d{4})-(\d{2})-(\d{2})/, "yyyy-mm-dd Date"),
    }),
    QUERY: QueryJoiSchema,
    QUERY_PARAMS: Joi.object({
        status: Joi.array().items(Joi.string().valid(ASSIGNED, UNASSIGNED, OPEN, CLOSE, REOPEN)),
        category: Joi.array().items(Joi.string().allow("")),
        subCategory: Joi.array().items(Joi.string().allow("")),
        preferredLanguage: Joi.array().items(Joi.string().allow("")),
    }),
    ASSIGN_QUERY: Joi.object({
        queryId: Joi.objectId().required(),
        assignedToId: Joi.objectId().required(),
    }),
    UPDATE_QUERY: {
        queryId: Joi.objectId().required(),
        status: Joi.string().valid(OPEN, CLOSE, REOPEN).required(),
        solution: Joi.string().allow(""),
        feedback: Joi.string().allow(""),
    },
    UNASSIGN_QUERY: Joi.object({
        queryId: Joi.objectId().required(),
    }),
};

const validate = (type, data) => {
    const option = { abortEarly: false };

    return schema[type].validate(data, option);
};

const getErrors = (error) =>
    error.details.reduce((acc, { path, message }) => {
        return { ...acc, [path.join("-")]: message };
    }, {});

exports.validateBody = (type) => {
    return (req, res, next) => {
        const { error } = validate(type, req.body);

        if (error) {
            const errors = getErrors(error);

            return res.status(400).send({ errors });
        }

        next();
    };
};
exports.validateQuery = (type) => {
    return (req, res, next) => {
        const { error } = validate(type, req.query);

        if (error) {
            const errors = getErrors(error);

            return res.status(400).send({ errors });
        }

        next();
    };
};

exports.type = type;
