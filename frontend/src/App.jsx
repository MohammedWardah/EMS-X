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
import EmployeeList from "./components/employee/EmployeeList";
import AddEmployee from "./components/employee/AddEmployee";
import ViewEmployee from "./components/employee/ViewEmployee";
import EditEmployee from "./components/employee/EditEmployee";
import AddSalary from "./components/salary/AddSalary";
import ViewSalary from "./components/salary/ViewSalary";
import EmpSummary from "./components/employeeDashboard/EmpSummary";
import LeaveList from "./components/leave/LeaveList";
import RequestLeave from "./components/leave/RequestLeave";
import Settings from "./components/employeeDashboard/Settings";
import LeaveTable from "./components/leave/LeaveTable";
import LeaveDetails from "./components/leave/LeaveDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />}></Route>
        <Route path="/login" element={<Login />}></Route>
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

          <Route path="employees" element={<EmployeeList />}></Route>
          <Route path="add-employee" element={<AddEmployee />}></Route>
          <Route path="employees/:id" element={<ViewEmployee />}></Route>
          <Route path="employees/edit/:id" element={<EditEmployee />}></Route>
          <Route path="employees/salary/:id" element={<ViewSalary />}></Route>
          <Route path="employees/leave-requests/:id" element={<LeaveList />}></Route>

          <Route path="departments" element={<DepartmentList />}></Route>
          <Route path="add-department" element={<AddDepartment />}></Route>
          <Route path="departments/:id" element={<EditDepartment />}></Route>

          <Route path="salary/add" element={<AddSalary />}></Route>
          <Route path="leave-requests" element={<LeaveTable />}></Route>
          <Route path="leave-requests/:id" element={<LeaveDetails />}></Route>

          <Route path={"settings"} element={<Settings />}></Route>
        </Route>
        <Route
          path="/employee-dashboard"
          element={
            <PrivateRoutes>
              <RoleBasedRoutes requiredRole={["admin", "employee"]}>
                <EmployeeDashboard />
              </RoleBasedRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<EmpSummary />}></Route>
          <Route path={"profile/:id"} element={<ViewEmployee />}></Route>
          <Route path={"leave/:id"} element={<LeaveList />}></Route>
          <Route path={"request-leave"} element={<RequestLeave />}></Route>
          <Route path={"salary/:id"} element={<ViewSalary />}></Route>
          <Route path={"settings"} element={<Settings />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
