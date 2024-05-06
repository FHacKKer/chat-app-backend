const mongoose = require('mongoose');

const MessagesSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true,
        trim: true
    },
    si: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Message = mongoose.model("Messages", MessagesSchema);

module.exports = Message;