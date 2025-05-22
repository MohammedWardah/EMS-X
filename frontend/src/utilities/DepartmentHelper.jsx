import { useNavigate } from "react-router-dom";
import axios from "axios";

export const columns = [
  {
    name: "No",
    selector: (row) => row.sno,
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name,
    sortable: true,
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];

export const DepartmentButtons = ({ _id, onDepartmentDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async (_id) => {
    const confirmDelete = window.confirm(
      "Confirm Deletion: *WARNING: DOING SO WILL DELETE ALL EMPLOYEES THAT BELONG TO THIS DEPARTMENT ALONG WITH THEIR RECORDS!"
    );
    if (!confirmDelete) return;
    try {
      const response = await axios.delete(`http://localhost:5000/api/department/${_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        onDepartmentDelete();
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <div className="flex space-x-3">
      <button
        className="px-4 py-1 bg-blue-600 text-white rounded"
        onClick={() => {
          navigate(`/admin-dashboard/departments/${_id}`);
        }}
      >
        Edit
      </button>
      <button
        className="px-4 py-1 bg-red-600 text-white rounded"
        onClick={() => {
          handleDelete(_id);
        }}
      >
        Delete
      </button>
    </div>
  );
};
