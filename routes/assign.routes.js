const router = require("express").Router();

const assignQuery = require("../services/assign/assignQuery");
const assignRole = require("../services/assign/assignRole");
// const assignManyQuery = require("../services/assign/AssignManyQueries");
const authorize = require("../permissions/authorize");
const { ADMIN, MENTOR } = require("../model/role");
const { validateBody, type } = require("../helper/joiSchema");

router.patch("/query", authorize([ADMIN, MENTOR]), validateBody(type.ASSIGN_QUERY), assignQuery);
// router.patch("/query/many", authorize([ADMIN, MENTOR, STUDENT]), assignManyQuery);

router.patch("/role", authorize([ADMIN]), assignRole);
// router.patch("/role/many", authorize([ADMIN]), assignManyRole);

module.exports = router;
