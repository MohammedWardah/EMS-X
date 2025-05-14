import React from "react";
import styles from "./AdminSummary.module.css";
import SummaryCard from "./SummaryCard";
import {
  FaBuilding,
  FaCheckCircle,
  FaHourglass,
  FaMoneyBill,
  FaTimesCircle,
  FaUsers,
  FaFileAlt,
} from "react-icons/fa";

const AdminSummary = () => {
  return (
    <div className={`${styles.adminSummary} p-6`}>
      <h3 className="text-2x1 font-bold">Dashboard Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3  gap-4 mt-6">
        <SummaryCard
          icon={<FaUsers />}
          text="Total Employees"
          number={11}
          color="bg-gray-600"
        />
        <SummaryCard
          icon={<FaBuilding />}
          text="Total Departments"
          number={3}
          color="bg-gray-600"
        />
        <SummaryCard
          icon={<FaMoneyBill />}
          text="Monthly Pay"
          number={`$${654}`}
          color="bg-gray-600"
        />
      </div>

      <div className="mt-12">
        <h4 className="text-left text-2x1 font-bold">Leave Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <SummaryCard
            icon={<FaFileAlt />}
            text="Leave Applications"
            number={5}
            color="bg-gray-600"
          />
          <SummaryCard
            icon={<FaCheckCircle />}
            text="Leave Approved"
            number={2}
            color="bg-gray-600"
          />
          <SummaryCard
            icon={<FaHourglass />}
            text="Leave Pending"
            number={1}
            color="bg-gray-600"
          />
          <SummaryCard
            icon={<FaTimesCircle />}
            text="Leave Rejected"
            number={4}
            color="bg-gray-600"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
