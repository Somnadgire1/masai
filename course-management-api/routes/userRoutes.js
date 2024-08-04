const express = require("express");
const { register, login, enrollCourse, cancelEnrollment, getEnrolledCourses } = require("../controllers/userController");
const auth = require("../middlewares/auth");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/enroll", auth, enrollCourse);
router.post("/cancel-enrollment", auth, cancelEnrollment);
router.post("/my-courses", auth, getEnrolledCourses);

module.exports = router;
