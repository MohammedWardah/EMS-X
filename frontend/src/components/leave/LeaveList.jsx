import React from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/authContext";

const LeaveList = () => {
  const [leaves, setLeaves] = React.useState(null);
  let sno = 1;
  const { id } = useParams();
  const { user } = useAuth();
  const [loading, setLoading] = React.useState(true);

  const fetchLeaves = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/leave/${id}/${user.role}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        setLeaves(response.data.leaves);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <div className="max-w-9/10 mx-auto bg-white/4 backdrop-blur-md rounded-2xl shadow-lg p-8 mt-4 overflow-hidden">
      {/* Title & Button */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h3 className="text-2xl font-bold text-white text-center sm:text-left flex-1">
          Leave Requests
        </h3>
        {user.role === "employee" && (
          <Link
            to="/employee-dashboard/request-leave"
            className="px-6 py-2 rounded-xl bg-[#a7ee43] hover:bg-[#a7ee43d7] text-gray-900 font-semibold shadow transition"
          >
            + New Request
          </Link>
        )}
      </div>
      {/* Table */}
      <div className="overflow-auto rounded-lg shadow border border-[#232d39]">
        {loading ? (
          <div className="flex items-center justify-center min-h-[350px] w-full">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#a7ee43]" />
            <span className="text-gray-400 ml-4 text-xl">Loading...</span>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-[#232d39] bg-[#161e27] text-sm">
            <thead>
              <tr>
                <th className="px-4 py-3 font-semibold text-left text-sky-200 uppercase tracking-wider">
                  #
                </th>
                <th className="px-4 py-3 font-semibold text-left text-sky-200 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-4 py-3 font-semibold text-left text-sky-200 uppercase tracking-wider">
                  From
                </th>
                <th className="px-4 py-3 font-semibold text-left text-sky-200 uppercase tracking-wider">
                  Until
                </th>
                <th className="px-4 py-3 font-semibold text-left text-sky-200 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-4 py-3 font-semibold text-left text-sky-200 uppercase tracking-wider">
                  Request Date
                </th>
                <th className="px-4 py-3 font-semibold text-left text-sky-200 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {leaves === null ? (
                <tr>
                  <td colSpan={7}>
                    <div className="flex items-center justify-center h-40">
                      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#a7ee43]" />
                    </div>
                  </td>
                </tr>
              ) : leaves.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-gray-500">
                    No leave requests found.
                  </td>
                </tr>
              ) : (
                leaves.map((leave, idx) => (
                  <tr
                    key={leave._id}
                    className={
                      idx % 2 === 0
                        ? "bg-[#1e293b] hover:bg-[#222e3c]"
                        : "bg-[#161e27] hover:bg-[#1b2430]"
                    }
                  >
                    <td className="px-4 py-3 text-gray-100">{idx + 1}</td>
                    <td className="px-4 py-3 text-gray-100">{leave.leaveType}</td>
                    <td className="px-4 py-3 text-gray-100">
                      {new Date(leave.startDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-gray-100">
                      {new Date(leave.endDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-gray-100">{leave.reason}</td>
                    <td className="px-4 py-3 text-gray-100">
                      {new Date(leave.appliedAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-gray-100">
                      {/* Status color coding example */}
                      <span
                        className={
                          leave.status === "Pending"
                            ? "px-3 py-1 rounded-full bg-amber-400/80 text-gray-900 font-semibold text-xs"
                            : leave.status === "Approved"
                            ? "px-3 py-1 rounded-full bg-teal-400/80 text-gray-900 font-semibold text-xs"
                            : "px-3 py-1 rounded-full bg-rose-400/80 text-gray-900 font-semibold text-xs"
                        }
                      >
                        {leave.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
export default LeaveList;
