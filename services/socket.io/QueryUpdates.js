const role = require("../../model/role");
const User = require("../../model/user");

module.exports = (socket) => {
    return async ({ query }, cb) => {
        const users = await User.find({ role: { $in: [role.ADMIN, role.MENTOR] } }).select("_id");
        const emitRooms = users.map((v) => v._id.toString());
        emitRooms.push(query?.rasiedBy?.toString() || "");
        console.log(emitRooms, query);

        cb({ query });
        socket.to(emitRooms).emit("receive-query-updates", { query });
    };
};
