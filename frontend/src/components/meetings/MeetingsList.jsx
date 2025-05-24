import React from "react";
import { useAuth } from "../../context/authContext";
import AdminMeetingsList from "./AdminMeetingsList";
import EmployeeMeetingsList from "./EmployeeMeetingsList";

const MeetingsList = () => {
  const { user } = useAuth(); // user.role === "admin" or "employee"

  if (user.role === "admin") {
    return <AdminMeetingsList />;
  }

  // for employees we pass their own employee _id from the auth context
  return <EmployeeMeetingsList employeeId={user._id} />;
};

export default MeetingsList;
