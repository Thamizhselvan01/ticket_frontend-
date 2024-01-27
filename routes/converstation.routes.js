const getConverstation = require("../services/conversation/getConverstation");
const getConverstationById = require("../services/conversation/getConverstationById");

const router = require("express").Router();

router.get("/", getConverstation);
router.get("/:id", getConverstationById);

module.exports = router;
