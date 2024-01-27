const { pick } = require("lodash");

const pickProps = ["email", "firstName", "lastName", "isActivated", "role"];

module.exports = async function (req, res, next) {
    res.send(pick(req.user, pickProps));
};
