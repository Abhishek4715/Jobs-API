const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, "Company is required"],
        trim: true,
    },
    position: {
        type: String,
        required: [true, "Position is required"],
        trim: true,
    },
    status: {
        type: String,
        required: [false],
        trim: true,
    }
});

module.exports = mongoose.model("Job", JobSchema);