import React from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../utilities/DepartmentHelper";
import axios from "axios";

const customStyles = {
  rows: {
    style: {
      backgroundColor: "#171c23",
      color: "#e5e7eb",
      minHeight: "56px",
      borderBottom: "1px solid #232936",
    },
  },
  headCells: {
    style: {
      backgroundColor: "#232936",
      color: "#E5E7EB", // Tailwind blue-400
      fontWeight: "bold",
      fontSize: "1.05rem",
      letterSpacing: "0.03em",
      borderRadius: "1px",
    },
  },
  table: {
    style: {
      backgroundColor: "#171c23",
      borderRadius: "1rem",
    },
  },
  pagination: {
    style: {
      backgroundColor: "#171c23",
      color: "#E5E7EB",
      borderTop: "1px solid #232936",
    },
  },
};

const DepartmentList = () => {
  const [departments, setDepartments] = React.useState([]);
  const [depLoading, setDepLoading] = React.useState(false);
  const [filteredDepartments, setFilteredDepartments] = React.useState([]);

  const onDepartmentDelete = () => {
    fetchDepartments();
  };

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

  React.useEffect(() => {
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
        <div className="flex items-center justify-center min-h-[200px]">
          <span className="text-lg text-gray-400">Loading...</span>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto mt-10 bg-[#171c23] rounded-2xl shadow-2xl p-8 self-start">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-3">
            <h3 className="text-3xl font-bold text-[#e5e7eb] text-center sm:text-left">
              Manage Departments
            </h3>
            <div className="flex gap-2 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search departments..."
                className="bg-[#232936] text-[#e5e7eb] placeholder-gray-400 rounded-xl px-4 py-2 w-full sm:w-56 border border-[#232936] focus:border-blue-500 transition-all duration-200 outline-none shadow-sm"
                onChange={filterDepartments}
              />
              <Link
                to="/admin-dashboard/add-department"
                className="bg-[#a7ee43] hover:bg-[#a7ee43d7] text-black font-semibold px-5 py-2 rounded-xl shadow-md transition-all duration-150"
              >
                Add New Department
              </Link>
            </div>
          </div>
          <div className="overflow-x-auto">
            <DataTable
              columns={columns}
              data={filteredDepartments}
              pagination
              customStyles={customStyles}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default DepartmentList;
