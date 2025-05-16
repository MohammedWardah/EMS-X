import axios from "axios";
import { useNavigate } from "react-router-dom";

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

export const EmployeeButtons = ({ id }) => {
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
        className="px-4 py-1 bg-green-600 text-white"
        onClick={() => {
          navigate(`/admin-dashboard/employees/${id}`);
        }}
      >
        View
      </button>
      <button className="px-4 py-1 bg-red-600 text-white">Leave</button>
      <button className="px-4 py-1 bg-yellow-600 text-white">Salary</button>
      <button
        className="px-4 py-1 bg-blue-600 text-white"
        onClick={() => {
          navigate(`/admin-dashboard/employees/edit/${id}`);
        }}
      >
        Edit
      </button>
    </div>
  );
};
