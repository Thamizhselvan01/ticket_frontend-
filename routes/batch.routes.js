const router = require("express").Router();

const getBatch = require("../services/batch/getBacth");
const getAllBatch = require("../services/batch/getAllBatch");
const createBatch = require("../services/batch/createBatch");
const updateBatch = require("../services/batch/updateBatch");
const deleteBatch = require("../services/batch/deleteBatch");
const { validateBody, type } = require("../helper/joiSchema");
const authorize = require("../permissions/authorize");
const { ADMIN } = require("../model/role");

router.get("/", authorize([ADMIN]), getAllBatch);
router.get("/:id", getBatch);
router.post("/", authorize([ADMIN]), validateBody(type.BATCH), createBatch);
router.put("/:id", authorize([ADMIN]), validateBody(type.BATCH), updateBatch);
router.delete("/:id", authorize([ADMIN]), deleteBatch);

module.exports = router;
