const express = require("express");
const Router = express.Router();
const { register } = require("../controllers/auths");


Router.route('/register').post(register);

module.exports = Router;