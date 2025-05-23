import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = React.useState(null);

  React.useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.success) {
          setEmployee(response.data.employee);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };

    fetchEmployee();
  }, []);

  return (
    <>
      {employee ? (
        <div className="flex flex-col md:flex-row max-w-3xl mx-auto bg-white/4 backdrop-blur-md rounded-2xl shadow-lg p-8 gap-8 mt-10">
          {/* Profile & basic */}
          <div className="flex flex-col items-center md:items-start gap-4 min-w-[180px]">
            <img
              src={`http://localhost:5000/${employee.userId.profileImage}`}
              alt={employee.userId.name}
              className="w-32 h-32 rounded-xl object-cover shadow border-4 border-[#232d39] bg-[#161e27] object-center"
            />
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-white">{employee.userId.name}</h2>
              <p className="text-sm text-gray-400">{employee.designation}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-sky-800 text-white rounded-full text-xs">
                {employee.department.dep_name}
              </span>
            </div>
          </div>
          {/* Details */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-200">
            <div>
              <label className="block text-gray-400 text-xs uppercase mb-1">Email</label>
              <div className="font-medium">{employee.userId.email}</div>
            </div>
            <div>
              <label className="block text-gray-400 text-xs uppercase mb-1">
                Employee ID
              </label>
              <div className="font-medium">{employee.employeeId}</div>
            </div>
            <div>
              <label className="block text-gray-400 text-xs uppercase mb-1">Phone</label>
              <div className="font-medium">{employee.phone}</div>
            </div>
            <div>
              <label className="block text-gray-400 text-xs uppercase mb-1">
                Date of Birth
              </label>
              <div className="font-medium">
                {new Date(employee.dob).toLocaleDateString()}
              </div>
            </div>
            <div>
              <label className="block text-gray-400 text-xs uppercase mb-1">Gender</label>
              <div className="font-medium">{employee.gender}</div>
            </div>
            <div>
              <label className="block text-gray-400 text-xs uppercase mb-1">
                Marital Status
              </label>
              <div className="font-medium">{employee.maritalStatus}</div>
            </div>
            <div>
              <label className="block text-gray-400 text-xs uppercase mb-1">Salary</label>
              <div className="font-medium">${employee.salary}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[350px] w-full">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#a7ee43]" />
          <span className="text-gray-400 ml-4 text-xl">Loading...</span>
        </div>
      )}
    </>
  );
};

export default ViewEmployee;
