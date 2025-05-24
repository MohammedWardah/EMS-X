import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/authContext";
// Icons
import { MdOutlineDashboard } from "react-icons/md";
import { LiaMoneyCheckAltSolid } from "react-icons/lia";
import { IoMdExit } from "react-icons/io";
import logo from "../../assets/images/logo.png";
import logomini from "../../assets/images/logomini.png";
import { HiOutlineCalendar, HiOutlineUser } from "react-icons/hi";
import { BsListCheck } from "react-icons/bs";

const EmpSidebar = () => {
  const { logout, user } = useAuth();

  // Sidebar nav links
  const navLinks = [
    {
      to: "/employee-dashboard",
      icon: <MdOutlineDashboard size={21} />,
      label: "Dashboard",
      end: true,
    },
    {
      to: `/employee-dashboard/tasks/${user?._id}`,
      icon: <BsListCheck size={21} />,
      label: "Tasks",
    },
    {
      to: `/employee-dashboard/meetings/${user?._id}`,
      icon: <HiOutlineCalendar size={21} />,
      label: "Meetings",
    },
    {
      to: `/employee-dashboard/leave/${user?._id}`,
      icon: <IoMdExit size={21} />,
      label: "Leave",
    },
    {
      to: `/employee-dashboard/salary/${user?._id}`,
      icon: <LiaMoneyCheckAltSolid size={21} />,
      label: "Payroll",
    },
    {
      to: `/employee-dashboard/profile/${user?._id}`,
      icon: <HiOutlineUser size={21} />,
      label: "Profile",
    },
  ];

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 flex flex-col z-30 items-center">
      {/* Logo and Title */}
      <div
        className="flex items-center gap-3 font-bold text-xl px-4 border-b select-none w-full justify-center"
        style={{
          borderColor: "#232936",
          height: "80px",
        }}
      >
        <img src={logo} alt="Logo" className="w-12 h-12" draggable={false} />
        <h3 className="tracking-wider text-2xl">EMS-X</h3>
      </div>
      {/* Navigation Links */}
      <nav className="flex flex-col flex-1 w-full px-4 gap-2 pt-4">
        {navLinks.map(({ to, icon, label, end }) => (
          <NavLink
            to={to}
            key={label}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 py-2 px-4 rounded-xl font-medium transition-all duration-150 
              ${
                isActive
                  ? "text-[#a7ee43] bg-[#232936]"
                  : "text-[#e5e7eb]  hover:bg-[#232936]"
              }`
            }
          >
            {icon}
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
      {/* Logout Button pinned at the bottom */}
      <button
        className="w-2/3 py-2 rounded-xl bg-red-900 text-white font-semibold shadow hover:bg-red-800 transition-all duration-150 mb-4 mx-4"
        onClick={logout}
      >
        Logout
      </button>
    </aside>
  );
};

export default EmpSidebar;
