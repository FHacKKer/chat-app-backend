console.clear();
require('dotenv').config()
const chatData = require('./chat');
const express = require("express");
const { Server } = require("socket.io");
const { createServer } = require("http");

const port = 3001;
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: ["http://localhost:5173", "https://react-chat-app-public.netlify.app"]
    }
})


io.on("connection", function (socket) {
    console.log(`User Connected ${socket.id}`);

    socket.on("getMessages", function (data) {

        socket.emit("allMessages", chatData);
    });

    socket.on("newMessage", (data) => {
        console.log(`New Message Received From User : ${data}`);
        let nm = {
            sender: "Faisal Shahzad",
            message: data,
            timestamp: Date.now()
        }
        socket.broadcast.emit("newMessage", nm);
    });



})


app.get("/", function (req, res) {
    res.send("Hello")
})


httpServer.listen(port, function () {
    console.log(`Server Listening On ${port}`);
})