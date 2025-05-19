import React from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { columns } from "../../utilities/LeaveHelper";
import { LeaveButtons } from "../../utilities/LeaveHelper";

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
    <div className="p-6">
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold">Leave Requests</h3>
      </div>

      {/* Filter buttons */}
      <div className="flex items-center mb-4">
        <button
          className={`px-2 py-1 ml-4 ${
            statusFilter === "pending" ? "bg-yellow-600" : "bg-yellow-800"
          }`}
          onClick={() => handleStatusFilter("pending")}
        >
          Pending
        </button>
        <button
          className={`px-2 py-1 ml-4 ${
            statusFilter === "approved" ? "bg-yellow-600" : "bg-yellow-800"
          }`}
          onClick={() => handleStatusFilter("approved")}
        >
          Approved
        </button>
        <button
          className={`px-2 py-1 ml-4 ${
            statusFilter === "rejected" ? "bg-yellow-600" : "bg-yellow-800"
          }`}
          onClick={() => handleStatusFilter("rejected")}
        >
          Rejected
        </button>
        <button className="px-2 py-1 ml-4 bg-gray-700" onClick={handleShowAll}>
          Show All
        </button>

        {/* Search input */}
        <input
          type="text"
          placeholder="Search by Emp ID"
          value={searchEmpId}
          onChange={handleSearchInput}
          className="ml-8 px-2 py-1 border border-gray-400 rounded"
        />
      </div>

      {/* Table */}
      <div className="mt-5">
        <DataTable
          columns={columns}
          data={filteredLeaves}
          pagination
          noDataComponent={<div>No leave requests found.</div>}
        />
      </div>
    </div>
  );
};

export default LeaveTable;
