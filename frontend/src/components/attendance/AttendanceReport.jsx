import { useEffect, useState } from "react";
import axios from "axios";

const AttendanceReport = () => {
  const todayStr = new Date().toISOString().split("T")[0];
  const [report, setReport] = useState({});
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);
  const [dateFilter, setDateFilter] = useState(todayStr);
  const [loading, setLoading] = useState(false);

  const fetchReport = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams({ limit, skip });
      if (dateFilter) {
        query.append("date", dateFilter);
      }
      const response = await axios.get(
        `http://localhost:5000/api/attendance/report?${query.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        if (skip == 0) {
          setReport(response.data.groupData);
        } else {
          setReport((prevData) => ({
            ...prevData,
            ...response.data.groupData,
          }));
        }
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [skip, dateFilter]);

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: "#080F17" }}>
      <h2 className="text-center text-3xl font-bold text-white tracking-wide mb-8 drop-shadow-md">
        Attendance Report
      </h2>

      {/* Filter by Date */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-200">Filter by Date:</h2>
        <input
          type="date"
          value={dateFilter}
          className="px-4 py-2 rounded-xl bg-[#141d2b] text-gray-100 border border-gray-600 placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all duration-200"
          onChange={(e) => {
            setDateFilter(e.target.value);
            setSkip(0);
          }}
        />
        {dateFilter !== todayStr && (
          <button
            className="ml-2 px-4 py-2 rounded-lg bg-blue-800 text-white hover:bg-blue-700 transition"
            onClick={() => setDateFilter(todayStr)}
          >
            Today
          </button>
        )}
      </div>

      {loading ? (
        <div className="text-center text-gray-400 py-20 text-xl">Loading...</div>
      ) : Object.entries(report).length === 0 ? (
        <div className="text-center text-gray-500 py-20 text-lg">
          No data found for this filter.
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(report).map(([date, records]) => (
            <div
              key={date}
              className="rounded-2xl bg-white/5 backdrop-blur-lg shadow-xl border border-gray-800 p-6"
            >
              <h3 className="text-lg md:text-xl font-semibold mb-4 text-blue-400 tracking-wide">
                {date}
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-[#101726]">
                      <th className="px-4 py-3 font-bold text-gray-300">#</th>
                      <th className="px-4 py-3 font-bold text-gray-300">Employee ID</th>
                      <th className="px-4 py-3 font-bold text-gray-300">Name</th>
                      <th className="px-4 py-3 font-bold text-gray-300">Department</th>
                      <th className="px-4 py-3 font-bold text-gray-300">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((data, i) => (
                      <tr
                        key={data.employeeId}
                        className="hover:bg-[#35151b]/80 transition-colors duration-200"
                      >
                        <td className="px-4 py-2 text-gray-400">{i + 1}</td>
                        <td className="px-4 py-2 text-gray-200">{data.employeeId}</td>
                        <td className="px-4 py-2 text-gray-200">{data.employeeName}</td>
                        <td className="px-4 py-2 text-gray-200">{data.departmentName}</td>
                        <td className="px-4 py-2">
                          <span
                            className={
                              "inline-block px-3 py-1 rounded-full text-xs font-semibold " +
                              (data.status === "present"
                                ? "bg-green-800 text-green-300"
                                : data.status === "absent"
                                ? "bg-red-800 text-red-300"
                                : data.status === "sick"
                                ? "bg-yellow-800 text-yellow-200"
                                : data.status === "leave"
                                ? "bg-blue-800 text-blue-300"
                                : "bg-gray-700 text-gray-300")
                            }
                          >
                            {data.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default AttendanceReport;
