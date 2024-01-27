const router = require("express").Router();

const { validateBody, type } = require("../helper/joiSchema");

const updateUser = require("../services/user/UpdateUser");
const deleteUser = require("../services/user/DeleteUser");
const registerUser = require("../services/user/RegisterUser");
const getAllUser = require("../services/user/getAllUser");
const getUser = require("../services/user/getUser");
const getMe = require("../services/user/getMe");
const authUser = require("../middleware/authUser");
const authorize = require("../permissions/authorize");
const { ADMIN } = require("../model/role");

router.get("/", authUser, authorize([ADMIN]), getAllUser);
router.get("/:id", authUser, authorize([ADMIN]), getUser);

router.get("/me", authUser, getMe);

router.post("/register", validateBody(type.USER), registerUser);
router.patch("/update/:id", validateBody(type.UPDATE_USER), updateUser);
router.delete("/delete/:id", authorize([ADMIN]), deleteUser);

module.exports = router;
