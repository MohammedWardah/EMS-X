import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export const columns = [
  {
    name: "No",
    selector: (row) => row.sno,
    width: "80px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "200px",
  },
  {
    name: "Photo",
    selector: (row) => row.profileImage,
    width: "120px",
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    width: "150px",
  },
  {
    name: "Title",
    selector: (row) => row.designation,
    sortable: true,
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];

export const fetchDepartments = async () => {
  let departments;
  try {
    const response = await axios.get("http://localhost:5000/api/department", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.data.success) {
      departments = response.data.departments;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return departments;
};

export const getEmployees = async (id) => {
  let employees;
  try {
    const response = await axios.get(
      `http://localhost:5000/api/employee/department/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.data.success) {
      employees = response.data.employees;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return employees;
};

export const EmployeeButtons = ({ id }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // const handleDelete = async (_id) => {
  //   const confirmDelete = window.confirm(
  //     "Are you sure you want to delete this department?"
  //   );
  //   if (!confirmDelete) return;
  //   try {
  //     const response = await axios.delete(`http://localhost:5000/api/department/${_id}`, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     });
  //     if (response.data.success) {
  //       onDepartmentDelete(_id);
  //       // Temp fix of (no records to display) by refreshing the page
  //       window.location.reload();
  //     }
  //   } catch (error) {
  //     if (error.response && !error.response.data.success) {
  //       alert(error.response.data.error);
  //     }
  //   }
  // };

  return (
    <div className="flex space-x-3">
      <button
        className="w-18 px-2 py-1.5 rounded-full bg-sky-400/80 hover:bg-sky-400 text-gray-900 font-semibold shadow transition text-sm"
        onClick={() => {
          navigate(`/admin-dashboard/employees/${id}`);
        }}
      >
        View
      </button>
      <button
        className="w-18 px-2 py-1.5 rounded-full bg-yellow-300/80 hover:bg-yellow-300 text-gray-900 font-semibold shadow transition text-sm"
        onClick={() => navigate(`/admin-dashboard/employees/leave-requests/${id}`)}
      >
        Leave
      </button>
      <button
        className="w-18 px-2 py-1.5 rounded-full bg-green-500/80 hover:bg-green-500 text-gray-900 font-semibold shadow transition text-sm"
        onClick={() => navigate(`/admin-dashboard/employees/salary/${id}`)}
      >
        Salary
      </button>
      <button
        className="w-18 px-2 py-1.5 rounded-full bg-orange-500/80 hover:bg-orange-500 text-gray-900 font-semibold shadow transition text-sm"
        onClick={() => {
          navigate(`/admin-dashboard/employees/edit/${id}`);
        }}
      >
        Edit
      </button>
    </div>
  );
};
