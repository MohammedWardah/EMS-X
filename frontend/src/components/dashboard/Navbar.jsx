import { useAuth } from "../../context/authContext.jsx";
import { NavLink } from "react-router-dom";
import { LiaCogSolid } from "react-icons/lia";
import { FaRegBell, FaRegEnvelope } from "react-icons/fa";

const Navbar = () => {
  const { user } = useAuth();
  return (
    <div className="flex items-center justify-between w-full">
      <span className="text-lg font-semibold tracking-wide text-[#e5e7eb]">
        Skylines Corp - {user.name}
      </span>
      <div className="flex gap-1">
        <NavLink
          to="#"
          className={({ isActive }) =>
            `flex items-center gap-3 py-2 px-4 rounded-xl font-medium transition-all duration-150 
          ${!isActive ? "text-[#a7ee43]" : "text-[#e5e7eb]  hover:bg-[#232936]"}`
          }
        >
          <FaRegBell size={22} />
        </NavLink>
        <NavLink
          to="#"
          className={({ isActive }) =>
            `flex items-center gap-3 py-2 px-4 rounded-xl font-medium transition-all duration-150 
          ${!isActive ? "text-[#a7ee43]" : "text-[#e5e7eb]  hover:bg-[#232936]"}`
          }
        >
          <FaRegEnvelope size={22} />
        </NavLink>
        <NavLink
          to="/admin-dashboard/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 py-2 px-4 rounded-xl font-medium transition-all duration-150 
                ${isActive ? "text-[#a7ee43]" : "text-[#e5e7eb]  hover:bg-[#232936]"}`
          }
        >
          <LiaCogSolid size={24} />
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
