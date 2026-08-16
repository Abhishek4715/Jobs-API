const User = require("../model/User.js");

const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        throw new Error("Please provide name, email, password");
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
        return res.status(400).json({ msg: "User Already Exists" });
    }

    try {
        const user = await User.create({ ...req.body });
        const token = user.createJWT();
        res.status(201).json({ user: { name: user.name }, token });
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ msg: 'Email already exists' });
        }
        res.status(500).json({ msg: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new Error("Plese Provide Email and Password");
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
        throw new Error("User was not found");
    }

    const correctPassword = await user.checkPassword(password);
    if (!correctPassword) {
        return res.status(401).json({ msg: "Incorrect Password", enter: password, pass: user.password });
    }

    const token = user.createJWT();
    res.status(200).json({ user: { name: user.name }, token });

}

module.exports = {
    register,
    login,
};