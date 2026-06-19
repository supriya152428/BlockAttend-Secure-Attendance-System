const express = require("express");

const router = express.Router();

const {
  markAttendance,
  getStudentAttendance,
  getAllAttendance,
  getAttendanceAnalytics,
} = require("../controllers/attendanceController");

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");     


// MARK ATTENDANCE
router.post(
  "/mark",
  verifyToken,
  authorizeRoles("teacher", "admin"),
  markAttendance
);


// GET STUDENT ATTENDANCE
router.get(
  "/student/:id",
  verifyToken,
  getStudentAttendance
);


// GET ALL ATTENDANCE
router.get(
  "/all",
  verifyToken,
  getAllAttendance
);


// ATTENDANCE ANALYTICS
router.get(
  "/analytics",
  verifyToken,
  getAttendanceAnalytics
);


module.exports = router;