import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/authContext";

const ViewSalary = () => {
  const [salaries, setSalaries] = useState(null);
  const [filteredSalaries, setFilteredSalaries] = useState(null);
  const { id } = useParams();
  let sno = 1;
  const { user } = useAuth();

  const fetchSalaries = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/salary/${id}/${user.role}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        setSalaries(response.data.salary);
        setFilteredSalaries(response.data.salary);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

  const filterSalaries = (e) => {
    const q = e.target.value;
    const filteredRecords = salaries.filter((leave) =>
      leave.employeeId.employeeId.toLocaleLowerCase().includes(q.toLocaleLowerCase())
    );
    setFilteredSalaries(filteredRecords);
  };

  return (
    <div className=" max-w-2/3 mx-auto bg-white/4 backdrop-blur-md rounded-2xl shadow-lg p-8 mt-4 overflow-x-auto">
      {/* Title */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Salary Pay History
        </h2>
      </div>
      {/* Table */}
      <div className="overflow-auto rounded-lg shadow border border-[#232d39] overflow-x-hidden">
        <table className="min-w-full divide-y divide-[#232d39] bg-[#161e27] text-sm">
          <thead>
            <tr>
              <th className="px-4 py-3 font-semibold text-left text-sky-200 uppercase tracking-wider">
                #
              </th>
              <th className="px-4 py-3 font-semibold text-left text-sky-200 uppercase tracking-wider">
                Emp ID
              </th>
              <th className="px-4 py-3 font-semibold text-left text-sky-200 uppercase tracking-wider">
                Salary
              </th>
              <th className="px-4 py-3 font-semibold text-left text-sky-200 uppercase tracking-wider">
                Allowance
              </th>
              <th className="px-4 py-3 font-semibold text-left text-sky-200 uppercase tracking-wider">
                Deduction
              </th>
              <th className="px-4 py-3 font-semibold text-left text-sky-200 uppercase tracking-wider">
                Total
              </th>
              <th className="px-4 py-3 font-semibold text-left text-sky-200 uppercase tracking-wider">
                Pay Date
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredSalaries === null ? (
              <tr>
                <td colSpan={7}>
                  <div className="flex items-center justify-center h-40">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#a7ee43]" />
                  </div>
                </td>
              </tr>
            ) : filteredSalaries.length > 0 ? (
              filteredSalaries.map((salary, idx) => (
                <tr
                  key={salary.id}
                  className={
                    idx % 2 === 0
                      ? "bg-[#1e293b] hover:bg-[#222e3c]"
                      : "bg-[#161e27] hover:bg-[#1b2430]"
                  }
                >
                  <td className="px-4 py-3 text-gray-100">{idx + 1}</td>
                  <td className="px-4 py-3 text-gray-100">
                    {salary.employeeId.employeeId}
                  </td>
                  <td className="px-4 py-3 text-gray-100">{salary.basicSalary}</td>
                  <td className="px-4 py-3 text-gray-100">{salary.allowances}</td>
                  <td className="px-4 py-3 text-gray-100">{salary.deductions}</td>
                  <td className="px-4 py-3 text-gray-100">{salary.netSalary}</td>
                  <td className="px-4 py-3 text-gray-100">
                    {new Date(salary.payDate).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-10 text-gray-500">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewSalary;
