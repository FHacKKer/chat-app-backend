console.clear();
require('dotenv').config()
const chatData = require('./chat');
const express = require("express");
const { Server } = require("socket.io");
const { createServer } = require("http");
const ConnectToDB = require("./db");
const port = 3001;
const app = express();
const httpServer = createServer(app);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// Modals Folder Files 
const User = require("./modals/User");

// Includes Folder File 
const userSignup = require('./includes/userSignup');
const userSignIn = require('./includes/userSignin');
const saveMessage = require('./includes/saveMessage');
const fetchMessages = require('./includes/getAllMessages');




const io = new Server(httpServer, {
    cors: {
        origin: ["http://localhost:5173", "https://react-chat-app-public.netlify.app"]
    }
})

const { MONGODB_URI, JWTSECRET } = process.env;



io.on("connection", function (socket) {
    console.log(`User Connected ${socket.id}`);

    socket.on("getMessages", function (data) {
        fetchMessages(socket)

    });

    socket.on("newMessage", (data) => {
        saveMessage(data, socket);
    });

    socket.on("userSignUp", async (userData) => {
        userSignup(userData, JWTSECRET, socket);
    });


    socket.on("tokenSignUp", async (token) => {
        console.log(`Token SignUp Request Received.`);

        try {
            // Verify the JWT token
            const decoded = jwt.verify(token.trim(), JWTSECRET);

            // If token is valid, get the user ID from the decoded payload
            const userId = decoded.id;

            // Retrieve the user information from the database
            const user = await User.findById(userId, "name");

            if (user) {
                // Return an object with user details to the client
                socket.emit("tokenSignUpSuccess", {
                    message: "Token is valid",
                    user: {
                        id: user._id,
                        name: user.name,
                    },
                });
            } else {
                // If user not found, emit an error event
                socket.emit("jwtError", {
                    message: "User not found",
                });
            }
        } catch (error) {
            console.error("Error during token verification:", error);

            // Handle token verification failure
            if (error.name === "JsonWebTokenError") {
                socket.emit("jwtError", {
                    message: "Invalid token",
                });
            } else if (error.name === "TokenExpiredError") {
                socket.emit("jwtError", {
                    message: "Token has expired",
                });
            } else {
                socket.emit("jwtError", {
                    message: "An error occurred during token verification",
                });
            }
        }
    });


    socket.on("signin", (credentials) => {
        console.log(`Request Received For User Sign in`);
        userSignIn(credentials, JWTSECRET, socket);
    })

})


app.get("/", function (req, res) {
    res.send("Hello")
})


httpServer.listen(port, async function () {
    console.log(`Server Listening On ${port}`);
    await ConnectToDB(MONGODB_URI);
})