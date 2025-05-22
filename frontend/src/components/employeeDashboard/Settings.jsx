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
    <div className="max-w-md mx-auto mt-16 p-8 rounded-2xl shadow-2xl w-full bg-white/5">
      <h2 className="text-2xl font-bold mb-7 text-[#e5e7eb] text-center">
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
        <button
          type="submit"
          className="w-full mt-4 bg-[#a7ee43] hover:bg-[#a7ee43d7] text-[#171c23] font-bold py-3 rounded-xl shadow-md transition-all duration-150"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default Settings;
