const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true, 
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: 6,
    }
})

module.exports = mongoose.model("User", UserSchema);