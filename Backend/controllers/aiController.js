const pool = require("../config/db");


// AI ATTENDANCE RISK ANALYSIS
const getRiskAnalysis = async (req, res) => {

  try {

    // Attendance Analytics Query
    const analytics = await pool.query(
      `
      SELECT

      user_id,

      ROUND(
        (
          COUNT(
            CASE
            WHEN attendance_status = 'Present'
            THEN 1
            END
          )::numeric

          / COUNT(*)
        ) * 100,
        2
      ) AS attendance_percentage

      FROM attendance

      GROUP BY user_id
      `
    );


    // Risk Detection
    const riskStudents = [];

    for (const student of analytics.rows) {

      let risk_level = "Low";


      // High Risk Detection
      if (student.attendance_percentage < 75) {

        risk_level = "High";


        // Store AI Alert
        await pool.query(
          `
          INSERT INTO ai_alerts
          (
            user_id,
            risk_level,
            message
          )

          VALUES ($1, $2, $3)
          `,
          [
            student.user_id,
            risk_level,
            "Attendance below 75%"
          ]
        );

      }


      // Final AI Result
      riskStudents.push({
        ...student,
        risk_level,
      });

    }


    // Response
    res.status(200).json({
      success: true,
      analytics: riskStudents,
    });

  } catch (err) {

    console.log(err.message);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};



// GET ALL AI ALERTS
const getAllAlerts = async (req, res) => {

  try {

    const alerts = await pool.query(
      `
      SELECT *

      FROM ai_alerts

      ORDER BY created_at DESC
      `
    );

    res.status(200).json({
      success: true,
      alerts: alerts.rows,
    });

  } catch (err) {

    console.log(err.message);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};



// DASHBOARD STATS
const getDashboardStats = async (req, res) => {

  try {

    // Total Users
    const users = await pool.query(
      `
      SELECT COUNT(*) FROM users
      `
    );


    // Total Attendance
    const attendance = await pool.query(
      `
      SELECT COUNT(*) FROM attendance
      `
    );


    // Total AI Alerts
    const alerts = await pool.query(
      `
      SELECT COUNT(*) FROM ai_alerts
      `
    );


    // Final Response
    res.status(200).json({
      success: true,

      stats: {
        total_users: users.rows[0].count,
        total_attendance: attendance.rows[0].count,
        total_alerts: alerts.rows[0].count,
      },

    });

  } catch (err) {

    console.log(err.message);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};



module.exports = {
  getRiskAnalysis,
  getAllAlerts,
  getDashboardStats,
};