const mongoose = require("mongoose");

const ConnectToDB = async (URI) => {
    try {
        await mongoose.connect(URI);
        console.log(`Successfully Connected To Database`);
    } catch (error) {
        console.log(`An Error Occurred During Connecting To Database`);
    }
}

module.exports = ConnectToDB;