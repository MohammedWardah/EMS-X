import React from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RequestLeave = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [leave, setLeave] = React.useState({
    userId: user._id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeave((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/leave/add`, leave, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        navigate("/employee-dashboard/leave");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <div className=" m-10 bg-gray-900 p-6 rounded-md shadow-md max-h-1/2">
      <h2 className="text-2xl font-bold mb-6">Request for Leave</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-4">
          {/* Leave Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Leave Type</label>
            <select
              name="leaveType"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Department</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Annual Leave">Annual Leave</option>
            </select>
          </div>

          {/* From Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">From Date</label>
              <input
                type="date"
                name="startDate"
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* To Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">To Date</label>
              <input
                type="date"
                name="endDate"
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="reason"
              placeholder="Reason"
              onChange={handleChange}
              className="w-full border border-gray-300"
              value={leave.reason}
            ></textarea>
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
        >
          Send Request
        </button>
      </form>
    </div>
  );
};

export default RequestLeave;
