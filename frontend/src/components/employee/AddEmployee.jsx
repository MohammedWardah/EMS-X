import React from "react";
import { fetchDepartments } from "../../utilities/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [departments, setDepartments] = React.useState([]);
  const [formData, setFormData] = React.useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);

  // Handle form submission with image upload
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/employee/add",
        formDataObj,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-0 bg-white/4 backdrop-blur-md p-8 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-white mb-8 text-center tracking-tight">
        Add New Employee
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Two-column layout, more horizontal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          {/* Left column */}
          <div className="space-y-6">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-100 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name & Surname"
                required
                onChange={handleChange}
                className="w-full rounded-full px-4 py-2 bg-[#161e27] text-gray-100 border border-[#232d39] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
              />
            </div>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-100 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Example@domain.com"
                required
                onChange={handleChange}
                className="w-full rounded-full px-4 py-2 bg-[#161e27] text-gray-100 border border-[#232d39] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
              />
            </div>
            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-semibold text-gray-100 mb-1"
              >
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                placeholder="+90 123 456 78 90"
                required
                onChange={handleChange}
                className="w-full rounded-full px-4 py-2 bg-[#161e27] text-gray-100 border border-[#232d39] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
              />
            </div>
            {/* Employee ID */}
            <div>
              <label
                htmlFor="employeeId"
                className="block text-sm font-semibold text-gray-100 mb-1"
              >
                Employee ID
              </label>
              <input
                type="text"
                name="employeeId"
                id="employeeId"
                placeholder="ID"
                required
                onChange={handleChange}
                className="w-full rounded-full px-4 py-2 bg-[#161e27] text-gray-100 border border-[#232d39] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
              />
            </div>
            {/* Date of Birth */}
            <div>
              <label
                htmlFor="dob"
                className="block text-sm font-semibold text-gray-100 mb-1"
              >
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                id="dob"
                required
                onChange={handleChange}
                className="w-full rounded-full px-4 py-2 bg-[#161e27] text-gray-100 border border-[#232d39] focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
              />
            </div>
            {/* Gender */}
            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-semibold text-gray-100 mb-1"
              >
                Gender
              </label>
              <select
                name="gender"
                id="gender"
                required
                onChange={handleChange}
                className="w-full rounded-full px-4 py-2 bg-[#161e27] text-gray-100 border border-[#232d39] focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          {/* Right column */}
          <div className="space-y-6">
            {/* Marital Status */}
            <div>
              <label
                htmlFor="maritalStatus"
                className="block text-sm font-semibold text-gray-100 mb-1"
              >
                Marital Status
              </label>
              <select
                name="maritalStatus"
                id="maritalStatus"
                required
                onChange={handleChange}
                className="w-full rounded-full px-4 py-2 bg-[#161e27] text-gray-100 border border-[#232d39] focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
              >
                <option value="">Select</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
              </select>
            </div>
            {/* Job Title */}
            <div>
              <label
                htmlFor="designation"
                className="block text-sm font-semibold text-gray-100 mb-1"
              >
                Job Title
              </label>
              <input
                type="text"
                name="designation"
                id="designation"
                placeholder="Title / Position"
                required
                onChange={handleChange}
                className="w-full rounded-full px-4 py-2 bg-[#161e27] text-gray-100 border border-[#232d39] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
              />
            </div>
            {/* Department */}
            <div>
              <label
                htmlFor="department"
                className="block text-sm font-semibold text-gray-100 mb-1"
              >
                Department
              </label>
              <select
                name="department"
                id="department"
                required
                className="w-full rounded-full px-4 py-2 bg-[#161e27] text-gray-100 border border-[#232d39] focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
                onChange={handleChange}
              >
                <option value="">Select Department</option>
                {departments.map((dep) => (
                  <option key={dep._id} value={dep._id}>
                    {dep.dep_name}
                  </option>
                ))}
              </select>
            </div>
            {/* Salary */}
            <div>
              <label
                htmlFor="salary"
                className="block text-sm font-semibold text-gray-100 mb-1"
              >
                Salary
              </label>
              <input
                type="number"
                name="salary"
                id="salary"
                placeholder="Salary in $"
                required
                onChange={handleChange}
                className="no-spinner w-full rounded-full px-4 py-2 bg-[#161e27] text-gray-100 border border-[#232d39] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
              />
            </div>
            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-100 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                required
                onChange={handleChange}
                className="w-full rounded-full px-4 py-2 bg-[#161e27] text-gray-100 border border-[#232d39] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
              />
            </div>
            {/* System Role */}
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-semibold text-gray-100 mb-1"
              >
                System Role
              </label>
              <select
                name="role"
                id="role"
                required
                onChange={handleChange}
                className="w-full rounded-full px-4 py-2 bg-[#161e27] text-gray-100 border border-[#232d39] focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
              </select>
            </div>
          </div>
        </div>
        {/* Button row: horizontal on desktop, vertical on mobile */}
        <div className="flex justify-between mt-10 w-full">
          {/* Image */}
          <div className="relative mt-1 min-w-1/2">
            <label
              htmlFor="image"
              className="block text-sm font-semibold text-gray-100 mb-1 absolute -top-6"
            >
              Photo
            </label>
            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              onChange={handleChange}
              className="cursor-pointer absolute -top-0.4 w-98"
            />
          </div>
          <button
            type="submit"
            className="w-full md:w-1/4 bg-[#a7ee43] hover:bg-[#a7ee43d7] text-black font-bold py-3 rounded-full shadow transition text-m"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Employee"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
