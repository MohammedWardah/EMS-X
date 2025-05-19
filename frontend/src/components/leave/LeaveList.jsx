import React from "react";
import { Link } from "react-router-dom";

const LeaveList = () => {
  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Leave Requests</h3>
      </div>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Seach By Dep Name"
          className="px-4 py-0.5 border"
        />
        <Link
          to="/employee-dashboard/request-leave"
          className="px-4 py-1 bg-teal-600 rounded text-white"
        >
          New Request
        </Link>
      </div>
    </div>
  );
};
export default LeaveList;
