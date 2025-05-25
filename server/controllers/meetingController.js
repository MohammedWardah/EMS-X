import Meeting from "../models/Meeting.js";
import Employee from "../models/Employee.js";

// Admin: create meeting
export const addMeeting = async (req, res) => {
  try {
    const { title, description, date, department } = req.body;
    // get all employees in that department
    const emps = await Employee.find({ department });
    const assignedTo = emps.map((e) => e._id);
    const meeting = await Meeting.create({
      title,
      description,
      date,
      department,
      assignedTo,
      createdBy: req.user.id,
    });
    res.status(200).json({ success: true, meeting });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "add meeting server error" });
  }
};

// Admin: get all meetings
export const getMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find()
      .populate("department", "dep_name")
      .populate("assignedTo", "employeeId name");
    res.status(200).json({ success: true, meetings });
  } catch (err) {
    res.status(500).json({ success: false, error: "get meetings error" });
  }
};

// Employee: get assigned meetings
export const getEmployeeMeetings = async (req, res) => {
  try {
    const userId = req.params.id;
    const employee = await Employee.findOne({ userId: userId });
    if (!employee)
      return res
        .status(404)
        .json({ success: false, meetings: [], error: "Employee not found" });
    const meetings = await Meeting.find({ assignedTo: employee._id })
      .populate("department", "dep_name")
      .sort({ date: 1 });
    res.status(200).json({ success: true, meetings });
  } catch (err) {
    res.status(500).json({ success: false, error: "get employee meetings error" });
  }
};

// Admin: update
export const updateMeeting = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date, department } = req.body;
    // re-assign employees in the dept in case the dept changed
    const emps = await Employee.find({ department });
    const assignedTo = emps.map((e) => e._id);
    const meeting = await Meeting.findByIdAndUpdate(
      id,
      { title, description, date, department, assignedTo },
      { new: true }
    );
    if (!meeting)
      return res.status(404).json({ success: false, error: "meeting not found" });
    res.status(200).json({ success: true, meeting });
  } catch (err) {
    res.status(500).json({ success: false, error: "update meeting server error" });
  }
};

// Admin: delete
export const deleteMeeting = async (req, res) => {
  try {
    await Meeting.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: "delete meeting error" });
  }
};
