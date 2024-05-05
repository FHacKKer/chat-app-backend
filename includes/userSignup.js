const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../modals/User");

const userSignup = async (userData, jwtSecret, socket) => {
    try {
        console.log("User SignUp Request Received");

        const { name, username, email, password } = userData;

        // Validate username length
        if (username.length < 6) {
            return socket.emit("errorEvent", {
                message: "Username must be longer than 6 characters",
            });
        }

        // Validate password length
        if (password.length < 6) {
            return socket.emit("errorEvent", {
                message: "Password must be at least 6 characters long",
            });
        }

        // Check if email is taken
        const emailExists = await User.findOne({ email });

        if (emailExists) {
            return socket.emit("errorEvent", {
                message: "Email is already taken",
            });
        }

        // Check if username is taken
        const usernameExists = await User.findOne({ username });

        if (usernameExists) {
            return socket.emit("errorEvent", {
                message: "Username is already taken",
            });
        }

        // Hash the password using bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user
        const newUser = new User({
            name,
            username,
            email,
            password: hashedPassword,
        });

        // Save the new user to the database
        const savedUser = await newUser.save();

        // Generate a JWT token
        const token = jwt.sign({ id: savedUser._id }, jwtSecret, {
            expiresIn: "1h",
        });

        // Emit the new user ID and JWT token back to the client
        socket.emit("newUserSignedUp", {
            name: savedUser.name,
            id: savedUser._id,
            token,
        });

    } catch (error) {
        console.error("Error during user signup:", error);
        socket.emit("errorEvent", {
            message: "An error occurred during user signup",
        });
    }
};

module.exports = userSignup;
