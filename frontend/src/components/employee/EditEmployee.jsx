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
        <div className="max-w-4xl mx-auto mt-10 bg-gray-900 p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-6">Edit Employee</h2>
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
                  value={employee.name}
                  placeholder="Name & Surname"
                  required
                  onChange={handleChange}
                />
              </div>
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
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
                />
              </div>
              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
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
                />
              </div>
              {/* Marital Status */}
              <div>
                <label
                  htmlFor="maritalStatus"
                  className="block text-sm font-medium text-gray-700"
                >
                  Marital Status
                </label>
                <select
                  name="maritalStatus"
                  id="maritalStatus"
                  required
                  onChange={handleChange}
                  value={employee.maritalStatus}
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
                  value={employee.designation}
                />
              </div>
              {/* Salary */}
              <div>
                <label
                  htmlFor="salary"
                  className="block text-sm font-medium text-gray-700"
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
                />
              </div>
              {/* Department */}
              <div className="col-span-2">
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
                  value={employee.department}
                >
                  <option value="">Select Department</option>
                  {departments.map((dep) => (
                    <option key={dep._id} value={dep._id}>
                      {dep.dep_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Password */}
              {/* <div>
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
          </div> */}
              {/* Image */}
              {/* <div>
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
          </div> */}
            </div>
            <button
              type="submit"
              className="mt-6 bg-gray-600 text-white px-4 py-2 rounded-md"
            >
              Apply Edit
            </button>
          </form>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default EditEmployee;
