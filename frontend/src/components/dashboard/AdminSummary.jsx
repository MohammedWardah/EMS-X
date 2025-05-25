import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaBuilding,
  FaUsers,
  FaHourglassHalf,
  FaCheckCircle,
  FaTimesCircle,
  FaRegFileAlt,
  FaListAlt,
} from "react-icons/fa";
import { MdBeachAccess } from "react-icons/md";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { BsListCheck } from "react-icons/bs";
import { HiOutlineCalendar } from "react-icons/hi";
import SummaryCardHorizontal from "./SummaryCardHorizontal ";
import SummaryCardVertical from "./SummaryCardVertical";

const AdminSummary = () => {
  const API_BASE = "http://localhost:5000/api";
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [meetings, setMeetings] = useState([]);
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
  const text2 = `${currentMonth} Job App.`;

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

  const loadTasks = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_BASE}/tasks`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTasks(data.tasks);
    } catch (err) {
      console.error("Failed fetching tasks", err);
    } finally {
      setLoading(false);
    }
  };

  const loadMeetings = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_BASE}/meetings`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setMeetings(data.meetings);
    } catch (err) {
      console.error("Failed fetching meetings", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
    loadMeetings();
  }, []);

  if (!summary) {
    return (
      <div className="flex items-center justify-center min-h-[350px] w-full">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#a7ee43]" />
        <span className="text-gray-400 ml-4 text-xl">Loading...</span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Overview Section */}
      <section className="bg-white/4 backdrop-blur-md rounded-xl p-4 shadow">
        <div className="flex overflow-x-auto space-x-3 pb-1 px-1 md:px-0 justify-center gap-10">
          <SummaryCardHorizontal
            icon={<FaUsers size={20} className="text-gray-400" />}
            label="Employees"
            value={summary.totalEmployees}
          />
          <SummaryCardHorizontal
            icon={<FaBuilding size={20} className="text-gray-400" />}
            label="Departments"
            value={summary.totalDepartments}
          />
          <SummaryCardHorizontal
            icon={<HiOutlineBanknotes size={20} className="text-gray-400" />}
            label={text}
            value={`$${summary.totalSalary}`}
          />
          <SummaryCardHorizontal
            icon={<FaRegFileAlt size={20} className="text-gray-400" />}
            label={text2}
            value={0}
            className="w-28 truncate font-semibold text-sm text-gray-200 cursor-pointer"
          />
        </div>
      </section>

      {/* Leave Details */}
      <section className="bg-white/4 backdrop-blur-md rounded-xl p-4 shadow ">
        <h4 className="text-base font-semibold text-[#e5e7eb] mb-3">Leave Overview</h4>
        <div className="flex flex-col sm:flex-row gap-3">
          <SummaryCardVertical
            icon={<FaListAlt size={18} className="text-blue-700" />}
            label="Monthly Requests"
            value={summary.leaveSummary.applied}
          />
          <SummaryCardVertical
            icon={<FaHourglassHalf size={18} className="text-yellow-700" />}
            label="Pending Requests"
            value={summary.leaveSummary.pending}
          />
          <SummaryCardVertical
            icon={<FaCheckCircle size={18} className="text-green-700" />}
            label="Approved Requests"
            value={summary.leaveSummary.approved}
          />
          <SummaryCardVertical
            icon={<FaTimesCircle size={18} className="text-red-700" />}
            label="Rejcted Requests"
            value={summary.leaveSummary.rejected}
          />
        </div>
      </section>

      {/* Miscellaneous */}
      <section className="bg-white/4 backdrop-blur-md rounded-xl p-4 shadow">
        <h4 className="text-base font-semibold text-[#e5e7eb] mb-3">Miscellaneous</h4>
        <div className="flex flex-col sm:flex-row gap-3">
          <SummaryCardVertical
            icon={<HiOutlineCalendar size={20} className="text-blue-400" />}
            label="Upcoming Meetings"
            value={meetings.length}
          />
          <SummaryCardVertical
            icon={<BsListCheck size={20} className="text-green-400" />}
            label="Ongoing Distributed Tasks"
            value={tasks.filter((task) => task.status === "ongoing").length}
          />
          <SummaryCardVertical
            icon={<MdBeachAccess size={20} className="text-teal-400" />}
            label="Upcoming Public Holiday"
            value={"5 June"}
          />
        </div>
      </section>
    </div>
  );
};

export default AdminSummary;
