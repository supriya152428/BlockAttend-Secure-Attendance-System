import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../layouts/DashboardLayout";

function Attendance() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAttendance();
  }, []);

  async function fetchAttendance() {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/attendance/analytics",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAttendanceData(response.data.analytics);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  function getRiskLevel(student) {
    const percentage = Number(student.attendance_percentage);

    if (student.risk_level) {
      return student.risk_level;
    }

    if (percentage < 60) {
      return "High";
    }

    if (percentage < 75) {
      return "Medium";
    }

    return "Low";
  }

  function getClassesNeeded(student) {
    if (student.classes_needed !== undefined) {
      return student.classes_needed;
    }

    let present = Number(student.present_count || 0);
    let total = Number(student.total_classes || 0);
    let classesNeeded = 0;

    if (total === 0) {
      return 0;
    }

    while ((present / total) * 100 < 75) {
      present++;
      total++;
      classesNeeded++;
    }

    return classesNeeded;
  }

  function getRiskBadge(riskLevel) {
    if (riskLevel === "High") {
      return "bg-red-500/20 text-red-400";
    }

    if (riskLevel === "Medium") {
      return "bg-yellow-500/20 text-yellow-400";
    }

    return "bg-green-500/20 text-green-400";
  }

  function getRiskMessage(student) {
    const percentage = Number(student.attendance_percentage);
    const classesNeeded = getClassesNeeded(student);

    if (percentage >= 75) {
      return `${student.full_name} is safe with ${percentage}% attendance.`;
    }

    return `${student.full_name} needs to attend next ${classesNeeded} classes continuously to reach 75%.`;
  }

  const riskStudents = attendanceData.filter(
    (student) => Number(student.attendance_percentage) < 75
  );

  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-4xl font-bold text-white mb-8">
          Attendance Records
        </h1>

        <div
          className="
          grid
          grid-cols-3
          gap-6
          mb-8
          "
        >
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h3 className="text-slate-400">Total Students</h3>

            <p className="text-4xl font-bold text-cyan-400 mt-3">
              {attendanceData.length}
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h3 className="text-slate-400">Risk Students</h3>

            <p className="text-4xl font-bold text-red-400 mt-3">
              {riskStudents.length}
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h3 className="text-slate-400">Safe Students</h3>

            <p className="text-4xl font-bold text-green-400 mt-3">
              {attendanceData.length - riskStudents.length}
            </p>
          </div>
        </div>

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
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Student Attendance
              </h2>

              <p className="text-slate-400 mt-2">
                AI-assisted attendance shortage prediction
              </p>
            </div>
          </div>

          {loading ? (
            <p className="text-white">Loading...</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 text-slate-400">
                  <th className="text-left py-4">Student Name</th>

                  <th className="text-left py-4">Total Classes</th>

                  <th className="text-left py-4">Attendance %</th>

                  <th className="text-left py-4">Risk Level</th>

                  <th className="text-left py-4">Classes Needed</th>

                  <th className="text-left py-4">Status</th>
                </tr>
              </thead>

              <tbody>
                {attendanceData.map((student) => {
                  const riskLevel = getRiskLevel(student);
                  const classesNeeded = getClassesNeeded(student);

                  return (
                    <tr
                      key={student.user_id}
                      className="border-b border-white/10"
                    >
                      <td className="py-5 text-white">{student.full_name}</td>

                      <td className="py-5 text-white">
                        {student.total_classes}
                      </td>

                      <td className="py-5 text-white">
                        {student.attendance_percentage}%
                      </td>

                      <td className="py-5">
                        <span
                          className={`${getRiskBadge(
                            riskLevel
                          )} px-4 py-2 rounded-full`}
                        >
                          {riskLevel}
                        </span>
                      </td>

                      <td className="py-5 text-white">
                        {classesNeeded === 0
                          ? "Already Safe"
                          : `${classesNeeded} classes`}
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
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {!loading && attendanceData.length > 0 && (
          <div
            className="
            mt-8
            bg-indigo-500/10
            border border-indigo-500/20
            rounded-3xl
            p-8
            "
          >
            <h2 className="text-2xl font-bold text-indigo-400">
              AI-Assisted Attendance Prediction
            </h2>

            <p className="text-slate-300 mt-4 text-lg">
              This module analyzes current attendance percentage, total classes,
              and present count to predict shortage risk and calculate how many
              consecutive classes a student must attend to reach 75%.
            </p>

            <div className="grid grid-cols-2 gap-6 mt-6">
              {attendanceData.slice(0, 4).map((student) => (
                <div
                  key={student.user_id}
                  className="
                  bg-white/5
                  border border-white/10
                  rounded-2xl
                  p-5
                  "
                >
                  <h3 className="text-white font-bold text-lg">
                    {student.full_name}
                  </h3>

                  <p className="text-slate-400 mt-2">
                    {getRiskMessage(student)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Attendance;