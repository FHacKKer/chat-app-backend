const Message = require("../modals/Message");

const fetchMessages = async (socket) => {

    const messages = await Message.find({});

    socket.emit("allMessages", messages);

}

module.exports = fetchMessages;