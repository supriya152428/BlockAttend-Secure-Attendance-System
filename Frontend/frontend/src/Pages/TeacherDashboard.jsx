import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../layouts/DashboardLayout";
import StatCard from "../Components/StatCard";

function TeacherDashboard() {
  const [stats, setStats] = useState({
    total_users: 0,
    total_attendance: 0,
    total_alerts: 0,
  });

  const [analytics, setAnalytics] = useState([]);
  const [recentAttendance, setRecentAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchTeacherData() {
    try {
      const token = localStorage.getItem("token");

      const statsRes = await axios.get(
        "http://localhost:5000/api/ai/dashboard-stats",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const analyticsRes = await axios.get(
        "http://localhost:5000/api/attendance/analytics",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const attendanceRes = await axios.get(
        "http://localhost:5000/api/attendance/all",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setStats(statsRes.data.stats);
      setAnalytics(analyticsRes.data.analytics);
      setRecentAttendance(attendanceRes.data.attendance.slice(-5).reverse());
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTeacherData();
  }, []);

  const highRiskStudents = analytics.filter(
    (student) => Number(student.attendance_percentage) < 75
  );

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-white">
            Teacher Dashboard
          </h1>

          <p className="text-slate-400 mt-3 text-lg">
            Manage attendance, monitor students, and track shortage risk.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Students"
            value={stats.total_users}
            color="text-indigo-400"
          />

          <StatCard
            title="Attendance Records"
            value={stats.total_attendance}
            color="text-cyan-400"
          />

          <StatCard
            title="Risk Students"
            value={highRiskStudents.length}
            color="text-red-400"
          />

          <StatCard
            title="AI Alerts"
            value={stats.total_alerts}
            color="text-yellow-400"
          />
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-white">
                  Student Attendance Overview
                </h2>

                <p className="text-slate-400 mt-2">
                  Students below 75% are marked as risk.
                </p>
              </div>

              <a
                href="/attendance"
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-6 py-3 rounded-2xl"
              >
                View All
              </a>
            </div>

            {loading ? (
              <p className="text-white">Loading...</p>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400">
                    <th className="text-left py-4">Student</th>
                    <th className="text-left py-4">Total Classes</th>
                    <th className="text-left py-4">Attendance</th>
                    <th className="text-left py-4">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {analytics.slice(0, 6).map((student) => (
                    <tr
                      key={student.user_id}
                      className="border-b border-white/10"
                    >
                      <td className="py-5 text-white">
                        {student.full_name}
                      </td>

                      <td className="py-5 text-white">
                        {student.total_classes}
                      </td>

                      <td className="py-5 text-white">
                        {student.attendance_percentage}%
                      </td>

                      <td className="py-5">
                        {Number(student.attendance_percentage) >= 75 ? (
                          <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full">
                            Safe
                          </span>
                        ) : (
                          <span className="bg-red-500/20 text-red-400 px-4 py-2 rounded-full">
                            Risk
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-6">
              Quick Actions
            </h2>

            <div className="space-y-4">
              <a
                href="/face-attendance"
                className="block bg-cyan-500 text-black font-bold text-center px-6 py-4 rounded-2xl hover:bg-cyan-400"
              >
                Mark Attendance
              </a>

              <a
                href="/analytics"
                className="block bg-white/5 border border-white/10 text-white text-center px-6 py-4 rounded-2xl hover:bg-white/10"
              >
                View Analytics
              </a>

              <a
                href="/blockchain"
                className="block bg-white/5 border border-white/10 text-white text-center px-6 py-4 rounded-2xl hover:bg-white/10"
              >
                Blockchain Logs
              </a>

              <a
                href="/attendance"
                className="block bg-white/5 border border-white/10 text-white text-center px-6 py-4 rounded-2xl hover:bg-white/10"
              >
                Risk Students
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-8">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-6">
              High Risk Students
            </h2>

            {highRiskStudents.length === 0 ? (
              <p className="text-slate-400">
                No high-risk students currently.
              </p>
            ) : (
              <div className="space-y-4">
                {highRiskStudents.slice(0, 5).map((student) => (
                  <div
                    key={student.user_id}
                    className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4"
                  >
                    <h3 className="text-white font-bold">
                      {student.full_name}
                    </h3>

                    <p className="text-red-400 mt-1">
                      Attendance: {student.attendance_percentage}%
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-6">
              Recent Attendance Activity
            </h2>

            {recentAttendance.length === 0 ? (
              <p className="text-slate-400">
                No recent attendance records found.
              </p>
            ) : (
              <div className="space-y-4">
                {recentAttendance.map((record) => (
                  <div
                    key={record.id}
                    className="bg-white/5 border border-white/10 rounded-2xl p-4"
                  >
                    <p className="text-white font-semibold">
                      User ID {record.user_id}
                    </p>

                    <p className="text-slate-400 mt-1">
                      Subject ID {record.subject_id} •{" "}
                      {record.attendance_status}
                    </p>

                    <p className="text-cyan-400 text-sm mt-2 break-all">
                      Hash: {record.blockchain_hash?.slice(0, 30)}...
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default TeacherDashboard;