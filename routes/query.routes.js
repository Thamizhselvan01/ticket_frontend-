const router = require("express").Router();

const getAllQuery = require("../services/query/getAllQuery");
const getQuery = require("../services/query/getQuery");
const createQuery = require("../services/query/createQuery");
const updateQuery = require("../services/query/updateQuery");
const deleteQuery = require("../services/query/deleteQuery");
const filterAllQuery = require("../services/query/filterQuery");

const { validateBody, type } = require("../helper/joiSchema");
const { STUDENT, MENTOR, ADMIN } = require("../model/role");
const authorize = require("../permissions/authorize");

router.get("/", getAllQuery);
router.get("/filter", authorize([MENTOR, ADMIN]), validateBody(type.QUERY_PARAMS), filterAllQuery);
router.get("/:id", getQuery);

router.post("/", authorize([STUDENT]), validateBody(type.QUERY), createQuery);
router.put("/:id", authorize([STUDENT]), validateBody(type.QUERY), updateQuery);
router.put(
    "/status/:id",
    authorize([STUDENT, MENTOR]),
    validateBody(type.UPDATE_USER),
    updateQuery
);
router.delete("/:id", authorize([STUDENT]), deleteQuery);

module.exports = router;
