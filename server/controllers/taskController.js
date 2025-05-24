// server/controllers/taskController.js
import Task from "../models/Task.js";
import Employee from "../models/Employee.js"; // ← add this

// Admin: create task
export const addTask = async (req, res) => {
  try {
    const { name, description, deadline, assignedTo } = req.body;
    const task = await Task.create({
      name,
      description,
      deadline,
      assignedTo,
      createdBy: req.user.id,
    });
    return res.status(200).json({ success: true, task });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "add task server error" });
  }
};

// Admin: list all tasks, **populating** assignedTo
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedTo", "_id employeeId name") // ← key fix: populate employeeId & name
      .sort({ createdAt: -1 });
    return res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "get tasks server error" });
  }
};

// Employee: list only their tasks, mapping from User._id → Employee._id
export const getEmployeeTasks = async (req, res) => {
  try {
    const userId = req.params.id; // this is the User._id from the front end

    // Find the corresponding Employee document
    const employee = await Employee.findOne({ userId: userId });
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, tasks: [], error: "Employee profile not found" });
    }

    // Query tasks by that Employee._id
    const tasks = await Task.find({ assignedTo: employee._id })
      .populate("assignedTo", "_id employeeId name")
      .sort({ deadline: 1 });

    return res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, tasks: [], error: "get employee tasks error" });
  }
};

// Admin: update task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, deadline, assignedTo } = req.body;
    const task = await Task.findByIdAndUpdate(
      id,
      { name, description, deadline, assignedTo },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ success: false, error: "task not found" });
    }
    return res.status(200).json({ success: true, task });
  } catch (error) {
    return res.status(500).json({ success: false, error: "update task server error" });
  }
};

// Employee/Admin: mark completed
export const completeTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(
      id,
      { status: "completed" },
      { new: true }
    ).populate("assignedTo", "_id employeeId name");
    if (!task) {
      return res.status(404).json({ success: false, error: "task not found" });
    }
    return res.status(200).json({ success: true, task });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "complete task error" });
  }
};

// Admin: delete task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "delete task error" });
  }
};
