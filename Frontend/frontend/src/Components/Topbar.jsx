function Topbar() {
  return (
    <div className="flex items-center justify-between mb-12">

      <div>
        <h1 className="text-5xl font-bold text-white">
          Dashboard
        </h1>

        <p className="text-slate-400 mt-2 text-lg">
          Welcome back, Supriya 👋
        </p>
      </div>

      <div
        className="
        bg-indigo-500/20
        border border-indigo-500/30
        px-6 py-4
        rounded-2xl
        text-indigo-300
        shadow-lg shadow-indigo-500/10
        "
      >
        AI Monitoring Active
      </div>

    </div>
  );
}

export default Topbar;