const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: 6,
    }
})

UserSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
})

UserSchema.methods.createJWT = function() {
    return jwt.sign({userId: this._id, name: this.name}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME})
}

UserSchema.methods.checkPassword = async function(candidatePassword) {
    const isMatch = await bcryptjs.compare(candidatePassword, this.password);
    return isMatch;
}

module.exports = mongoose.model("User", UserSchema);