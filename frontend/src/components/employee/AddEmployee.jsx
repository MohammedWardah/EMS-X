import React from "react";
import { fetchDepartments } from "../../utilities/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [departments, setDepartments] = React.useState([]);
  const [formData, setFormData] = React.useState({});
  const navigate = useNavigate();

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
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-gray-900 p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add New Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name & Surname"
              required
              onChange={handleChange}
            />
          </div>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Example@domain.com"
              required
              onChange={handleChange}
            />
          </div>
          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder="+90 123 456 78 90"
              required
              onChange={handleChange}
            />
          </div>
          {/* Employee ID */}
          <div>
            <label
              htmlFor="employeeId"
              className="block text-sm font-medium text-gray-700"
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
            />
          </div>
          {/* DoB */}
          <div>
            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input type="date" name="dob" id="dob" required onChange={handleChange} />
          </div>
          {/* Gender */}
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              name="gender"
              id="gender"
              required
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          {/* Marital Status */}
          <div>
            <label htmlFor="ms" className="block text-sm font-medium text-gray-700">
              Marital Status
            </label>
            <select
              name="ms"
              id="ms"
              required
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
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
              className="block text-sm font-medium text-gray-700"
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
            />
          </div>
          {/* Department */}
          <div>
            <label
              htmlFor="department"
              className="block text-sm font-medium text-gray-700"
            >
              Department
            </label>
            <select
              name="department"
              id="department"
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
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
            <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
              Salary
            </label>
            <input
              type="number"
              name="salary"
              id="salary"
              placeholder="Salary in $"
              required
              onChange={handleChange}
            />
          </div>
          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              required
              onChange={handleChange}
            />
          </div>
          {/* System Role */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              System Role
            </label>
            <select
              name="role"
              id="role"
              required
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
          </div>
          {/* Image */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Upload Image
            </label>
            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              onChange={handleChange}
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-6 bg-gray-600 text-white px-4 py-2 rounded-md"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
