const express = require("express");
const { getCourses } = require("../controllers/courseController");
const routes = express.Router();

routes.get("/courses", getCourses);

module.exports = router;
