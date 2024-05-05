const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../modals/User");

const userSignIn = async (creds, jwtSecret, socket) => {
    try {
        const { username, password } = creds;
        // console.log(`${username} : ${password}`);
        // Step 1: Basic validation
        if (username.trim().length < 3) {
            return socket.emit("globalError", {
                message: "Username must be at least 3 characters long",
            });
        }

        if (password.trim().length < 6) {
            return socket.emit("globalError", {
                message: "Password must be at least 6 characters long",
            });
        }

        // Step 2: Find the user by username
        const user = await User.findOne({ username });

        if (!user) {
            // If user not found, emit an error event
            console.log("Username or password is incorrect");
            return socket.emit("globalError", {
                message: "Username or password is incorrect",
            });
        }

        // Step 3: Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            console.log("Username or password is incorrect");
            // If the password is incorrect, emit an error event
            return socket.emit("globalError", {
                message: "Username or password is incorrect",
            });
        }

        // Step 4: Generate a JWT token
        const token = jwt.sign({ id: user._id }, jwtSecret, {
            expiresIn: "1h", // Token expires in 1 hour
        });

        // Step 5: Emit the user information and JWT token back to the client
        socket.emit("signInSuccess", {
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
            },
            token,
        });

    } catch (error) {
        console.error("Error during user sign-in:", error);

        // Step 6: Handle other errors
        socket.emit("globalError", {
            message: "An error occurred during user sign-in",
        });
    }
};

module.exports = userSignIn;
