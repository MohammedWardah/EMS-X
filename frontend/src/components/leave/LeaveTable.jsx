import React from "react";
import axios from "axios";
import { LeaveButtons } from "../../utilities/LeaveHelper";

const statusColors = {
  Pending: "bg-amber-400/80 text-gray-900",
  Approved: "bg-teal-400/80 text-gray-900",
  Rejected: "bg-rose-400/80 text-gray-900",
};

const LeaveTable = () => {
  const [leaves, setLeaves] = React.useState([]);
  const [filteredLeaves, setFilteredLeaves] = React.useState([]);
  const [statusFilter, setStatusFilter] = React.useState("");
  const [searchEmpId, setSearchEmpId] = React.useState("");

  const fetchLeaves = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/leave", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        let sno = 1;
        const data = response.data.leaves.map((leave) => ({
          _id: leave._id,
          sno: sno++,
          employeeId: leave.employeeId.employeeId,
          name: leave.employeeId.userId.name,
          leaveType: leave.leaveType,
          department: leave.employeeId.department.dep_name,
          days: Math.ceil(
            (new Date(leave.endDate) - new Date(leave.startDate)) / (1000 * 60 * 60 * 24)
          ),
          status: leave.status,
          action: <LeaveButtons Id={leave._id} />,
        }));
        setLeaves(data);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      }
    }
  };

  React.useEffect(() => {
    fetchLeaves();
  }, []);

  // Filtering logic
  React.useEffect(() => {
    let result = leaves;

    // Status filter (if any)
    if (statusFilter) {
      result = result.filter((leave) => leave.status.toLowerCase() === statusFilter);
    }

    // Employee ID search (if any)
    if (searchEmpId.trim() !== "") {
      result = result.filter((leave) =>
        leave.employeeId.toLowerCase().includes(searchEmpId.trim().toLowerCase())
      );
    }

    setFilteredLeaves(result);
  }, [leaves, statusFilter, searchEmpId]);

  // Handlers
  const handleStatusFilter = (status) => setStatusFilter(status);
  const handleShowAll = () => setStatusFilter("");
  const handleSearchInput = (e) => setSearchEmpId(e.target.value);

  return (
    <div className="p-4 max-h-4/5 bg-white/4 max-h-4/5 backdrop-blur-md">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-[#e5e7eb] text-center">Leave Requests</h3>
      </div>

      {/* Filter buttons */}
      <div className="flex flex-wrap items-center mb-4 gap-2">
        <button
          className={`w-22 py-1.5 rounded-full font-semibold text-base ${
            statusFilter === "Pending"
              ? "bg-amber-400/90 text-gray-900"
              : "bg-amber-400/70 text-gray-900 hover:bg-amber-400/90"
          } transition`}
          onClick={() => handleStatusFilter("pending")}
        >
          Pending
        </button>
        <button
          className={`w-22 py-1.5 rounded-full font-semibold text-base ${
            statusFilter === "Approved"
              ? "bg-teal-400/90 text-gray-900"
              : "bg-teal-400/70 text-gray-900 hover:bg-teal-400/90"
          } transition`}
          onClick={() => handleStatusFilter("approved")}
        >
          Approved
        </button>
        <button
          className={`w-22 py-1.5 rounded-full font-semibold text-base ${
            statusFilter === "Rejected"
              ? "bg-rose-400/90 text-gray-900"
              : "bg-rose-400/70 text-gray-900 hover:bg-rose-400/90"
          } transition`}
          onClick={() => handleStatusFilter("rejected")}
        >
          Rejected
        </button>
        <button
          className="w-22 py-1.5 rounded-full font-semibold text-base bg-green-600 text-gray-900 hover:bg-green-500 transition"
          onClick={handleShowAll}
        >
          Show All
        </button>
        {/* Search input */}
        <input
          type="text"
          placeholder="Search by Emp ID"
          value={searchEmpId}
          onChange={handleSearchInput}
          className="ml-4 px-3 py-2 border border-gray-400 rounded-lg bg-[#181f29] text-gray-100"
        />
      </div>

      {/* Table */}
      <div className="overflow-auto rounded-2xl shadow border border-[#232d39] bg-[#10161c]/80">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-[#1d2736]">
              <th className="px-4 py-3 font-bold text-gray-300">S No</th>
              <th className="px-4 py-3 font-bold text-gray-300">Emp ID</th>
              <th className="px-4 py-3 font-bold text-gray-300">Name</th>
              <th className="px-4 py-3 font-bold text-gray-300">Leave Type</th>
              <th className="px-4 py-3 font-bold text-gray-300">Department</th>
              <th className="px-4 py-3 font-bold text-gray-300">Days</th>
              <th className="px-4 py-3 font-bold text-gray-300">Status</th>
              <th className="px-4 py-3 font-bold text-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {!filteredLeaves ? (
              <tr>
                <td colSpan={8}>
                  <div className="flex items-center justify-center min-h-[200px] w-full">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#a7ee43]" />
                    <span className="text-gray-400 ml-4 text-lg">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : filteredLeaves.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center text-gray-400 py-8">
                  No leave requests found.
                </td>
              </tr>
            ) : (
              filteredLeaves.map((leave) => (
                <tr key={leave._id} className="hover:bg-[#202c3a]/70 transition-colors">
                  <td className="px-4 py-2 text-gray-300">{leave.sno}</td>
                  <td className="px-4 py-2 text-gray-200">{leave.employeeId}</td>
                  <td className="px-4 py-2 text-gray-200">{leave.name}</td>
                  <td className="px-4 py-2 text-gray-200">{leave.leaveType}</td>
                  <td className="px-4 py-2 text-gray-200">{leave.department}</td>
                  <td className="px-4 py-2 text-gray-200">{leave.days}</td>
                  <td className="px-4 py-2">
                    <span
                      className={
                        "inline-block px-3 py-1 rounded-full font-semibold text-xs " +
                        (statusColors[leave.status] || "bg-gray-700 text-gray-300")
                      }
                    >
                      {leave.status?.charAt(0).toUpperCase() + leave.status?.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-2">{leave.action}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveTable;
