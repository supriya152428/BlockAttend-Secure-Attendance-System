import { Link } from "react-router-dom";

import {
  LayoutDashboard,
  ClipboardCheck,
  BarChart3,
  ShieldCheck,
  Settings,
  ScanFace,
} from "lucide-react";

function Sidebar() {

  return (

    <div
      className="
      w-[280px]
      h-screen
      bg-black/30
      backdrop-blur-2xl
      border-r border-white/10
      p-6
      fixed
      "
    >

      {/* Logo */}

      <h1
        className="
        text-4xl
        font-bold
        text-white
        mb-14
        tracking-wide
        "
      >
        BlockAttend
      </h1>

      {/* Menu */}

      <div className="space-y-5">

        {/* Dashboard */}

        <Link
          to="/dashboard"
          className="
          flex
          items-center
          gap-4
          text-white
          bg-indigo-500/20
          border
          border-indigo-500/30
          p-4
          rounded-2xl
          transition
          "
        >

          <LayoutDashboard size={22} />

          <span className="text-lg">
            Dashboard
          </span>

        </Link>


        {/* Attendance */}

        <Link
          to="/attendance"
          className="
          flex
          items-center
          gap-4
          text-slate-300
          hover:text-white
          hover:bg-white/5
          p-4
          rounded-2xl
          transition
          "
        >

          <ClipboardCheck size={22} />

          <span className="text-lg">
            Attendance
          </span>

        </Link>
        
        <Link
  to="/teacher-dashboard"
  className="
  flex
  items-center
  gap-4
  text-slate-300
  hover:text-white
  hover:bg-white/5
  p-4
  rounded-2xl
  transition
  "
>
  <LayoutDashboard size={22} />

  <span className="text-lg">
    Teacher Dashboard
  </span>
</Link>


        {/* Analytics */}

        <Link
          to="/analytics"
          className="
          flex
          items-center
          gap-4
          text-slate-300
          hover:text-white
          hover:bg-white/5
          p-4
          rounded-2xl
          transition
          "
        >

          <BarChart3 size={22} />

          <span className="text-lg">
            Analytics
          </span>

        </Link>


        {/* Blockchain */}

        <Link
          to="/blockchain"
          className="
          flex
          items-center
          gap-4
          text-slate-300
          hover:text-white
          hover:bg-white/5
          p-4
          rounded-2xl
          transition
          "
        >

          <ShieldCheck size={22} />

          <span className="text-lg">
            Blockchain Logs
          </span>

        </Link>


        {/* Face Attendance */}

        <Link
          to="/face-attendance"
          className="
          flex
          items-center
          gap-4
          text-slate-300
          hover:text-white
          hover:bg-white/5
          p-4
          rounded-2xl
          transition
          "
        >

          <ScanFace size={22} />

          <span className="text-lg">
            Face Attendance
          </span>

        </Link>


        {/* Settings */}

<Link
  to="/settings"
  className="
  flex
  items-center
  gap-4
  text-slate-300
  hover:text-white
  hover:bg-white/5
  p-4
  rounded-2xl
  transition
  "
>
  <Settings size={22} />

  <span className="text-lg">
    Settings
  </span>
</Link>

      </div>

    </div>

  );

}

export default Sidebar;