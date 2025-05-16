import React from "react";
import { Link } from "react-router-dom";
import { columns, EmployeeButtons } from "../../utilities/EmployeeHelper";
import DataTable from "react-data-table-component";
import axios from "axios";

const EmployeeList = () => {
  const [employees, setEmployees] = React.useState([]);
  const [empLoading, setEmpLoading] = React.useState(false);
  const [filteredEmployees, setFilteredEmployees] = React.useState([]);

  React.useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/employee", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.success) {
          let sno = 1;
          const data = await response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            dep_name: emp.department.dep_name,
            name: emp.userId.name,
            dob: new Date(emp.dob).toDateString(),
            profileImage: (
              <img
                width={45}
                className="rounded-full"
                src={`http://localhost:5000/${emp.userId.profileImage}`}
              />
            ),
            // bonus:
            designation: emp.designation,
            phone: emp.phone,
            action: <EmployeeButtons id={emp._id} />,
          }));
          setEmployees(data);
          setFilteredEmployees(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setEmpLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleFilter = (e) => {
    const records = employees.filter((emp) =>
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredEmployees(records);
  };

  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Employees</h3>
      </div>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search"
          className="px-4 py-0.5"
          onChange={handleFilter}
        />
        <Link to="/admin-dashboard/add-employee" className="px-4 py-1 bg-gray-600">
          Add New Employee
        </Link>
      </div>
      <div className="mt-6">
        <DataTable columns={columns} data={filteredEmployees} pagination striped />
      </div>
    </div>
  );
};

export default EmployeeList;
