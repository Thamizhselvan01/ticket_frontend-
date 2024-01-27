const User = require("../../model/user");
const QueryCreated = require("./QueryCreated");
const QueryUpdates = require("./QueryUpdates");
const SendMessage = require("./SendMessage");

module.exports = (io) => {
    return (socket) => {
        console.log(socket.id, "is connected");

        const payload = User.verifyToken(socket.handshake.auth.token);
        if (payload) socket.join(payload.id);

        socket.on("send-message", SendMessage(socket, io));

        socket.on("query-created", QueryCreated(socket, io));

        socket.on("query-updates", QueryUpdates(socket));

        socket.on("disconnecting", () => {
            console.log(socket.id, "is dis connected");
        });
    };
};
