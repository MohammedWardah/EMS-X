import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivateRoutes from "./utilities/PrivateRoutes";
import RoleBasedRoutes from "./utilities/RoleBasedRoutes";
import AdminSummary from "./components/dashboard/AdminSummary";
import DepartmentList from "./components/department/DepartmentList";
import AddDepartment from "./components/department/AddDepartment";
import EditDepartment from "./components/department/EditDepartment";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Navigate to="/admin-dashboard" />}></Route>
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBasedRoutes requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBasedRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<AdminSummary />}></Route>
          <Route path="departments" element={<DepartmentList />}></Route>
          <Route path="add-department" element={<AddDepartment />}></Route>
          <Route path="departments/:id" element={<EditDepartment />}></Route>
        </Route>
        <Route path="/employee-dashboard" element={<EmployeeDashboard />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
