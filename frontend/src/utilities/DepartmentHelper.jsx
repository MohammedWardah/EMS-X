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
        className="px-4 py-1.5 rounded-full bg-slate-500 hover:bg-slate-600 text-gray-300 font-semibold shadow transition text-sm"
        onClick={() => {
          navigate(`/admin-dashboard/departments/${_id}`);
        }}
      >
        Edit
      </button>
      <button
        className="px-4 py-1.5 rounded-full bg-rose-500 hover:bg-rose-600 text-gray-300 font-semibold shadow transition text-sm"
        onClick={() => {
          handleDelete(_id);
        }}
      >
        Delete
      </button>
    </div>
  );
};
