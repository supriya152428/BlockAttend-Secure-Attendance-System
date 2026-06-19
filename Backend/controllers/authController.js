const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// REGISTER USER
const registerUser = async (req, res) => {

  try {

    const {
      full_name,
      email,
      password,
      role,
      department
    } = req.body;

    // Check Existing User
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert User
    const newUser = await pool.query(
      `
      INSERT INTO users
      (full_name, email, password, role, department)

      VALUES ($1, $2, $3, $4, $5)

      RETURNING id, full_name, email, role, department
      `,
      [
        full_name,
        email,
        hashedPassword,
        role,
        department
      ]
    );

    res.status(201).json({
      success: true,
      message: "User Registered Successfully 🚀",
      user: newUser.rows[0],
    });

  } catch (err) {

    console.log(err.message);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};


// LOGIN USER
const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;

    // Find User
    const user = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email",
      });
    }

    // Compare Password
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    if (!validPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    // Generate JWT Token
    const token = jwt.sign(
      {
        id: user.rows[0].id,
        role: user.rows[0].role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login Successful 🚀",

      token,

      user: {
        id: user.rows[0].id,
        full_name: user.rows[0].full_name,
        email: user.rows[0].email,
        role: user.rows[0].role,
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


// PROTECTED PROFILE
const getProfile = async (req, res) => {

  try {

    const user = await pool.query(
      `
      SELECT
      id,
      full_name,
      email,
      role,
      department

      FROM users

      WHERE id = $1
      `,
      [req.user.id]
    );

    res.status(200).json({
      success: true,
      user: user.rows[0],
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
  registerUser,
  loginUser,
  getProfile,
};