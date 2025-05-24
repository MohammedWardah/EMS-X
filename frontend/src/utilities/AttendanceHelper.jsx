import axios from "axios";

// export const columns = [
//   {
//     name: "No",
//     selector: (row) => row.sno,
//     width: "100px",
//   },
//   {
//     name: "Emp ID",
//     selector: (row) => row.employeeId,
//     sortable: true,
//     width: "150px",
//   },
//   {
//     name: "Name",
//     selector: (row) => row.name,
//     sortable: true,
//     width: "200px",
//   },
//   {
//     name: "Department",
//     selector: (row) => row.department,
//     width: "200px",
//   },
//   {
//     name: "Position",
//     selector: (row) => row.designation,
//     sortable: true,
//     width: "200px",
//   },
//   {
//     name: "Action",
//     selector: (row) => row.action,
//   },
// ];

export const AttendanceHelper = ({ status, employeeId, statusChange }) => {
  const markEmployee = async (status, employeeId) => {
    const response = await axios.put(
      `http://localhost:5000/api/attendance/update/${employeeId}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.data.success) {
      statusChange();
    }
  };

  return (
    <div>
      {status == null ? (
        <div className="flex gap-2">
          <button
            className="w-18 px-2 py-1.5 rounded-full bg-green-500 text-gray-700 font-bold hover:bg-green-600 transition"
            onClick={() => markEmployee("present", employeeId)}
          >
            Present
          </button>
          <button
            className="w-18 px-2 py-1.5 rounded-full bg-red-500 text-gray-700 font-bold hover:bg-red-600 transition"
            onClick={() => markEmployee("absent", employeeId)}
          >
            Absent
          </button>
          <button
            className="w-18 px-2 py-1.5 rounded-full bg-yellow-500 text-gray-700 font-bold hover:bg-yellow-600 transition"
            onClick={() => markEmployee("sick", employeeId)}
          >
            Sick
          </button>
          <button
            className="w-18 px-2 py-1.5 rounded-full bg-blue-500 text-gray-700 font-bold hover:bg-blue-600 transition"
            onClick={() => markEmployee("leave", employeeId)}
          >
            Leave
          </button>
        </div>
      ) : (
        <span
          className={
            "inline-block px-4 py-2 rounded-full text-xs font-semibold w-24 text-center " +
            (status === "present"
              ? "bg-green-800 text-green-300"
              : status === "absent"
              ? "bg-red-800 text-red-300"
              : status === "sick leave"
              ? "bg-yellow-800 text-yellow-200"
              : status === "leave"
              ? "bg-blue-800 text-blue-300"
              : "bg-gray-700 text-gray-300")
          }
        >
          {status}
        </span>
      )}
    </div>
  );
};
