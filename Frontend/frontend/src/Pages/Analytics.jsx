import DashboardLayout from "../layouts/DashboardLayout";

function Analytics() {

  const subjects = [
    {
      name: "DBMS",
      percentage: 92,
      color: "bg-green-400",
    },
    {
      name: "Operating Systems",
      percentage: 84,
      color: "bg-yellow-400",
    },
    {
      name: "Computer Networks",
      percentage: 78,
      color: "bg-cyan-400",
    },
    {
      name: "Data Structures",
      percentage: 72,
      color: "bg-red-400",
    },
  ];

  return (

    <DashboardLayout>

      <div className="p-8">

        {/* PAGE TITLE */}

        <h1 className="text-4xl font-bold text-white mb-8">
          Attendance Analytics
        </h1>


        {/* STATS CARDS */}

        <div className="grid grid-cols-3 gap-6 mb-10">

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

            <h3 className="text-slate-400">
              Overall Attendance
            </h3>

            <p className="text-5xl font-bold text-cyan-400 mt-3">
              89%
            </p>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

            <h3 className="text-slate-400">
              Safe Subjects
            </h3>

            <p className="text-5xl font-bold text-green-400 mt-3">
              3
            </p>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

            <h3 className="text-slate-400">
              Risk Subjects
            </h3>

            <p className="text-5xl font-bold text-red-400 mt-3">
              1
            </p>

          </div>

        </div>


        {/* SUBJECT ANALYTICS */}

        <div className="grid grid-cols-2 gap-6">

          {subjects.map((subject) => (

            <div
              key={subject.name}
              className="
              bg-white/5
              border border-white/10
              rounded-3xl
              p-6
              hover:scale-105
              transition-all
              duration-300
              "
            >

              <div className="flex justify-between">

                <h3 className="text-white text-xl">
                  {subject.name}
                </h3>

                <span className="font-bold text-white">
                  {subject.percentage}%
                </span>

              </div>

              <div className="w-full h-3 bg-slate-800 rounded-full mt-5">

                <div
                  className={`${subject.color} h-full rounded-full`}
                  style={{
                    width: `${subject.percentage}%`,
                  }}
                />

              </div>

            </div>

          ))}

        </div>


        {/* AI INSIGHT CARD */}

        <div
          className="
          mt-10
          bg-indigo-500/10
          border border-indigo-500/20
          rounded-3xl
          p-8
          "
        >

          <h2 className="text-2xl font-bold text-indigo-400">

            AI Attendance Insight

          </h2>

          <p className="text-slate-300 mt-4 text-lg">

            Data Structures attendance is below the
            recommended threshold. Additional attendance
            is required to avoid shortage risk.

          </p>

        </div>


        {/* RECOMMENDATIONS */}

        <div className="grid grid-cols-2 gap-6 mt-8">

          <div
            className="
            bg-green-500/10
            border border-green-500/20
            rounded-3xl
            p-6
            "
          >

            <h3 className="text-green-400 text-xl font-bold">
              Best Performing Subject
            </h3>

            <p className="text-white mt-3">
              DBMS (92%)
            </p>

          </div>

          <div
            className="
            bg-red-500/10
            border border-red-500/20
            rounded-3xl
            p-6
            "
          >

            <h3 className="text-red-400 text-xl font-bold">
              Needs Improvement
            </h3>

            <p className="text-white mt-3">
              Data Structures (72%)
            </p>

          </div>

        </div>

      </div>

    </DashboardLayout>

  );

}

export default Analytics;