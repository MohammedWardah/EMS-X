import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import axios from "axios";

const LeaveList = () => {
  const { user } = useAuth();
  const [leaves, setLeaves] = React.useState([]);
  let sno = 1;

  const fetchLeaves = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/leave/${user._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        setLeaves(response.data.leaves);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.message);
      }
    }
  };

  React.useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Leave Requests</h3>
      </div>
      <div className="flex justify-between items-center">
        <Link
          to="/employee-dashboard/request-leave"
          className="px-4 py-1 bg-teal-600 rounded text-white"
        >
          New Request
        </Link>
      </div>

      <table className="w-full text-sm text-left text-white-900 mt-6">
        <thead className="text-xs text-green-800 uppercase bg-gray-900 border border-gray-300">
          <tr>
            <th className="px-6 py-3">Leave No</th>
            <th className="px-6 py-3">Type</th>
            <th className="px-6 py-3">From</th>
            <th className="px-6 py-3">Until</th>
            <th className="px-6 py-3">Description</th>
            <th className="px-6 py-3">Request Date</th>
            <th className="px-6 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr
              key={leave._id}
              className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
            >
              <td className="px-6 py-3">{sno++}</td>
              <td className="px-6 py-3">{leave.leaveType}</td>
              <td className="px-6 py-3">
                {new Date(leave.startDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-3">
                {new Date(leave.endDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-3">{leave.reason}</td>
              <td className="px-6 py-3">
                {new Date(leave.appliedDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-3">{leave.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default LeaveList;
