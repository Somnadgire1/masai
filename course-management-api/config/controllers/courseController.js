const Course = require("../models/Course");
exports.getCourses = async (req, res) => {
    try {
        const { page = 1, limit = 10, category, difficulty} = req.query;
        const query = {};

        if (category) query.category = category;
        if (difficulty) query.difficulty = difficulty;

        const courses = await Course.find(query)
        .skip((page - 1) * limit)
        .limit(Number(limit));

        res.json({ success: true, data: courses});

    } catch (error) {
        res.status(500).json({ success : false, message: error.message });
    }
};