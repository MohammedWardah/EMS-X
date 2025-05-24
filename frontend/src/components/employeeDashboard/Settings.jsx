import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const Settings = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [setting, setSetting] = useState({
    userId: user._id,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSetting({ ...setting, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (setting.newPassword !== setting.confirmPassword) {
      setError("Password not matched");
    } else {
      try {
        const response = await axios.put(
          "http://localhost:5000/api/setting/change-password",
          setting,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          navigate("/login");
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          setError(error.response.data.error);
        }
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-16 p-8 rounded-2xl shadow-2xl w-full bg-white/5">
      <h1 className="text-3xl font-bold mb-8 text-[#e5e7eb] text-center tracking-wide">
        Account Settings
      </h1>

      {/* Change Password Section */}
      <div className="max-w-md mx-auto bg-[#161e27]/80 p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-5 text-[#e5e7eb] text-center">
          Change Password
        </h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-[#e5e7eb] mb-2">
              Old Password
            </label>
            <input
              type="password"
              name="oldPassword"
              placeholder="Old Password"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-[#232936] text-[#e5e7eb] border border-[#232936] placeholder-gray-400 focus:outline-none focus:border-[#a7ee43] transition-all duration-200 shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#e5e7eb] mb-2">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-[#232936] text-[#e5e7eb] border border-[#232936] placeholder-gray-400 focus:outline-none focus:border-[#a7ee43] transition-all duration-200 shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#e5e7eb] mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-[#232936] text-[#e5e7eb] border border-[#232936] placeholder-gray-400 focus:outline-none focus:border-[#a7ee43] transition-all duration-200 shadow-sm"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-1/2 mt-4 bg-[#a7ee43] hover:bg-[#a7ee43d7] text-[#171c23] font-bold py-3 rounded-xl shadow-md transition-all duration-150"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
