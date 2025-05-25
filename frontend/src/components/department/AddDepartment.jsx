import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddDepartment = () => {
  const [department, setDepartment] = useState({
    dep_name: "",
    description: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/department/add",
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
        setError(error.response.data.error);
      } else {
        setError("Something went wrong.");
      }
    }
  };

  return (
    <div className="max-h-3/4 flex mt-10 justify-center p-6">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-lg border border-gray-800 rounded-2xl shadow-2xl px-8 py-10">
        <h3 className="text-2xl font-bold  mb-8 text-center tracking-wide drop-shadow">
          Add Department
        </h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="dep_name" className="block text-gray-200 font-semibold mb-2">
              Department Name
            </label>
            <input
              id="dep_name"
              name="dep_name"
              type="text"
              placeholder="Enter department name"
              autoComplete="off"
              onChange={handleChange}
              value={department.dep_name}
              className="w-full px-4 py-3 rounded-xl bg-[#141d2b]/90 text-gray-100 placeholder-gray-400 border border-gray-600 focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all duration-200 shadow-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-gray-200 font-semibold mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Department description"
              onChange={handleChange}
              value={department.description}
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-[#141d2b]/90 text-gray-100 placeholder-gray-400 border border-gray-600 focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all duration-200 shadow-sm resize-none"
              required
            />
          </div>
          {error && (
            <div className="text-center text-sm text-red-400 font-medium">{error}</div>
          )}
          <div className="flex justify-center">
            {" "}
            <button
              type="submit"
              className="bg-[#a7ee43] hover:bg-[#a7ee43d7] w-1/2 py-3 rounded-xl text-black font-semibold text-lg tracking-wide shadow-lg transition-all duration-200"
            >
              Add Department
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDepartment;
