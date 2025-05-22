import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditDepartment = () => {
  const { id } = useParams();
  const [department, setDepartment] = React.useState([]);
  const [depLoading, setDepLoading] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchDepartments = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/department/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.success) {
          setDepartment(response.data.department);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setDepLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/department/${id}`,
        department,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/departments");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <>
      {depLoading ? (
        <div className="flex items-center justify-center h-80">
          <span className="text-lg text-gray-400">Loading...</span>
        </div>
      ) : (
        <div
          className="max-h-2/3 flex mt-10 justify-center p-6 flex-col items-center
"
        >
          <h3 className="text-2xl font-bold  mb-8 text-center tracking-wide drop-shadow">
            Edit Department
          </h3>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center w-full max-w-md bg-white/5 backdrop-blur-lg border border-gray-800 rounded-2xl shadow-2xl px-8 py-10 gap-5"
          >
            <div>
              <label
                htmlFor="dep_name"
                className="block text-[#e5e7eb] font-semibold mb-2"
              >
                New Name
              </label>
              <input
                id="dep_name"
                name="dep_name"
                type="text"
                placeholder="Enter department name"
                onChange={handleChange}
                value={department.dep_name}
                className="w-full rounded-xl px-4 py-3 bg-[#232936] text-[#e5e7eb] border border-[#232936] placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all duration-200 shadow-sm"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-[#e5e7eb] font-semibold mb-2"
              >
                New Description
              </label>
              <textarea
                id="description"
                name="description"
                type="text"
                placeholder="Description"
                onChange={handleChange}
                value={department.description}
                className="w-full rounded-xl px-4 py-3 bg-[#232936] text-[#e5e7eb] border border-[#232936] placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all duration-200 shadow-sm resize-none min-h-[120px]"
              />
            </div>
            <button className="w-full mt-4 bg-[#A7EE43] hover:bg-[#a7ee43d7] text-black font-semibold px-4 py-3 rounded-xl shadow-md transition-all duration-150">
              Apply Edit
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default EditDepartment;
