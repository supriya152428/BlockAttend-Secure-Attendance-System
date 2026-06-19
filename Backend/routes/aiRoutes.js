const express = require("express");

const router = express.Router();

const {
  getRiskAnalysis,
  getAllAlerts,
  getDashboardStats,
} = require("../controllers/aiController");

const verifyToken = require("../middleware/authMiddleware");


// AI Risk Analysis
router.get(
  "/risk-analysis",
  verifyToken,
  getRiskAnalysis
);


// GET ALL ALERTS
router.get(
  "/alerts",
  verifyToken,
  getAllAlerts
);


// DASHBOARD STATS
router.get(
  "/dashboard-stats",
  verifyToken,
  getDashboardStats
);


module.exports = router;