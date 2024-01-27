const router = require("express").Router();

const unassignQuery = require("../services/unassign/unassignQuery");
const unassignRole = require("../services/unassign/unassignRole");
const unassignManyQuery = require("../services/unassign/unassignManyQueries");
const authorize = require("../permissions/authorize");
const { ADMIN, MENTOR } = require("../model/role");

router.patch("/query", authorize([ADMIN, MENTOR]), unassignQuery);
// router.patch("/query/many", authorize([ADMIN, MENTOR]), unassignManyQuery);

router.patch("/role", authorize([ADMIN]), unassignRole);
// router.patch("/role/many", authorize([ADMIN]), unassignManyRole);

module.exports = router;
