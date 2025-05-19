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

  return (
    <>
      {leave ? (
        <div>
          <h2 className="text-2xl font-bold">Leave Request Details</h2>
          <div>
            <img
              src={`http://localhost:5000/${leave.employeeId.userId.profileImage}`}
              alt=""
              style={{
                width: "200px",
                height: "200px",
              }}
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <h3>
              <span>Name: </span>
              {leave.employeeId.userId.name}
            </h3>
            <p>
              <span>Employee ID: </span>
              {leave.employeeId.employeeId}
            </p>
            <p>
              <span>Gender: </span>
              {leave.employeeId.gender}
            </p>
            <p>
              <span>Department: </span>
              {leave.employeeId.department.dep_name}
            </p>
            <p>
              <span>Position: </span>
              {leave.employeeId.designation}
            </p>
            <p>
              <span>Phone: </span>
              {leave.employeeId.phone}
            </p>
            <p>
              <span>Leave Type: </span>
              {leave.leaveType}
            </p>
            <p>
              <span>Reason: </span>
              {leave.reason}
            </p>
            <p>
              <span>From: </span>
              {new Date(leave.startDate).toLocaleDateString()}
            </p>
            <p>
              <span>Until: </span>
              {new Date(leave.endDate).toLocaleDateString()}
            </p>
            <p className="text-lg font-bold">
              {leave.status === "Pending" ? "Action:" : "Status:"}
            </p>
            {leave.status === "Pending" ? (
              <div className="flex space-x-2">
                <button
                  className="px-2 py-0.5 bg-teal-500"
                  onClick={() => {
                    changeStatus(leave._id, "Approved");
                  }}
                >
                  Approve
                </button>
                <button
                  className="px-2 py-0.5 bg-red-500"
                  onClick={() => {
                    changeStatus(leave._id, "Rejected");
                  }}
                >
                  Reject
                </button>
              </div>
            ) : (
              <p className="font-medium">{leave.status}</p>
            )}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}{" "}
    </>
  );
};

export default LeaveDetails;
