const express = require("express");
const Router = express.Router();

const { getAllJobs, getJob, createJob, deleteJob, updateJob, showDeleted, removePermanently, restoreJob, } = require("../controllers/jobs.js");

Router.route('/').get(getAllJobs).post(createJob);
Router.route('/delete').get(showDeleted);
Router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob);
Router.route('/delete/:id').delete(removePermanently).patch(restoreJob);

module.exports = Router;