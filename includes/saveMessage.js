const Message = require("../modals/Message");

const saveMessage = async (msgObj, socket) => {
    try {
        socket.broadcast.emit("newMessage", msgObj);
        const { sender, si, message, timestamp } = msgObj;

        const newMessage = new Message({
            sender,
            si,
            message,
            timestamp
        });

        const savedMessage = await newMessage.save();

        if (savedMessage) {
            console.log(`Message Saved Successfully`);
        }
    } catch (error) {
        console.log(`An Error Occured While Saving Message`);
        console.log(error);
        socket.emit("globalError", { messaeg: "Error Occurred While Saving Your Message.!" });
    }
}

module.exports = saveMessage;