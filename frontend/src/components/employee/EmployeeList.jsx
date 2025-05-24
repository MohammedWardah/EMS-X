import React from "react";
import { Link } from "react-router-dom";
import { columns, EmployeeButtons } from "../../utilities/EmployeeHelper";
import axios from "axios";

const EmployeeList = () => {
  const [employees, setEmployees] = React.useState([]);
  const [empLoading, setEmpLoading] = React.useState(false);
  const [filteredEmployees, setFilteredEmployees] = React.useState([]);

  React.useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/employee", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.success) {
          let sno = 1;
          const data = await response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            dep_name: emp.department.dep_name,
            name: emp.userId.name,
            dob: new Date(emp.dob).toDateString(),
            profileImage: (
              <img
                className="rounded-full w-12 h-12"
                src={`http://localhost:5000/${emp.userId.profileImage}`}
              />
            ),
            // bonus:
            designation: emp.designation,
            phone: emp.phone,
            action: <EmployeeButtons id={emp._id} />,
          }));
          setEmployees(data);
          setFilteredEmployees(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setEmpLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleFilter = (e) => {
    const records = employees.filter((emp) =>
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredEmployees(records);
  };

  return (
    <div className="bg-white/4 backdrop-blur-md mx-auto rounded-2xl shadow-lg p-6 overflow-hidden">
      {/* Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          className="w-full sm:w-72 px-4 py-2 rounded-lg bg-[#161e27] text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a7ee43d7] transition"
          onChange={handleFilter}
        />
        <div className="text-center">
          <h3 className="text-3xl font-bold text-[#e5e7eb] text-center">
            Manage Employees
          </h3>
        </div>
        <Link
          to="/admin-dashboard/add-employee"
          className="bg-[#a7ee43] hover:bg-[#a7ee43d7] text-black font-semibold px-5 py-2 rounded-xl shadow-md transition-all duration-150"
        >
          + Add New Employee
        </Link>
      </div>

      {/* Table */}
      <div className="rounded-lg shadow border border-[#232d39] max-h-[520px] overflow-y-auto">
        <table className="min-w-full divide-y divide-[#232d39] bg-[#161e27] text-sm">
          <thead>
            <tr className="bg-[#1e293b] sticky top-0 z-10">
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
            {empLoading ? (
              <tr>
                <td colSpan={columns.length}>
                  <div className="flex items-center justify-center h-40">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-[#a7ee43]" />
                  </div>
                </td>
              </tr>
            ) : filteredEmployees.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-10 text-gray-500">
                  No employees found.
                </td>
              </tr>
            ) : (
              filteredEmployees.map((emp, rowIdx) => (
                <tr
                  key={emp._id || rowIdx}
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
                        ? col.selector(emp)
                        : emp[col.selector]}
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

export default EmployeeList;
