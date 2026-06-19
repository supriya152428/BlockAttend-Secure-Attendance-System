const pool = require("../config/db");
const generateHash = require("../utils/blockchain");


// MARK ATTENDANCE
const markAttendance = async (req, res) => {

  try {

    // Data coming from frontend/Postman
    const {
      user_id,
      subject_id,
      attendance_status,
      attendance_date,
    } = req.body;


    // Create unique attendance string
    const hashData =
      `${user_id}-${subject_id}-${attendance_date}-${attendance_status}`;


    // Generate blockchain hash
    const blockchain_hash = generateHash(hashData);


    // Store Attendance in PostgreSQL
    const attendance = await pool.query(
      `
      INSERT INTO attendance
      (
        user_id,
        subject_id,
        attendance_status,
        attendance_date,
        blockchain_hash
      )

      VALUES ($1, $2, $3, $4, $5)

      RETURNING *
      `,
      [
        user_id,
        subject_id,
        attendance_status,
        attendance_date,
        blockchain_hash
      ]
    );


    // Store Activity Log
    await pool.query(
      `
      INSERT INTO activity_logs
      (
        activity_type,
        description
      )

      VALUES ($1, $2)
      `,
      [
        "ATTENDANCE_MARKED",
        `Attendance marked for User ID ${user_id}`
      ]
    );


    // Success Response
    res.status(201).json({
      success: true,
      message: "Attendance Marked Successfully 🚀",
      attendance: attendance.rows[0],
    });

  } catch (err) {

    console.log(err.message);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};



// GET STUDENT ATTENDANCE
const getStudentAttendance = async (req, res) => {

  try {

    const attendance = await pool.query(
      `
      SELECT *

      FROM attendance

      WHERE user_id = $1
      `,
      [req.params.id]
    );

    res.status(200).json({
      success: true,
      attendance: attendance.rows,
    });

  } catch (err) {

    console.log(err.message);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};



// GET ALL ATTENDANCE
const getAllAttendance = async (req, res) => {

  try {

    const attendance = await pool.query(
      `
      SELECT *

      FROM attendance
      `
    );

    res.status(200).json({
      success: true,
      attendance: attendance.rows,
    });

  } catch (err) {

    console.log(err.message);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};



// ATTENDANCE ANALYTICS
const getAttendanceAnalytics = async (req, res) => {
  try {
    const analytics = await pool.query(`
      SELECT
        u.id AS user_id,
        u.full_name,

        COUNT(*) AS total_classes,

        COUNT(
          CASE
          WHEN a.attendance_status = 'Present'
          THEN 1
          END
        ) AS present_count,

        COUNT(
          CASE
          WHEN a.attendance_status = 'Absent'
          THEN 1
          END
        ) AS absent_count,

        ROUND(
          (
            COUNT(
              CASE
              WHEN a.attendance_status = 'Present'
              THEN 1
              END
            )::numeric / COUNT(*)
          ) * 100,
          2
        ) AS attendance_percentage

      FROM attendance a
      JOIN users u
      ON a.user_id = u.id

      GROUP BY
      u.id,
      u.full_name
    `);

    const updatedAnalytics = analytics.rows.map((student) => {
      let present = Number(student.present_count);
      let total = Number(student.total_classes);
      let classes_needed = 0;

      while ((present / total) * 100 < 75) {
        present++;
        total++;
        classes_needed++;
      }

      let risk_level = "Low";

      if (student.attendance_percentage < 60) {
        risk_level = "High";
      } else if (student.attendance_percentage < 75) {
        risk_level = "Medium";
      }

      const if_miss_next =
        ((Number(student.present_count) / (Number(student.total_classes) + 1)) *
          100).toFixed(2);

      return {
        ...student,
        risk_level,
        classes_needed,
        if_miss_next,
      };
    });

    res.status(200).json({
      success: true,
      analytics: updatedAnalytics,
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
  markAttendance,
  getStudentAttendance,
  getAllAttendance,
  getAttendanceAnalytics,
};