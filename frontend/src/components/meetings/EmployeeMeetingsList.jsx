import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const API_BASE = "http://localhost:5000/api";

const EmployeeMeetingsList = () => {
  const { id } = useParams();
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMeetings = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_BASE}/meetings/employee/${id}`, {
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
    if (id) loadMeetings();
  }, [id]);

  return (
    <div className="relative p-4 bg-white/5 rounded-2xl shadow-lg overflow-hidden z-10">
      <h2 className="text-2xl font-bold text-[#e5e7eb] mb-6 text-center">My Meetings</h2>
      <div className="rounded-xl overflow-x-auto">
        {loading ? (
          <div className="flex items-center justify-center min-h-[350px] w-full">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#a7ee43]" />
            <span className="text-gray-400 ml-4 text-xl">Loading...</span>
          </div>
        ) : (
          <table className="min-w-full text-gray-200">
            <thead className="bg-[#232d39]">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">Title</th>
                <th className="px-4 py-2 text-left font-semibold">Description</th>
                <th className="px-4 py-2 text-left font-semibold">Date</th>
                <th className="px-4 py-2 text-left font-semibold">Department</th>
                <th className="px-4 py-2 text-left font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {meetings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500">
                    No meetings assigned to you.
                  </td>
                </tr>
              ) : (
                meetings.map((meeting) => (
                  <tr
                    key={meeting._id}
                    className="border-t border-gray-700 hover:bg-[#161e27]"
                  >
                    <td className="px-4 py-2 align-top">{meeting.title}</td>
                    <td className="px-4 py-2 align-top">{meeting.description}</td>
                    <td className="px-4 py-2 align-top">
                      {new Date(meeting.date).toLocaleString("en-GB", {
                        year: "numeric",
                        month: "short", // "short" for 'May', "long" for 'May', "2-digit" for '05'
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false, // 24-hour format
                      })}
                    </td>
                    <td className="px-4 py-2 align-top">{meeting.department.dep_name}</td>
                    <td className="px-4 py-2 align-top">
                      <Link
                        to={`#`}
                        className="px-3 py-1 rounded-xl bg-[#22d3ee] hover:bg-[#0ea5e9] text-gray-700 font-semibold shadow transition text-sm whitespace-nowrap"
                      >
                        Open
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default EmployeeMeetingsList;
