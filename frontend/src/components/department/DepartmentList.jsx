import React from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../utilities/DepartmentHelper";
import axios from "axios";

const DepartmentList = () => {
  const [departments, setDepartments] = React.useState([]);
  const [depLoading, setDepLoading] = React.useState(false);
  const [filteredDepartments, setFilteredDepartments] = React.useState([]);

  const onDepartmentDelete = (_id) => {
    const data = departments.filter((dep) => dep._id !== _id);
    setDepartments(data);
  };

  React.useEffect(() => {
    const fetchDepartments = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/department", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.success) {
          let sno = 1;
          const data = await response.data.departments.map((dep) => ({
            _id: dep._id,
            sno: sno++,
            dep_name: dep.dep_name,
            description: dep.description,
            action: (
              <DepartmentButtons _id={dep._id} onDepartmentDelete={onDepartmentDelete} />
            ),
          }));
          setDepartments(data);
          setFilteredDepartments(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setDepLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const filterDepartments = (e) => {
    const records = departments.filter((dep) =>
      dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredDepartments(records);
  };

  return (
    <>
      {depLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Departments</h3>
          </div>
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Search"
              className="px-4 py-0.5"
              onChange={filterDepartments}
            />
            <Link to="/admin-dashboard/add-department" className="px-4 py-1 bg-gray-600">
              Add New Department
            </Link>
          </div>
          <div>
            <DataTable columns={columns} data={filteredDepartments} pagination />
          </div>
          {/* Uncomment the following section if you want to display the department list in a different format */}
          {/* <div className="bg-gray-600">
            <h3 className="text-2xl font-bold">Department List</h3>
            <div>
              {departments.map((dep) => (
                <div key={dep._id} className="flex justify-between items-center">
                  <div>{dep.sno}</div>
                  <div>{dep.dep_name}</div>
                  <div>{dep.description}</div>
                  <DepartmentButtons />
                </div>
              ))}
            </div>
          </div> */}
        </div>
      )}
    </>
  );
};

export default DepartmentList;
