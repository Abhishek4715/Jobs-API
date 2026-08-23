const User = require("../model/User.js");
const { BadRequestError, UnauthenticatedError } = require("../errors");
 
const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        throw new BadRequestError("Please provide name, email, password");
    }
 
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
        throw new BadRequestError("User already exists");
    }
 
    const user = await User.create({ ...req.body });
    const token = user.createJWT();
    res.status(201).json({ user: { name: user.name }, token });
};
 
const login = async (req, res) => {
    const { email, password } = req.body;
 
    if (!email || !password) {
        throw new BadRequestError("Please provide email and password");
    }
 
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
        throw new UnauthenticatedError("Invalid Credentials");
    }
 
    const correctPassword = await user.checkPassword(password);
    if (!correctPassword) {
        throw new UnauthenticatedError("Invalid Credentials");
    }
 
    const token = user.createJWT();
    res.status(200).json({ user: { name: user.name }, token });
};
 
module.exports = {
    register,
    login,
};