const Message = require("../../model/message");
const Converstation = require("../../model/converstation");

module.exports = (socket) => {
    return async ({ id, message }, cb) => {
        const converstation = await Converstation.findById(id);
        if (!converstation) {
            cb({ error: "Invalid Converstation Id" });
            return;
        }
        if (converstation?.users?.length <= 1) {
            cb({ error: "This Query is unAssigned" });
            return;
        }

        const from = message.from;
        const to = converstation?.users?.filter((v) => v.toString() !== from);
        const content = message.content;

        const newMessage = await Message({ from, to, content });
        await newMessage.save();

        converstation?.messages?.push(newMessage);
        await converstation.save();

        cb({ message: newMessage });
        const emitRooms = converstation?.users?.map(String);
        socket.to(emitRooms).emit("receive-message", { id, message: newMessage });
    };
};
