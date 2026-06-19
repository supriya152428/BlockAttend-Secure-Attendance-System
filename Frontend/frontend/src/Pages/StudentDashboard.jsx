import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../layouts/DashboardLayout";
import Topbar from "../Components/Topbar";
import StatCard from "../Components/StatCard";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const attendanceData = [
  { month: "Jan", attendance: 82 },
  { month: "Feb", attendance: 85 },
  { month: "Mar", attendance: 88 },
  { month: "Apr", attendance: 90 },
  { month: "May", attendance: 92 },
  { month: "Jun", attendance: 94 },
];

const students = [
  {
    name: "Aarav Sharma",
    attendance: "92%",
    status: "Safe",
  },
  {
    name: "Priya Singh",
    attendance: "74%",
    status: "Warning",
  },
  {
    name: "Rahul Verma",
    attendance: "66%",
    status: "High Risk",
  },
];

function StudentDashboard() {
  const [stats, setStats] = useState({
    total_users: 0,
    total_attendance: 0,
    total_alerts: 0,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [searchedTerm, setSearchedTerm] = useState("");

  const filteredStudents = students.filter((student) => {
    const query = searchedTerm.toLowerCase();

    return (
      student.name.toLowerCase().includes(query) ||
      student.attendance.toLowerCase().includes(query) ||
      student.status.toLowerCase().includes(query)
    );
  });

  function handleSearch() {
    setSearchedTerm(searchTerm.trim());
  }

  function handleClearSearch() {
    setSearchTerm("");
    setSearchedTerm("");
  }

  async function fetchDashboardStats() {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/ai/dashboard-stats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      setStats(response.data.stats);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  return (
    <DashboardLayout>
      <Topbar />

      {/* KPI Cards */}

      <div className="grid grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Students"
          value={stats.total_users}
          color="text-indigo-400"
        />

        <StatCard
          title="Attendance Rate"
          value="92%"
          color="text-green-400"
        />

        <StatCard
          title="AI Risk Alerts"
          value={stats.total_alerts}
          color="text-yellow-400"
        />

        <StatCard
          title="Blockchain Verified"
          value={stats.total_attendance}
          color="text-cyan-400"
        />
      </div>

      {/* Dashboard Grid */}

      <div className="grid grid-cols-3 gap-6">
        {/* Analytics Chart */}

        <div
          className="
          col-span-2
          bg-white/5
          backdrop-blur-xl
          border border-white/10
          rounded-3xl
          p-6
          shadow-2xl
          "
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-white">
                Attendance Analytics
              </h2>

              <p className="text-slate-400 mt-2">
                Monthly attendance performance overview
              </p>
            </div>

            <div className="bg-indigo-500/20 text-indigo-300 px-4 py-2 rounded-2xl">
              AI Tracking Enabled
            </div>
          </div>

          {/* Premium Analytics Chart */}

          <ResponsiveContainer width="100%" height={340}>
            <LineChart
              data={attendanceData}
              margin={{
                top: 10,
                right: 20,
                left: -10,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient
                  id="attendanceGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={1} />

                  <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.2} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="4 4"
                stroke="#1e293b"
                vertical={false}
              />

              <XAxis
                dataKey="month"
                stroke="#94a3b8"
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                stroke="#94a3b8"
                tickLine={false}
                axisLine={false}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "16px",
                  color: "white",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
                }}
                labelStyle={{
                  color: "#cbd5e1",
                }}
              />

              <Line
                type="monotone"
                dataKey="attendance"
                stroke="url(#attendanceGradient)"
                strokeWidth={5}
                dot={{
                  r: 5,
                  fill: "#6366f1",
                  stroke: "#fff",
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 8,
                  fill: "#06b6d4",
                }}
                animationDuration={2500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* AI Insights */}

        <div
          className="
          bg-white/5
          backdrop-blur-xl
          border border-white/10
          rounded-3xl
          p-6
          shadow-2xl
          "
        >
          <h2 className="text-3xl font-bold text-white mb-6">
            AI Insights
          </h2>

          <div className="space-y-5">
            <div
              className="
              bg-white/5
              border border-white/10
              rounded-2xl
              p-5
              "
            >
              <h3 className="text-white text-lg font-semibold">
                Attendance Risk
              </h3>

              <p className="text-slate-400 text-sm mt-2">
                34 students are predicted to fall below 75% attendance this
                month.
              </p>
            </div>

            <div
              className="
              bg-white/5
              border border-white/10
              rounded-2xl
              p-5
              "
            >
              <h3 className="text-white text-lg font-semibold">
                Trend Analysis
              </h3>

              <p className="text-slate-400 text-sm mt-2">
                Attendance improved by 8% compared to last semester.
              </p>
            </div>

            <div
              className="
              bg-white/5
              border border-white/10
              rounded-2xl
              p-5
              "
            >
              <h3 className="text-white text-lg font-semibold">
                Blockchain Verification
              </h3>

              <p className="text-slate-400 text-sm mt-2">
                980 attendance records verified successfully on blockchain.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Table */}

      <div
        className="
        mt-8
        bg-white/5
        backdrop-blur-xl
        border border-white/10
        rounded-3xl
        p-6
        shadow-2xl
        "
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-white">
              Student Attendance Records
            </h2>

            <p className="text-slate-400 mt-2">
              AI-monitored attendance overview
            </p>
          </div>

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              className="
              bg-white/5
              border border-white/10
              px-4 py-3
              rounded-2xl
              outline-none
              text-white
              "
            />

            <button
              onClick={handleSearch}
              className="
              bg-cyan-500
              hover:bg-cyan-400
              text-black
              font-bold
              px-6
              py-3
              rounded-2xl
              transition
              shadow-[0_0_25px_rgba(34,211,238,0.35)]
              "
            >
              Search
            </button>

            <button
              onClick={handleClearSearch}
              className="
              bg-white/5
              hover:bg-white/10
              border border-white/10
              text-white
              px-6
              py-3
              rounded-2xl
              transition
              "
            >
              Clear
            </button>
          </div>
        </div>

        {searchedTerm && (
          <p className="text-slate-400 mb-5">
            Search results for{" "}
            <span className="text-cyan-400 font-semibold">
              "{searchedTerm}"
            </span>
          </p>
        )}

        <table className="w-full">
          <thead>
            <tr className="text-slate-400 border-b border-white/10">
              <th className="text-left py-4">Student Name</th>

              <th className="text-left py-4">Attendance</th>

              <th className="text-left py-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student, index) => (
                <tr
                  key={index}
                  className="border-b border-white/10 hover:bg-white/5 transition"
                >
                  <td className="py-5 text-white">{student.name}</td>

                  <td className="py-5 text-white">{student.attendance}</td>

                  <td className="py-5">
                    <span
                      className={`px-4 py-2 rounded-full text-sm ${
                        student.status === "Safe"
                          ? "bg-green-500/20 text-green-400"
                          : student.status === "Warning"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="py-10 text-center text-slate-400">
                  No student found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Recent Activity Feed */}

      <div
        className="
        mt-8
        bg-white/5
        backdrop-blur-xl
        border border-white/10
        rounded-3xl
        p-6
        shadow-2xl
        "
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white">Recent Activity</h2>

            <p className="text-slate-400 mt-2">
              Real-time attendance and blockchain updates
            </p>
          </div>

          <div className="bg-indigo-500/20 text-indigo-300 px-4 py-2 rounded-2xl">
            Live Updates
          </div>
        </div>

        <div className="space-y-5">
          <div
            className="
            flex items-start gap-4
            bg-white/5
            border border-white/10
            rounded-2xl
            p-5
            "
          >
            <div className="w-3 h-3 bg-green-400 rounded-full mt-2" />

            <div>
              <h3 className="text-white text-lg font-semibold">
                Attendance Verified
              </h3>

              <p className="text-slate-400 mt-1">
                Blockchain successfully verified attendance record for DBMS
                lecture.
              </p>

              <p className="text-slate-500 text-sm mt-2">2 minutes ago</p>
            </div>
          </div>

          <div
            className="
            flex items-start gap-4
            bg-white/5
            border border-white/10
            rounded-2xl
            p-5
            "
          >
            <div className="w-3 h-3 bg-cyan-400 rounded-full mt-2" />

            <div>
              <h3 className="text-white text-lg font-semibold">
                AI Alert Generated
              </h3>

              <p className="text-slate-400 mt-1">
                AI detected 34 students below attendance threshold this month.
              </p>

              <p className="text-slate-500 text-sm mt-2">10 minutes ago</p>
            </div>
          </div>

          <div
            className="
            flex items-start gap-4
            bg-white/5
            border border-white/10
            rounded-2xl
            p-5
            "
          >
            <div className="w-3 h-3 bg-yellow-400 rounded-full mt-2" />

            <div>
              <h3 className="text-white text-lg font-semibold">
                Attendance Analytics Updated
              </h3>

              <p className="text-slate-400 mt-1">
                Weekly attendance performance report generated for Computer
                Science department.
              </p>

              <p className="text-slate-500 text-sm mt-2">25 minutes ago</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default StudentDashboard;