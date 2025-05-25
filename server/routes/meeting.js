import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addMeeting,
  getMeetings,
  getEmployeeMeetings,
  updateMeeting,
  deleteMeeting,
} from "../controllers/meetingController.js";

const router = express.Router();

router.post("/add", authMiddleware, addMeeting);
router.get("/", authMiddleware, getMeetings);
router.get("/employee/:id", authMiddleware, getEmployeeMeetings);
router.put("/:id", authMiddleware, updateMeeting);
router.delete("/:id", authMiddleware, deleteMeeting);

export default router;
