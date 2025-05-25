import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fetchDepartments, getEmployees } from "../../utilities/EmployeeHelper";

const AddSalary = () => {
  const [salary, setSalary] = React.useState({
    employeeId: null,
    basicSalary: 0,
    allowances: 0,
    deductions: 0,
    payDate: null,
  });
  const [departments, setDepartments] = React.useState(null);
  const [employees, setEmployees] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);

  const handleDepartment = async (e) => {
    const emps = await getEmployees(e.target.value);
    setEmployees(emps);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalary((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:5000/api/salary/add/`, salary, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
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
      {departments ? (
        <div className="bg-white/3 backdrop-blur-md rounded-xl mt-12 p-4 shadow w-1/2 mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8 text-center tracking-tight">
            Salary Pay
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
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
                  onChange={handleDepartment}
                >
                  <option value="">Select Department</option>
                  {departments.map((dep) => (
                    <option key={dep._id} value={dep._id}>
                      {dep.dep_name}
                    </option>
                  ))}
                </select>
              </div>
              {/* Department Employees */}
              <div>
                <label
                  htmlFor="employeeId"
                  className="block text-sm font-semibold text-gray-100 mb-1"
                >
                  Employees
                </label>
                <select
                  name="employeeId"
                  id="employeeId"
                  required
                  className="w-full rounded-full px-4 py-2 bg-[#161e27] text-gray-100 border border-[#232d39] focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
                  onChange={handleChange}
                >
                  <option value="">Select Employee</option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.employeeId}
                    </option>
                  ))}
                </select>
              </div>
              {/* Salary */}
              <div>
                <label
                  htmlFor="basicSalary"
                  className="block text-sm font-semibold text-gray-100 mb-1"
                >
                  Salary
                </label>
                <input
                  type="number"
                  name="basicSalary"
                  id="basicSalary"
                  placeholder="Salary in $"
                  required
                  onChange={handleChange}
                  className="no-spinner w-full rounded-full px-4 py-2 bg-[#161e27] text-gray-100 border border-[#232d39] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
                />
              </div>
              {/* Allowances */}
              <div>
                <label
                  htmlFor="allowances"
                  className="block text-sm font-semibold text-gray-100 mb-1"
                >
                  Allowances
                </label>
                <input
                  type="number"
                  name="allowances"
                  id="allowances"
                  placeholder="Allowances"
                  required
                  onChange={handleChange}
                  className="no-spinner w-full rounded-full px-4 py-2 bg-[#161e27] text-gray-100 border border-[#232d39] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
                />
              </div>
              {/* Deductions */}
              <div>
                <label
                  htmlFor="deductions"
                  className="block text-sm font-semibold text-gray-100 mb-1"
                >
                  Deductions
                </label>
                <input
                  type="number"
                  name="deductions"
                  id="deductions"
                  placeholder="Deductions"
                  required
                  onChange={handleChange}
                  className="no-spinner w-full rounded-full px-4 py-2 bg-[#161e27] text-gray-100 border border-[#232d39] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
                />
              </div>
              {/* Pay Date */}
              <div>
                <label
                  htmlFor="payDate"
                  className="block text-sm font-semibold text-gray-100 mb-1"
                >
                  Pay Date
                </label>
                <input
                  type="date"
                  name="payDate"
                  id="payDate"
                  required
                  onChange={handleChange}
                  className="w-full rounded-full px-4 py-2 bg-[#161e27] text-gray-100 border border-[#232d39] focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
                />
              </div>
            </div>
            <div className="flex justify-center  mt-10">
              <button
                type="submit"
                className="w-1/4 bg-[#a7ee43] hover:bg-[#a7ee43d7] text-black font-bold py-3 rounded-full shadow transition text-m"
              >
                Confirm Pay
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[350px] w-full">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#a7ee43]" />
          <span className="text-gray-400 ml-4 text-xl">Loading...</span>
        </div>
      )}
    </>
  );
};

export default AddSalary;
