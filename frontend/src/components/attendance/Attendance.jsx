import React from "react";
import { Link } from "react-router-dom";
import { columns, AttendanceHelper } from "../../utilities/AttendanceHelper";
import DataTable from "react-data-table-component";
import axios from "axios";

const Attendance = () => {
  const [attendance, setAttendance] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [filteredAttendance, setFilteredAttendance] = React.useState(null);

  const statusChange = () => {
    fetchAttendance();
  };

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/attendance", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        let sno = 1;
        const data = await response.data.attendance.map((att) => ({
          employeeId: att.employeeId.employeeId,
          designation: att.employeeId.designation,
          sno: sno++,
          department: att.employeeId.department.dep_name,
          name: att.employeeId.userId.name,
          action: (
            <AttendanceHelper
              status={att.status}
              employeeId={att.employeeId.employeeId}
              statusChange={statusChange}
            />
          ),
        }));
        setAttendance(data);
        setFilteredAttendance(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchAttendance();
  }, []);

  const handleFilter = (e) => {
    const records = attendance.filter((emp) =>
      emp.employeeId.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredAttendance(records);
  };

  if (!filteredAttendance) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {loading ? (
        <div>loading...</div>
      ) : (
        <div className="p-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Attendance</h3>
          </div>
          <div className="flex justify-between items-center">
            <p className="">
              Mark Employees for:{" "}
              <span className="underline text-bold">
                {new Date().toISOString().split("T")[0]}
              </span>
            </p>
            <Link
              to="/admin-dashboard/attendance-report"
              className="px-4 py-1 bg-gray-600"
            >
              Attendance Report
            </Link>
          </div>
          <input
            type="text"
            placeholder="Search by ID"
            className="px-4 py-0.5"
            onChange={handleFilter}
          />
          <div className="mt-6">
            <DataTable columns={columns} data={filteredAttendance} pagination striped />
          </div>
        </div>
      )}
    </>
  );
};

export default Attendance;
