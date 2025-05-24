import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const LeaveDetails = () => {
  const { id } = useParams();
  const [leave, setLeave] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchLeave = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/leave/detail/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.success) {
          setLeave(response.data.leave);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };
    fetchLeave();
  }, []);

  const changeStatus = async (id, status) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/leave/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/leave-requests");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  function capitalizeFirst(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <>
      {leave ? (
        <div className="max-w-2xl mx-auto mt-10 bg-[#10161c] rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#e5e7eb] text-center mb-4">
            Leave Request Details
          </h2>
          <div className="flex flex-col items-center mb-8">
            <img
              src={`http://localhost:5000/${leave.employeeId.userId.profileImage}`}
              alt={leave.employeeId.userId.name}
              className="w-28 h-28 rounded-full object-cover border-4 border-gray-700 shadow"
              style={{
                minWidth: "96px",
                minHeight: "96px",
                maxWidth: "120px",
                maxHeight: "120px",
              }}
            />
            <p className="mt-3 text-xl font-semibold text-white">
              {leave.employeeId.userId.name}
            </p>
            <p className="text-gray-400 text-sm">{leave.employeeId.employeeId}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <Detail label="Gender" value={capitalizeFirst(leave.employeeId.gender)} />
            <Detail label="Phone" value={leave.employeeId.phone} />
            <Detail label="Department" value={leave.employeeId.department.dep_name} />
            <Detail label="Position" value={leave.employeeId.designation} />
            <Detail label="Leave Type" value={leave.leaveType} />
            <Detail label="Reason" value={leave.reason} />
            <Detail label="From" value={new Date(leave.startDate).toLocaleDateString()} />
            <Detail label="Until" value={new Date(leave.endDate).toLocaleDateString()} />
          </div>

          {/* Status and actions */}
          <div className="mt-4 flex items-center gap-4">
            <span className="text-lg font-bold text-white">
              {leave.status === "Pending" ? "Action:" : "Status:"}
            </span>
            {leave.status === "Pending" ? (
              <div className="flex gap-3">
                <button
                  className="w-25 px-3 py-2 rounded-full font-bold bg-green-500 hover:bg-green-600 text-gray-800 shadow transition"
                  onClick={() => changeStatus(leave._id, "Approved")}
                >
                  Approve
                </button>
                <button
                  className="w-25 px-3 py-2 rounded-full font-bold bg-red-500 hover:bg-red-600 text-gray-800 shadow transition"
                  onClick={() => changeStatus(leave._id, "Rejected")}
                >
                  Reject
                </button>
              </div>
            ) : (
              <span
                className={
                  "px-4 py-1 rounded-full text-sm font-semibold " +
                  (leave.status === "Approved"
                    ? "bg-teal-400/80 text-gray-900"
                    : leave.status === "Rejected"
                    ? "bg-rose-400/80 text-gray-900"
                    : "bg-amber-400/80 text-gray-900")
                }
              >
                {leave.status}
              </span>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[350px] w-full">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#a7ee43]" />
          <span className="text-gray-400 ml-4 text-xl">Loading...</span>
        </div>
      )}
    </>
  );

  // Small helper component to keep info neat
  function Detail({ label, value }) {
    return (
      <div className="flex flex-col mb-1">
        <span className="text-gray-400 text-xs">{label}</span>
        <span className="text-white font-medium">{value}</span>
      </div>
    );
  }
};

export default LeaveDetails;
