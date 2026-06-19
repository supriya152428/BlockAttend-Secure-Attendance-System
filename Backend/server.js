require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use("/api/auth", authRoutes);

app.use("/api/attendance", attendanceRoutes);

app.use("/api/ai", aiRoutes);


// PostgreSQL Connection
pool.connect()
  .then(() => {
    console.log("PostgreSQL Connected 🚀");
  })
  .catch((err) => {
    console.log(err.message);
  });


// Default Route
app.get("/", (req, res) => {
  res.send("BlockAttend AI Backend Running 🚀");
});


// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});