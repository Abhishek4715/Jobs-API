require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = () => {
    if (!process.env.MONGODB_URL) {
        throw new Error("Missing 'MONGODB_URL' in .env");
    }
    return mongoose.connect(process.env.MONGODB_URL);
}

mongoose.connection.on("connected", () => {
    console.log("Mongoose connect to MongoDB");
})

mongoose.connection.on("error", (error) => {
    console.log(`Mongoose Error: ${error}`);
})

mongoose.connection.on("disconnected", () => {
    console.log("Mongoose disconnected");
})

module.exports = connectDB;