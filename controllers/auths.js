const User = require("../model/User.js");

const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        throw new Error("Please provide name, email, password");
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
        return res.status(400).json({msg: "User Already Exists"});
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

module.exports = {
    register,
};