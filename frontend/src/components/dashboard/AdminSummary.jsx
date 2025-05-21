import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
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
  const [summary, setSummary] = useState(null);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentMonth = monthNames[new Date().getMonth()];
  const text = `${currentMonth} Payroll`;

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const summary = await axios.get("http://localhost:5000/api/dashboard/summary", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setSummary(summary.data);
      } catch (error) {
        if (error.response) {
          alert(error.response.data.error);
        }
        console.log(error.message);
      }
    };
    fetchSummary();
  }, []);

  if (!summary) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3 className="text-2x1 font-bold">Overview</h3>
      <div className="flex flex-wrap gap-6 mt-6">
        <SummaryCard
          icon={<FaUsers />}
          text="Total Employees"
          number={summary.totalEmployees}
          color="bg-gray-600"
        />
        <SummaryCard
          icon={<FaBuilding />}
          text="Total Departments"
          number={summary.totalDepartments}
          color="bg-gray-600"
        />
        <SummaryCard
          icon={<FaMoneyBill />}
          text={text}
          number={`$${summary.totalSalary}`}
          color="bg-gray-600"
        />
      </div>

      <div className="mt-12">
        <h4 className="text-left text-2x1 font-bold">Leave Details</h4>
        <div className="flex gap-6">
          <SummaryCard
            icon={<FaFileAlt />}
            text="Monthly Requests"
            number={summary.leaveSummary.applied}
            color="bg-gray-600"
          />
          <SummaryCard
            icon={<FaHourglass />}
            text="Pending Requests"
            number={summary.leaveSummary.pending}
            color="bg-gray-600"
          />
        </div>
      </div>
      <div className="mt-12">
        <h4 className="text-left text-2x1 font-bold">Job Applicantions</h4>
        <div className="flex gap-6">
          <SummaryCard
            icon={<FaFileAlt />}
            text="Total Applications"
            number={99}
            color="bg-gray-600"
          />
          <SummaryCard
            icon={<FaHourglass />}
            text="Pending Applications"
            number={99}
            color="bg-gray-600"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
