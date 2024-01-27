const role = require("../../model/role");

module.exports = (req, res, next) => {
    res.send({ success: { roles: Object.keys(role) } });
};
