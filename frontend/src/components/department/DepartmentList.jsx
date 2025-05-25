import React from "react";
import { Link } from "react-router-dom";
import { columns, DepartmentButtons } from "../../utilities/DepartmentHelper";
import axios from "axios";

const customStyles = {
  rows: {
    style: {
      backgroundColor: "#171c23",
      color: "#e5e7eb",
      minHeight: "56px",
      borderBottom: "1px solid #232936",
    },
  },
  headCells: {
    style: {
      backgroundColor: "#232936",
      color: "#E5E7EB", // Tailwind blue-400
      fontWeight: "bold",
      fontSize: "1.05rem",
      letterSpacing: "0.03em",
      borderRadius: "1px",
    },
  },
  table: {
    style: {
      backgroundColor: "#171c23",
      borderRadius: "1rem",
    },
  },
  pagination: {
    style: {
      backgroundColor: "#171c23",
      color: "#E5E7EB",
      borderTop: "1px solid #232936",
    },
  },
};

const DepartmentList = () => {
  const [departments, setDepartments] = React.useState([]);
  const [depLoading, setDepLoading] = React.useState(false);
  const [filteredDepartments, setFilteredDepartments] = React.useState([]);

  const onDepartmentDelete = () => {
    fetchDepartments();
  };

  const fetchDepartments = async () => {
    setDepLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/department", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        let sno = 1;
        const data = await response.data.departments.map((dep) => ({
          _id: dep._id,
          sno: sno++,
          dep_name: dep.dep_name,
          description: dep.description,
          action: (
            <DepartmentButtons _id={dep._id} onDepartmentDelete={onDepartmentDelete} />
          ),
        }));
        setDepartments(data);
        setFilteredDepartments(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    } finally {
      setDepLoading(false);
    }
  };

  React.useEffect(() => {
    fetchDepartments();
  }, []);

  const filterDepartments = (e) => {
    const records = departments.filter((dep) =>
      dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredDepartments(records);
  };

  return (
    <div className="bg-white/4 max-h-4/5 backdrop-blur-md mx-auto rounded-2xl shadow-lg p-6 overflow-hidden">
      {/* Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-6">
        {/* Search */}
        <input
          type="text"
          placeholder="Search departments..."
          className="w-full sm:w-72 px-4 py-2 rounded-lg bg-[#161e27] text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a7ee43d7] transition"
          onChange={filterDepartments}
        />
        {/* Title */}
        <div className="text-center flex-1">
          <h3 className="text-2xl font-bold text-[#e5e7eb] text-center">
            Manage Departments
          </h3>
        </div>
        {/* Add Button */}
        <Link
          to="/admin-dashboard/add-department"
          className="bg-[#a7ee43] hover:bg-[#a7ee43d7] text-black font-semibold px-5 py-2 rounded-xl shadow-md transition-all duration-150"
        >
          + Add New Department
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-auto rounded-lg shadow border border-[#232d39] h-[420px]">
        <table className="min-w-full divide-y divide-[#232d39] bg-[#161e27] text-sm">
          <thead>
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={col.name || idx}
                  className="px-4 py-3 font-semibold text-left text-gray-300 uppercase tracking-wider"
                >
                  {col.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {depLoading ? (
              <tr>
                <td colSpan={columns.length}>
                  <div className="flex items-center justify-center h-40">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-[#a7ee43]" />
                  </div>
                </td>
              </tr>
            ) : filteredDepartments.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-10 text-gray-500">
                  No departments found.
                </td>
              </tr>
            ) : (
              filteredDepartments.map((dep, rowIdx) => (
                <tr
                  key={dep._id || rowIdx}
                  className={
                    rowIdx % 2 === 0
                      ? "bg-[#1e293b] hover:bg-[#222e3c]"
                      : "bg-[#161e27] hover:bg-[#1b2430]"
                  }
                >
                  {columns.map((col, colIdx) => (
                    <td
                      key={col.name || colIdx}
                      className="px-4 py-3 text-gray-200 whitespace-nowrap"
                    >
                      {typeof col.selector === "function"
                        ? col.selector(dep)
                        : dep[col.selector]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DepartmentList;
