import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment,
} from "../controllers/departmentController.js";

const router = express.Router();

// // sanity‐check logs
// console.log("⚡ [department.js] router module loaded");

router.post("/add", authMiddleware, addDepartment);
router.get("/:id", authMiddleware, getDepartment);
router.get("/", authMiddleware, getDepartments);
router.put("/:id", authMiddleware, updateDepartment);
router.delete("/:id", authMiddleware, deleteDepartment);

export default router;
