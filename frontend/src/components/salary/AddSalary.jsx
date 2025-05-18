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
        <div className="max-w-4xl mx-auto mt-10 bg-gray-900 p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-6">Salary Pay</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              {/* Department Employees*/}
              <div>
                <label
                  htmlFor="employeeId"
                  className="block text-sm font-medium text-gray-700"
                >
                  Employees
                </label>
                <select
                  name="employeeId"
                  id="employeeId"
                  required
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
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
                  className="block text-sm font-medium text-gray-700"
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
                />
              </div>
              {/* Allowances */}
              <div>
                <label
                  htmlFor="allowances"
                  className="block text-sm font-medium text-gray-700"
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
                />
              </div>
              {/* Deductions */}
              <div>
                <label
                  htmlFor="deductions"
                  className="block text-sm font-medium text-gray-700"
                >
                  Deductions
                </label>
                <input
                  type="number"
                  name="deductions"
                  id="deductions"
                  placeholder="Allowances"
                  required
                  onChange={handleChange}
                />
              </div>
              {/* Pay Date */}
              <div>
                <label
                  htmlFor="payDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Pay Date
                </label>
                <input
                  type="date"
                  name="payDate"
                  id="payDate"
                  placeholder="Allowances"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-6 bg-gray-600 text-white px-4 py-2 rounded-md"
            >
              Confirm Pay
            </button>
          </form>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default AddSalary;
