// server/routes/task.js
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addTask,
  getTasks,
  getEmployeeTasks,
  updateTask,
  completeTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

// Create
router.post("/add", authMiddleware, addTask);

// List all for Admin
router.get("/", authMiddleware, getTasks);

// List only for the logged-in Employee
router.get("/employee/:id", authMiddleware, getEmployeeTasks);

// Edit (Admin)
router.put("/:id", authMiddleware, updateTask);

// Complete (Employee/Admin)
router.put("/:id/complete", authMiddleware, completeTask);

// Delete (Admin)
router.delete("/:id", authMiddleware, deleteTask);

export default router;
