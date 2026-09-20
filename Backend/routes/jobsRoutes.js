const express = require("express");
const Router = express.Router();

const { getAllJobs, getJob, createJob, deleteJob, updateJob, showDeleted, removePermanently, } = require("../controllers/jobs.js");

Router.route('/').get(getAllJobs).post(createJob);
Router.route('/delete').get(showDeleted);
Router.route('/delete/:id').delete(removePermanently);
Router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob);

module.exports = Router;