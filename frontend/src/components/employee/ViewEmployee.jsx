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
        <div>
          <div>
            <img src={`http://localhost:5000/${employee.userId.profileImage}`} alt="" />
          </div>
          <h2 className="text-2xl font-bold">Employee Details</h2>
          <div className="grid grid-cols-2 gap-6">
            <h3>
              <span>Name: </span>
              {employee.userId.name}
            </h3>
            <p>
              <span>Email: </span>
              {employee.userId.email}
            </p>
            <p>
              <span>Employee ID: </span>
              {employee.employeeId}
            </p>
            <p>
              <span>Position: </span>
              {employee.designation}
            </p>
            <p>
              <span>Phone: </span>
              {employee.phone}
            </p>
            <p>
              <span>Date of Birth: </span>
              {new Date(employee.dob).toLocaleDateString()}
            </p>
            <p>
              <span>Gender: </span>
              {employee.gender}
            </p>
            <p>
              <span>Marital Status: </span>
              {employee.maritalStatus}
            </p>
            <p>
              <span>Salary: </span>
              {"$" + employee.salary}
            </p>
            <p>
              <span>Department: </span>
              {employee.department.dep_name}
            </p>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}{" "}
    </>
  );
};

export default ViewEmployee;
