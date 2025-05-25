import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true }, // includes time
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Meeting", meetingSchema);
