import React from "react";
import { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { HiOutlineCalendar } from "react-icons/hi";
import { BsListCheck } from "react-icons/bs";
import { MdBeachAccess } from "react-icons/md";
import axios from "axios";
import { useAuth } from "../../context/authContext";

const EmpSummary = () => {
  const { logout, user } = useAuth();
  const API_BASE = "http://localhost:5000/api";

  // Replace with real data
  const availableAnnualLeave = 20;

  //Latest leave
  const [latestLeave, setLatestLeave] = React.useState(null);
  const [tasks, setTasks] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [meetings, setMeetings] = useState([]);

  React.useEffect(() => {
    const fetchLatestLeave = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/leave/${user._id}/${user.role}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success && response.data.leaves.length > 0) {
          setLatestLeave(response.data.leaves.at(-1));
        } else {
          setLatestLeave(null);
        }
      } catch (err) {
        setLatestLeave(null);
      }
      setLoading(false);
    };
    fetchLatestLeave();
  }, [user._id, user.role]);

  //Tasks count
  const loadTasks = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_BASE}/tasks/employee/${user._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTasks(data.tasks);
    } catch (err) {
      console.error("Failed fetching employee tasks", err);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  const loadMeetings = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_BASE}/meetings/employee/${user._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setMeetings(data.meetings);
    } catch (err) {
      setMeetings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user._id) loadTasks();
  }, [user._id]);

  useEffect(() => {
    if (user._id) loadMeetings();
  }, [user._id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[350px] w-full">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#a7ee43]" />
        <span className="text-gray-400 ml-4 text-xl">Loading...</span>
      </div>
    );
  }

  return (
    <div
      className="w-full max-w-4xl mx-auto grid gap-6 mt-8
    grid-cols-1 md:grid-cols-3
    grid-rows-2
    auto-rows-fr"
    >
      {/* === Row 1: Tasks, Meetings, Annual Leave === */}
      <div className="flex flex-col items-center justify-center bg-white/4 backdrop-blur-md rounded-2xl p-6 shadow border border-[#232d39] min-h-[160px] ">
        <BsListCheck size={32} className="mb-2 text-green-400" />
        <span className="text-2xl font-bold text-white">
          {tasks.filter((task) => task.status === "ongoing").length}
        </span>
        <span className="text-gray-400 mt-1">Ongoing Tasks</span>
      </div>
      <div className="flex flex-col items-center justify-center bg-white/4 backdrop-blur-md rounded-2xl p-6 shadow border border-[#232d39] min-h-[160px]">
        <HiOutlineCalendar size={32} className="mb-2 text-blue-400" />
        <span className="text-2xl font-bold text-white">{meetings.length}</span>
        <span className="text-gray-400 mt-1">Upcoming Meetings</span>
      </div>
      <div className="flex flex-col items-center justify-center bg-white/4 backdrop-blur-md rounded-2xl p-6 shadow border border-[#232d39] min-h-[160px]">
        <span className="text-4xl font-extrabold text-white">{availableAnnualLeave}</span>
        <span className="text-gray-300 mt-2 text-lg font-semibold text-center">
          Annual Leave Days Left
        </span>
      </div>

      {/* === Row 2: Latest Leave Request (left, spans 2 columns) + Next Holiday (right) === */}
      <div className="bg-white/4 backdrop-blur-md rounded-2xl p-6 shadow border border-[#232d39] flex flex-col items-start min-h-[160px] md:col-span-2">
        <div className="flex items-center gap-3 mb-2">
          <FaCalendarAlt size={32} className="text-red-400" />
          <span className="text-lg font-semibold text-white">Latest Leave Request</span>
        </div>
        <div className="text-gray-300 text-left min-h-[48px] flex items-center">
          {latestLeave === null ? (
            <span className="text-gray-500">No leave requests found.</span>
          ) : (
            <div>
              <div>
                <span className="font-semibold text-gray-400">Date: </span>
                {new Date(latestLeave.appliedAt || latestLeave.date).toLocaleDateString()}
              </div>
              <div>
                <span className="font-semibold text-gray-400">Type: </span>
                {latestLeave.leaveType || latestLeave.type}
              </div>
              <div>
                <span className="font-semibold text-gray-400">Status: </span>
                <span
                  className={`font-bold ${
                    (latestLeave.status || "").toLowerCase() === "approved"
                      ? "text-teal-400"
                      : (latestLeave.status || "").toLowerCase() === "pending"
                      ? "text-amber-400"
                      : "text-rose-400"
                  }`}
                >
                  {latestLeave.status}
                </span>
              </div>
              {latestLeave.reason && (
                <div>
                  <span className="font-semibold text-gray-400">Reason: </span>
                  {latestLeave.reason}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center bg-white/4 backdrop-blur-md rounded-2xl p-6 shadow border border-[#232d39] min-h-[160px]">
        <MdBeachAccess size={32} className="mb-2 text-teal-400" />
        <span className="text-lg text-gray-300 mb-1">Upcoming Public Holiday</span>
        <span className="text-2xl font-bold text-white">5 June</span>
      </div>
    </div>
  );
};

export default EmpSummary;
