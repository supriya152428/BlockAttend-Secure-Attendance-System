import Sidebar from "../Components/Sidebar";

function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black">

      <Sidebar />

      <div className="ml-[280px] flex-1 p-10">
        {children}
      </div>

    </div>
  );
}

export default DashboardLayout;