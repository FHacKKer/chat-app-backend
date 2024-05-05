const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true, // Remove surrounding whitespace
    },
    username: {
        type: String,
        required: true,
        unique: true, // Ensures that the username is unique
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now, // Default to the current date/time when creating a new document
    },
});



// Create the User model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User; // Export the User model
