import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddDepartment = () => {
  const [department, setDepartment] = useState({
    dep_name: "",
    description: "",
  });
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
        alert(error.response.data.error);
      }
    }
  };

  return (
    <div>
      <div>
        <h3>Add Department</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="dep_name">Department Name</label>
            <input
              id="dep_name"
              name="dep_name"
              type="text"
              placeholder="Enter department name"
              onChange={handleChange}
              value={department.dep_name}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              type="text"
              placeholder="Description"
              onChange={handleChange}
              value={department.description}
            />
          </div>
          <button className="bg-gray-600">Add Department</button>
        </form>
      </div>
    </div>
  );
};

export default AddDepartment;
