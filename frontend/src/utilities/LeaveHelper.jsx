import { useNavigate } from "react-router-dom";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "125px",
  },
  {
    name: "Emp ID",
    selector: (row) => row.employeeId,
    width: "125px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    width: "125px",
  },
  {
    name: "Leave Type",
    selector: (row) => row.leaveType,
    width: "125px",
  },
  {
    name: "Department",
    selector: (row) => row.department,
    width: "125px",
  },
  {
    name: "Days",
    selector: (row) => row.days,
    width: "125px",
  },
  {
    name: "Status",
    selector: (row) => row.status,
    width: "150px",
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];

export const LeaveButtons = ({ Id }) => {
  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/admin-dashboard/leave-requests/${id}`);
  };

  return (
    <button
      className="px-4 py-1 bg-gray-400 rounded text-black font-semibold hover:bg-gray-500"
      onClick={() => handleView(Id)}
    >
      View
    </button>
  );
};
