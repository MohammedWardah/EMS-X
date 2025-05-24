import React from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RequestLeave = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
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
    setLoading(true);
    try {
      const response = await axios.post(`http://localhost:5000/api/leave/add`, leave, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        navigate(`/employee-dashboard/leave/${user._id}`);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto my-8 bg-white/4 backdrop-blur-md p-8 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-white mb-8 text-center tracking-tight">
        Leave Request
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Leave Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-100 mb-1">
              Leave Type
            </label>
            <select
              name="leaveType"
              onChange={handleChange}
              className="w-full rounded-full px-4 py-2 bg-[#161e27] text-gray-100 border border-[#232d39] focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            >
              <option value="">Select Leave Type</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Annual Leave">Annual Leave</option>
            </select>
          </div>

          {/* Date Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-semibold text-gray-100 mb-1">
                From Date
              </label>
              <input
                type="date"
                name="startDate"
                onChange={handleChange}
                className="w-full rounded-full px-4 py-2 bg-[#161e27] text-gray-100 border border-[#232d39] focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-100 mb-1">
                To Date
              </label>
              <input
                type="date"
                name="endDate"
                onChange={handleChange}
                className="w-full rounded-full px-4 py-2 bg-[#161e27] text-gray-100 border border-[#232d39] focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-100 mb-1">
              Description
            </label>
            <textarea
              name="reason"
              placeholder="Reason"
              onChange={handleChange}
              value={leave.reason}
              className="w-full rounded-2xl px-4 py-3 bg-[#161e27] text-gray-100 border border-[#232d39] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none min-h-[90px]"
              required
            ></textarea>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <button
            type="submit"
            className="w-full md:w-1/2 bg-[#a7ee43] hover:bg-[#a7ee43d7] text-black font-bold py-3 rounded-full shadow transition text-m"
          >
            {loading ? "Sending Request" : "Send Request"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RequestLeave;
