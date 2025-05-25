import React from "react";
import { Link } from "react-router-dom";
import { AttendanceHelper } from "../../utilities/AttendanceHelper";
import axios from "axios";

const Attendance = () => {
  const [attendance, setAttendance] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [filteredAttendance, setFilteredAttendance] = React.useState([]);
  const [search, setSearch] = React.useState("");

  // Fetch attendance records
  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/attendance", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        let sno = 1;
        const data = response.data.attendance.map((att) => ({
          employeeId: att.employeeId.employeeId,
          designation: att.employeeId.designation,
          sno: sno++,
          department: att.employeeId.department.dep_name,
          name: att.employeeId.userId.name,
          status: att.status,
        }));
        setAttendance(data);
        setFilteredAttendance(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchAttendance();
    // eslint-disable-next-line
  }, []);

  // Handle search
  const handleFilter = (e) => {
    setSearch(e.target.value);
    const val = e.target.value.toLowerCase();
    setFilteredAttendance(
      attendance.filter((emp) => emp.employeeId.toLowerCase().includes(val))
    );
  };

  const statusChange = () => {
    fetchAttendance();
  };

  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <div className="p-4 bg-white/4 max-h-4/5 backdrop-blur-md">
      <h2 className="text-2xl font-bold text-[#e5e7eb] text-center">Attendance Entry</h2>
      {/* Filter/Search */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <span className="text-lg font-semibold text-gray-200">
          Mark Employees for:{" "}
          <span className="underline font-bold text-teal-500">{todayStr}</span>
        </span>
        <input
          type="text"
          placeholder="Search by ID"
          className="ml-auto px-4 py-2 rounded-xl bg-[#141d2b] text-gray-100 border border-gray-600 placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all duration-200"
          onChange={handleFilter}
          value={search}
        />
        <Link
          to="/admin-dashboard/attendance-report"
          className="ml-4 px-4 py-2 rounded-xl bg-[#a7ee43] hover:bg-[#a7ee43d7] text-black font-semibold shadow transition"
        >
          Attendance Report
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[350px] w-full">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#a7ee43]" />
          <span className="text-gray-400 ml-4 text-xl">Loading...</span>
        </div>
      ) : !filteredAttendance || filteredAttendance.length === 0 ? (
        <div className="text-center text-gray-500 py-20 text-lg">No employees found.</div>
      ) : (
        <div className="rounded-2xl bg-white/5 backdrop-blur-lg shadow-xl border border-gray-800 p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-[#101726]">
                  <th className="px-4 py-3 font-bold text-gray-300">#</th>
                  <th className="px-4 py-3 font-bold text-gray-300">Employee ID</th>
                  <th className="px-4 py-3 font-bold text-gray-300">Name</th>
                  <th className="px-4 py-3 font-bold text-gray-300">Department</th>
                  <th className="px-4 py-3 font-bold text-gray-300">Position</th>
                  <th className="px-4 py-3 font-bold text-gray-300">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredAttendance.map((data, i) => (
                  <tr
                    key={data.employeeId}
                    className="hover:bg-[#35151b]/80 transition-colors duration-200"
                  >
                    <td className="px-4 py-2 text-gray-400">{i + 1}</td>
                    <td className="px-4 py-2 text-gray-200">{data.employeeId}</td>
                    <td className="px-4 py-2 text-gray-200">{data.name}</td>
                    <td className="px-4 py-2 text-gray-200">{data.department}</td>
                    <td className="px-4 py-2 text-gray-200">{data.designation}</td>
                    <td className="px-4 py-2">
                      <AttendanceHelper
                        status={data.status === "sick" ? "sick leave" : data.status}
                        employeeId={data.employeeId}
                        statusChange={statusChange}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;
