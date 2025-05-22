import { useEffect, useState } from "react";
import axios from "axios";
import SummaryCard from "./SummaryCard";
import { FaBuilding, FaHourglass, FaMoneyBill, FaUsers, FaFileAlt } from "react-icons/fa";
import SummaryCardHorizontal from "./SummaryCardHorizontal ";
import SummaryCardVertical from "./SummaryCardVertical";

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
  const text2 = `${currentMonth} Job Applications`;

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
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Overview Section */}
      <section className="bg-[#232936] rounded-xl p-4 shadow">
        <div className="flex overflow-x-auto space-x-3 pb-1 px-1 md:px-0 justify-center gap-10">
          <SummaryCardHorizontal
            icon={<FaUsers size={20} className="text-[#60a5fa]" />}
            label="Employees"
            value={summary.totalEmployees}
          />
          <SummaryCardHorizontal
            icon={<FaBuilding size={20} className="text-[#f59e0b]" />}
            label="Departments"
            value={summary.totalDepartments}
          />
          <SummaryCardHorizontal
            icon={<FaMoneyBill size={20} className="text-[#10b981]" />}
            label={text}
            value={`$${summary.totalSalary}`}
          />
        </div>
      </section>

      {/* Leave Details */}
      <section className="bg-[#232936] rounded-xl p-4 shadow">
        <h4 className="text-base font-semibold text-[#e5e7eb] mb-3">Leave Overview</h4>
        <div className="flex flex-col sm:flex-row gap-3">
          <SummaryCardVertical
            icon={<FaFileAlt size={18} className="text-[#f472b6]" />}
            label="Monthly Requests"
            value={summary.leaveSummary.applied}
          />
          <SummaryCardVertical
            icon={<FaHourglass size={18} className="text-[#f87171]" />}
            label="Pending Requests"
            value={summary.leaveSummary.pending}
          />
          <SummaryCardVertical
            icon={<FaHourglass size={18} className="text-[#f87171]" />}
            label="Approved Requests"
            value={summary.leaveSummary.approved}
          />
          <SummaryCardVertical
            icon={<FaHourglass size={18} className="text-[#f87171]" />}
            label="Rejcted Requests"
            value={summary.leaveSummary.rejected}
          />
        </div>
      </section>

      {/* Miscellaneous */}
      <section className="bg-[#232936] rounded-xl p-4 shadow">
        <h4 className="text-base font-semibold text-[#e5e7eb] mb-3">Miscellaneous</h4>
        <div className="flex flex-col sm:flex-row gap-3">
          <SummaryCardVertical
            icon={<FaFileAlt size={18} className="text-[#38bdf8]" />}
            label={text2}
            value={0}
          />
          <SummaryCardVertical
            icon={<FaHourglass size={18} className="text-[#facc15]" />}
            label="Upcoming Meetings"
            value={0}
          />
          <SummaryCardVertical
            icon={<FaHourglass size={18} className="text-[#facc15]" />}
            label="Tasks"
            value={0}
          />
          <SummaryCardVertical
            icon={<FaHourglass size={18} className="text-[#facc15]" />}
            label="Tasks"
            value={0}
          />
          <SummaryCardVertical
            icon={<FaHourglass size={18} className="text-[#facc15]" />}
            label="Tasks"
            value={0}
          />
        </div>
      </section>
    </div>
  );
};

export default AdminSummary;
