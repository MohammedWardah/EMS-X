import { useAuth } from "../../context/authContext";
import AdminTasksList from "./AdminTasksList";
import EmployeeTasksList from "./EmployeeTasksList";

const TasksList = () => {
  const { user } = useAuth(); // user.role === "admin" or "employee"

  if (user.role === "admin") {
    return <AdminTasksList />;
  }

  // for employees we pass their own employee _id from the auth context
  return <EmployeeTasksList employeeId={user._id} />;
};

export default TasksList;
