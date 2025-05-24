// src/components/tasks/EmployeeTasksList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

// Backend base URL
const API_BASE = "http://localhost:5000/api";

const EmployeeTasksList = () => {
  const { id } = useParams(); // <-- grabs the :id from the URL
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_BASE}/tasks/employee/${id}`, {
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

  useEffect(() => {
    if (id) loadTasks();
  }, [id]);

  const markComplete = async (taskId) => {
    try {
      await axios.put(
        `${API_BASE}/tasks/${taskId}/complete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      await loadTasks();
    } catch (err) {
      console.error("Failed to mark task complete", err);
      alert("Could not mark task complete");
    }
  };
  return (
    <div className="relative p-4 bg-white/5 rounded-2xl shadow-lg overflow-hidden z-10">
      <h2 className="text-2xl font-bold text-[#e5e7eb] mb-6 text-center">
        My Assigned Tasks
      </h2>
      <div className="rounded-xl overflow-x-auto">
        {loading ? (
          // Show spinner for first load only
          <div className="flex items-center justify-center min-h-[350px] w-full">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#a7ee43]" />
            <span className="text-gray-400 ml-4 text-xl">Loading...</span>
          </div>
        ) : (
          <table className="min-w-full text-gray-200">
            <thead className="bg-[#232d39]">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">Name</th>
                <th className="px-4 py-2 text-left font-semibold">Description</th>
                <th className="px-4 py-2 text-left font-semibold">Deadline</th>
                <th className="px-4 py-2 text-left font-semibold">Status</th>
                <th className="px-4 py-2 text-left font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500">
                    No tasks assigned to you.
                  </td>
                </tr>
              ) : (
                tasks.map((task) => (
                  <tr
                    key={task._id}
                    className="border-t border-gray-700 hover:bg-[#161e27]"
                  >
                    <td className="px-4 py-2 align-top">{task.name}</td>
                    <td className="px-4 py-2 align-top">{task.description}</td>
                    <td className="px-4 py-2 align-top">
                      {new Date(task.deadline).toLocaleDateString()}
                    </td>
                    <td className="px-1 py-2 align-top">
                      <span
                        className={
                          "inline-block px-3 py-1 rounded-full font-semibold text-sm " +
                          (task.status === "completed"
                            ? "text-teal-400"
                            : "text-amber-400")
                        }
                      >
                        {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-2 align-top">
                      {task.status === "ongoing" ? (
                        <button
                          onClick={() => markComplete(task._id)}
                          className="w-35 px-2 py-1 rounded-xl bg-green-500 hover:bg-green-600 text-gray-700 font-semibold shadow transition whitespace-nowrap text-sm"
                        >
                          Mark Complete
                        </button>
                      ) : (
                        <span className="text-xs text-gray-400">No available action</span>
                      )}
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

export default EmployeeTasksList;
