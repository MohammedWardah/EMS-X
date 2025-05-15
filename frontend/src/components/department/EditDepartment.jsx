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
        <div>Loading...</div>
      ) : (
        <div>
          <div>
            <h3>Edit Department</h3>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="dep_name">New Name</label>
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
                <label htmlFor="description">New Description</label>
                <textarea
                  id="description"
                  name="description"
                  type="text"
                  placeholder="Description"
                  onChange={handleChange}
                  value={department.description}
                />
              </div>
              <button className="bg-gray-600">Apply Edit</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditDepartment;
