const Job = require("../model/Job.js");

const getAllJobs = async (req, res) => {
    const jobs = await Job.find({});
    res.status(200).json({ jobs });
}

const getJob = async (req, res) => {
    const { id } = req.params;
    const job = await Job.findById(id);
    res.status(200).json({ job });
}

const createJob = async (req, res) => {
    const job = await Job.create(req.body);
    res.status(201).json({ job });
}

const deleteJob = async (req, res) => {
    const { id: jobID } = req.params;
    const job = await Job.findByIdAndDelete({ _id: jobID });

    res.status(200).json({ job: null, status: "success" });
}

const updateJob = async (req, res) => {
    const { id: jobID } = req.params;
    const job = await Job.findByIdAndUpdate({ _id: jobID }, req.body, {
        new: true,
        runValidators: true,
    })

    res.status(200).json({ job });
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    deleteJob,
    updateJob,
}