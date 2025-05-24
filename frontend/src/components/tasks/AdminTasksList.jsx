import React, { useState, useEffect } from "react";
import axios from "axios";
import { fetchDepartments, getEmployees } from "../../utilities/EmployeeHelper";
import { useNavigate } from "react-router-dom";

// Backend base URL
const API_BASE = "http://localhost:5000/api";

const AdminTasksList = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    description: "",
    deadline: "",
    assignedTo: [],
  });
  const [selectedDept, setSelectedDept] = useState("");
  const [editingId, setEditingId] = useState(null);

  const displayForm = () => {
    resetForm();
    setShowForm((prev) => !prev);
  };

  // Initial load
  useEffect(() => {
    const init = async () => {
      try {
        const deps = await fetchDepartments();
        setDepartments(deps);
      } catch (err) {
        console.error("Failed fetching departments", err);
      }
      await loadTasks();
    };
    init();
  }, []);

  // Load tasks
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

  const handleDeptChange = async (eOrId) => {
    const depId = eOrId.target ? eOrId.target.value : eOrId;
    setSelectedDept(depId);
    try {
      const emps = await getEmployees(depId);
      setEmployees(emps);
      // Only reset assignedTo if not editing
      if (!editingId) {
        setForm((f) => ({ ...f, assignedTo: [] }));
      }
    } catch (err) {
      console.error("Failed fetching employees", err);
    }
  };

  // Form inputs change
  const handleChange = (e) => {
    const { name, value, options } = e.target;
    if (name === "assignedTo") {
      const selected = Array.from(options)
        .filter((o) => o.selected)
        .map((o) => o.value);
      setForm((f) => ({ ...f, assignedTo: selected }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  // Submit create or update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!selectedDept) {
        alert("Please select a department");
        return;
      }
      const url = editingId ? `${API_BASE}/tasks/${editingId}` : `${API_BASE}/tasks/add`;
      const method = editingId ? "put" : "post";
      await axios[method](url, form, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      resetForm();
      await loadTasks();
      //   navigate("/admin-dashboard");
      window.location.reload();
    } catch (err) {
      console.error("Error submitting task", err);
    }
  };

  const handleEdit = async (task) => {
    if (!showForm) setShowForm(true);
    setEditingId(task._id);

    // Get department from first assignee
    const deptId = task.assignedTo[0]?.department || "";
    setSelectedDept(deptId);

    // Fetch employees and then set form with correct assignedTo
    if (deptId) {
      const emps = await getEmployees(deptId);
      setEmployees(emps);
    }

    setForm({
      name: task.name,
      description: task.description,
      deadline: task.deadline.slice(0, 10),
      assignedTo: task.assignedTo.map((emp) => emp._id),
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await axios.delete(`${API_BASE}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      await loadTasks();
    } catch (err) {
      console.error("Failed deleting task", err);
    }
  };

  // Reset form to initial
  const resetForm = () => {
    setEditingId(null);
    setForm({ name: "", description: "", deadline: "", assignedTo: [] });
    setEmployees([]);
    setSelectedDept("");
  };

  return (
    <>
      {/* Main Container */}
      <div className="relative p-4 bg-white/5 rounded-2xl shadow-lg overflow-hidden z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-4">
          <h2 className="text-2xl font-bold text-[#e5e7eb] text-center md:text-left flex-1">
            All Assigned Tasks
          </h2>
          <button
            onClick={displayForm}
            className="px-4 py-2 rounded-xl bg-[#a7ee43] hover:bg-[#a7ee43d7] text-black font-semibold shadow transition whitespace-nowrap"
          >
            + New Task
          </button>
        </div>

        {/* Table */}
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
                  <th className="px-4 py-2 text-left font-semibold">Deadline</th>
                  <th className="px-4 py-2 text-left font-semibold">Assigned To</th>
                  <th className="px-4 py-2 text-left font-semibold">Status</th>
                  <th className="px-4 py-2 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-6 text-gray-500">
                      No tasks found
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
                      <td className="px-4 py-2 align-top">
                        {task.assignedTo.length === 1
                          ? task.assignedTo[0].employeeId
                          : `${task.assignedTo[0].employeeId} & ${
                              task.assignedTo.length - 1
                            } others`}
                      </td>
                      <td className="px-4 py-2 align-top">
                        <span
                          className={
                            "inline-block px-3 py-1 rounded-full font-semibold text-xs w-23 text-center " +
                            (task.status === "completed"
                              ? "bg-teal-400/80 text-gray-900"
                              : task.status === "ongoing"
                              ? "bg-amber-400/80 text-gray-900"
                              : "bg-gray-700 text-gray-300")
                          }
                        >
                          {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-2 align-top flex gap-2">
                        {task.status === "completed" ? null : (
                          <button
                            onClick={() => handleEdit(task)}
                            className="w-18 px-1 py-1 rounded-xl bg-[#60a5fa] hover:bg-[#3b82f6] text-gray-700 font-semibold shadow transition"
                          >
                            Edit
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(task._id)}
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
            onClick={displayForm}
            className="absolute top-4 right-4 text-gray-300 hover:text-red-400 text-2xl font-bold rounded-full focus:outline-none focus:ring-2 focus:ring-red-400 transition"
            aria-label="Close"
          >
            ×
          </button>
          <h2 className="text-3xl font-bold mb-8 text-[#e5e7eb] text-center tracking-tight">
            {editingId ? "Edit Task" : "Assign New Task"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Department */}
            <div>
              <label className="block text-gray-400 font-semibold mb-2 text-sm">
                Department
              </label>
              <select
                value={selectedDept}
                onChange={handleDeptChange}
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
            {/* Employees */}
            <div>
              <label className="block text-gray-400 font-semibold mb-2 text-sm">
                Employees
              </label>
              <select
                multiple
                name="assignedTo"
                value={form.assignedTo}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-[#161e27] text-gray-200 border border-[#232d39] h-32 focus:ring-2 focus:ring-[#a7ee43] transition"
                required
              >
                {employees.map((emp) => (
                  <option key={emp._id} value={emp._id.toString()}>
                    {emp.employeeId}
                  </option>
                ))}
              </select>
            </div>
            {/* Task Name */}
            <div>
              <label className="block text-gray-400 font-semibold mb-2 text-sm">
                Task Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-[#161e27] text-gray-200 border border-[#232d39] focus:ring-2 focus:ring-[#a7ee43] transition"
                placeholder="Enter task name"
                required
              />
            </div>
            {/* Deadline */}
            <div>
              <label className="block text-gray-400 font-semibold mb-2 text-sm">
                Deadline
              </label>
              <input
                type="date"
                name="deadline"
                value={form.deadline}
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
                placeholder="Task description"
                required
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-8 py-3 bg-[#a7ee43] hover:bg-[#a7ee43d7] text-black font-semibold rounded-xl shadow-lg text-lg transition"
            >
              {editingId ? "Update Task" : "Assign Task"}
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default AdminTasksList;
