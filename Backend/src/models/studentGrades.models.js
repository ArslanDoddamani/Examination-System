import mongoose from "mongoose";

const studentGradesSchema = new mongoose.Schema(
  {
    usn: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student_Details",
      required: true,
    },
    subCode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
    semester: {
      type: Number,
      min: 1,
      max: 8,
    },
    grade: {
      type: String,
      minlength: 1,
      maxlength: 2,
    },
    attempts: {
      type: Number,
      min: 1,
    },
  },
  {
    timestamps: true,
  }
);

export const StudentGrades = mongoose.model(
  "StudentGrades",
  studentGradesSchema
);
