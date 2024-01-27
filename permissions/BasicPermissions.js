const { ADMIN, MENTOR, STUDENT } = require("../model/role");

const canViewQuery = (user, query) => {
    if (user.role === ADMIN) return query;
    if (user.role === MENTOR)
        return query.filter((q) => q?.assignedTo?._id?.toString() === user?._id?.toString());
    if (user.role === STUDENT)
        return query.filter((q) => q?.rasiedBy?._id.toString() === user?._id?.toString());
};
module.exports = {
    canViewQuery,
};
