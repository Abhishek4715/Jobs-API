const Job = require("../model/Job.js");

const getAllJobs = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt');
    res.status(200).json({ jobs, count: jobs.length });
}

const getJob = async (req, res) => {
    const {
        user: userId,
        params: { id: jobId }
    } = req;
    const job = await Job.findById({
        _id: jobId,
        createdBy: userId
    });
    if (!job) return res.status(404).json({ msg: "No job found" })
    res.status(200).json({ job });
}

const createJob = async (req, res) => {
    const job = await Job.create({ ...req.body, createdBy: req.user.userId });
    res.status(201).json({ job });
}



const updateJob = async (req, res) => {
    const {
        body: { company, position },
        user: { userId },
        params: { id: jobId }
    } = req;

    if (company === '' || position === '') {
        return res.status(404).json({ msg: "Company and Position are required" });
    }

    const job = await Job.findOneAndUpdate({ _id: jobId, createdBy: userId }, req.body, {
        returnDocument: 'after',
        runValidators: true
    });

    if (!job) {
        return res.status(404).json({ msg: "Job Not Found" });
    }
    res.status(200).json({ job });
}

const deleteJob = async (req, res) => {
    const {
        user: { userId },
        params: { id: jobId }
    } = req;

    const job = await Job.findOneAndDelete({
        _id: jobId,
        createdBy: userId
    });

    if (!job) return res.status(404).json({ msg: "No job found" })
    res.status(200).json({msg: "Job Deleted"});
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    deleteJob,
    updateJob,
}