import EmpSidebar from "../components/employeeDashboard/EmpSidebar";
import Navbar from "../components/dashboard/Navbar";
import { Outlet } from "react-router-dom";

const EmployeeDashboard = () => {
  return (
    <div className="min-h-screen w-full flex">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r border-[#232936]">
        <EmpSidebar />
      </aside>
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Navbar */}
        <nav className="h-20 flex items-center border-b border-[#232936] px-8">
          <Navbar />
        </nav>
        {/* Dashboard Content */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
