import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDepartments } from "../../utilities/EmployeeHelper";

const EditEmployee = () => {
  const [employee, setEmployee] = React.useState({
    name: "",
    email: "",
    phone: "",
    maritalStatus: "",
    designation: "",
    department: "",
    salary: 0,
  });
  const [departments, setDepartments] = React.useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  React.useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);

  React.useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.success) {
          const employee = response.data.employee;
          setEmployee((prev) => ({
            ...prev,
            name: employee.userId.name,
            maritalStatus: employee.maritalStatus,
            designation: employee.designation,
            salary: employee.salary,
            department: employee.department,
            email: employee.userId.email,
            phone: employee.phone,
          }));
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };
    fetchEmployee();
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
      setEmployee((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const formDataObj = new FormData();
    // Object.keys(formData).forEach((key) => {
    //   formDataObj.append(key, formData[key]);
    // });

    try {
      const response = await axios.put(
        `http://localhost:5000/api/employee/${id}`,
        employee,
        // formDataObj,
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
    <>
      {employee && departments ? (
        <div className="max-w-3xl mx-auto mt-10 bg-[#10161c] mt-4 p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-white mb-8 text-center tracking-tight">
            Edit Employee
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-100 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={employee.name}
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
                  className="block text-sm font-semibold text-gray-100 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Example@domain.com"
                  required
                  value={employee.email}
                  onChange={handleChange}
                  className="w-full rounded-full px-4 py-2 bg-[#161e27] text-gray-100 border border-[#232d39] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
                />
              </div>
              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-gray-100 mb-2"
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
                  value={employee.phone}
                  className="w-full rounded-full px-4 py-2 bg-[#161e27] text-gray-100 border border-[#232d39] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
                />
              </div>
              {/* Marital Status */}
              <div>
                <label
                  htmlFor="maritalStatus"
                  className="block text-sm font-semibold text-gray-100 mb-2"
                >
                  Marital Status
                </label>
                <select
                  name="maritalStatus"
                  id="maritalStatus"
                  required
                  onChange={handleChange}
                  value={employee.maritalStatus}
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
                  className="block text-sm font-semibold text-gray-100 mb-2"
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
                  value={employee.designation}
                  className="w-full rounded-full px-4 py-2 bg-[#161e27] text-gray-100 border border-[#232d39] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
                />
              </div>
              {/* Salary */}
              <div>
                <label
                  htmlFor="salary"
                  className="block text-sm font-semibold text-gray-100 mb-2"
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
                  value={employee.salary}
                  className="w-full rounded-full px-4 py-2 bg-[#161e27] text-gray-100 border border-[#232d39] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
                />
              </div>
              {/* Department */}
              <div className="md:col-span-2">
                <label
                  htmlFor="department"
                  className="block text-sm font-semibold text-gray-100 mb-2"
                >
                  Department
                </label>
                <select
                  name="department"
                  id="department"
                  required
                  className="w-full rounded-full px-4 py-2 bg-[#161e27] text-gray-100 border border-[#232d39] focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
                  onChange={handleChange}
                  value={employee.department.dep_name}
                >
                  {departments.map((dep) => (
                    <option key={dep._id} value={dep._id}>
                      {dep.dep_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="mt-8 w-1/3 bg-[#a7ee43] hover:bg-[#a7ee43d7] text-black font-bold py-3 rounded-full shadow transition text-lg"
              >
                Apply Edit
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex items-center justify-center h-3/4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#a7ee43]" />
        </div>
      )}
    </>
  );
};

export default EditEmployee;
