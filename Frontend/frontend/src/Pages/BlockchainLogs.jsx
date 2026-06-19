import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../layouts/DashboardLayout";

function BlockchainLogs() {

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  async function fetchLogs() {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/attendance/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRecords(response.data.attendance);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }
  }

  return (

    <DashboardLayout>

      <div className="p-8">

        <h1 className="text-4xl font-bold text-white mb-8">
          Blockchain Logs
        </h1>

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

          {loading ? (

            <p className="text-white">
              Loading...
            </p>

          ) : (

            <table className="w-full">

              <thead>

                <tr className="border-b border-white/10 text-slate-400">

                  <th className="text-left py-4">
                    Hash
                  </th>

                  <th className="text-left py-4">
                    User ID
                  </th>

                  <th className="text-left py-4">
                    Subject ID
                  </th>

                  <th className="text-left py-4">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {records.map((record) => (

                  <tr
                    key={record.id}
                    className="border-b border-white/10"
                  >

                    <td className="py-5 text-cyan-400">

                      {record.blockchain_hash?.slice(0, 25)}...

                    </td>

                    <td className="py-5 text-white">

                      {record.user_id}

                    </td>

                    <td className="py-5 text-white">

                      {record.subject_id}

                    </td>

                    <td className="py-5">

                      <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full">

                        {record.attendance_status}

                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </div>

      </div>

    </DashboardLayout>

  );

}

export default BlockchainLogs;