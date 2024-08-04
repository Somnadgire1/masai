const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { json } = require("express");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    const {username, password} = req.body;
    try {
        let user = await User.findOne({username: username});
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        user = new User({
            username,
            password: await bcrypt.hash(password, 10),

        });
        await User.save(user);

        const payload = {userId: user.id};
        const token = jwt.sign(payload, process.env.SECRET, { expireIn: "1h"});

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    const { username, password} = req.body;
    try{
        const user = await User.findOne({username: username});
        if (!user) {
            return res.status(400).json({ message : "Invalid credential" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            return res.status(400).json({ message: "Invalid credential"});
        }
        const payload = {userId: user.id};
        const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1h"});

        res.json({ token });
    } catch (error) {
        res.status({ message: error.message });
    }
} 