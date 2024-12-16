import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    subCode: {
      type: String,
      required: [true, "Subject code is required"],
      unique: true,
    },

    subName: {
      type: String,
      required: [true, "Subject name is required"],
    },

    subSem: {
      type: Number,
      required: [true, "Semester is required"],
      min: [1, "Semester should be a value between 1 and 8"],
      max: [8, "Semester should be a value between 1 and 8"],
    },

    subDept: {
      type: String,
      required: [true, "Department name is required"],
    },

    credits: {
      type: Number,
      required: [true, "Number of credits is required"],
    },

    subType: {
      type: String,
      required: [true, "Subject type is required"],
    },
  },
  { timestamps: true }
);

const Subject = mongoose.model("Subject", subjectSchema);

export default Subject;
