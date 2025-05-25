import React, { useState, useEffect } from "react";
import axios from "axios";
import { fetchDepartments } from "../../utilities/EmployeeHelper";

const API_BASE = "http://localhost:5000/api";

const AdminMeetingsList = () => {
  const [showForm, setShowForm] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    department: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const init = async () => {
      const deps = await fetchDepartments();
      setDepartments(deps);
      await loadMeetings();
    };
    init();
  }, []);

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

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingId
        ? `${API_BASE}/meetings/${editingId}`
        : `${API_BASE}/meetings/add`;
      const method = editingId ? "put" : "post";
      await axios[method](url, form, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      resetForm();
      await loadMeetings();
    } catch (err) {
      console.error("Error submitting meeting", err);
    }
  };

  const handleEdit = (meeting) => {
    setEditingId(meeting._id);
    setForm({
      title: meeting.title,
      description: meeting.description,
      date: meeting.date.slice(0, 16), // for datetime-local
      department: meeting.department._id,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this meeting?")) return;
    try {
      await axios.delete(`${API_BASE}/meetings/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      await loadMeetings();
    } catch (err) {
      console.error("Failed deleting meeting", err);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      title: "",
      description: "",
      date: "",
      department: "",
    });
    setShowForm(false);
  };

  return (
    <>
      <div className="relative p-4 bg-white/5 rounded-2xl shadow-lg overflow-hidden z-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-4">
          <h2 className="text-2xl font-bold text-[#e5e7eb] text-center md:text-left flex-1">
            All Meetings
          </h2>
          <button
            onClick={() => setShowForm((v) => !v)}
            className="px-4 py-2 rounded-xl bg-[#a7ee43] hover:bg-[#a7ee43d7] text-black font-semibold shadow transition whitespace-nowrap"
          >
            + New Meeting
          </button>
        </div>
        <div className="rounded-xl overflow-x-auto transition-all duration-300">
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
                  <th className="px-4 py-2 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {meetings.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-6 text-gray-500">
                      No meetings found
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
                      <td className="px-4 py-2 align-top">
                        {meeting.department.dep_name}
                      </td>
                      <td className="px-4 py-2 align-top flex gap-2">
                        <button
                          onClick={() => handleEdit(meeting)}
                          className="w-18 px-1 py-1 rounded-xl bg-[#60a5fa] hover:bg-[#3b82f6] text-gray-700 font-semibold shadow transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(meeting._id)}
                          className="w-18 px-1 py-1 rounded-xl bg-rose-500 hover:bg-rose-600 text-gray-700 font-semibold shadow transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {/* Modal Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
    w-full max-w-xl bg-[#1E222A]/90 backdrop-blur-lg rounded-2xl shadow-2xl
    px-8 py-8"
        >
          <button
            type="button"
            onClick={resetForm}
            className="absolute top-4 right-4 text-gray-300 hover:text-red-400 text-2xl font-bold rounded-full focus:outline-none focus:ring-2 focus:ring-red-400 transition"
            aria-label="Close"
          >
            ×
          </button>
          <h2 className="text-3xl font-bold mb-8 text-[#e5e7eb] text-center tracking-tight">
            {editingId ? "Edit Meeting" : "Add New Meeting"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Department */}
            <div className="md:col-span-2">
              <label className="block text-gray-400 font-semibold mb-2 text-sm">
                Department
              </label>
              <select
                name="department"
                value={form.department}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-[#161e27] text-gray-200 border border-[#232d39] focus:ring-2 focus:ring-[#a7ee43] transition"
                required
              >
                <option value="">Select Department</option>
                {departments.map((dep) => (
                  <option key={dep._id} value={dep._id}>
                    {dep.dep_name}
                  </option>
                ))}
              </select>
            </div>
            {/* Title */}
            <div>
              <label className="block text-gray-400 font-semibold mb-2 text-sm">
                Title
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-[#161e27] text-gray-200 border border-[#232d39] focus:ring-2 focus:ring-[#a7ee43] transition"
                placeholder="Meeting title"
                required
              />
            </div>
            {/* Date & Time */}
            <div>
              <label className="block text-gray-400 font-semibold mb-2 text-sm">
                Date & Time
              </label>
              <input
                type="datetime-local"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-[#161e27] text-gray-200 border border-[#232d39] focus:ring-2 focus:ring-[#a7ee43] transition"
                required
              />
            </div>
            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-gray-400 font-semibold mb-2 text-sm">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-[#161e27] text-gray-200 border border-[#232d39] focus:ring-2 focus:ring-[#a7ee43] transition"
                rows={4}
                placeholder="Meeting description"
                required
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-8 py-3 bg-[#a7ee43] hover:bg-[#a7ee43d7] text-black font-semibold rounded-xl shadow-lg text-lg transition"
            >
              {editingId ? "Update Meeting" : "Add Meeting"}
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default AdminMeetingsList;
