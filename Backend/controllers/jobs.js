const Job = require("../model/Job.js");

const getAllJobs = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user.userId, isDeleted: false }).sort('createdAt');
    res.status(200).json({ jobs, count: jobs.length });
}

const getJob = async (req, res) => {
    const {
        user: userId,
        params: { id: jobId }
    } = req;
    const job = await Job.findOne({
        _id: jobId,
        createdBy: userId
    });
    if (!job) throw new NotFoundError(`No job found with id: ${jobId}`);
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
        throw new BadRequestError("Company and Position are required");
    }

    const job = await Job.findOneAndUpdate({ _id: jobId, createdBy: userId }, req.body, {
        returnDocument: 'after',
        runValidators: true
    });

    if (!job) {
        throw new NotFoundError(`No job found with id: ${jobId}`);
    }
    res.status(200).json({ job });
}

const deleteJob = async (req, res) => {
    const {
        user: { userId },
        params: { id: jobId }
    } = req;

    const job = await Job.findOneAndUpdate(
        { _id: jobId, createdBy: userId },
        { isDeleted: true }
    );

    if (!job) throw new NotFoundError(`No job found with id: ${jobId}`);
    res.status(200).json({ msg: "Job Move to Bin" });
}

const showDeleted = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user.userId, isDeleted: true });
    if (!jobs) return res.status(404).json({ msg: "No job is Deleted" });
    res.status(200).json({ jobs, count: jobs.length });
}
const removePermanently = async (req, res) => {
    const {
        user: { userId },
        params: { id: jobId }
    } = req;

    const job = await Job.findOneAndDelete(
        { _id: jobId, createdBy: userId },
        { isDeleted: true }
    )

    if (!job) throw new NotFoundError(`No job found with id: ${jobId}`);
    res.status(200).json({ msg: "Job Deleted" });
}

const restoreJob = async (req, res) => {
    const {
        user: { userId},
        params: { id: jobId} 
    } = req;

    const job = await Job.findByIdAndUpdate(
        {_id: jobId, creadedBy: userId },
        { isDeleted: false}
    )

    if(!job) throw new NotFoundError(`No job found with id: ${jobId}`);
    res.status(200).json({msg: "Job Restored"});
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    deleteJob,
    updateJob,
    showDeleted,
    removePermanently,
    restoreJob
}