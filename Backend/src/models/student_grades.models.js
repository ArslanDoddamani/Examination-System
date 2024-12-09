import mongoose from 'mongoose';

const StudentGradesSchema = new mongoose.Schema(
  {
    usn: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student_Details',
      required: true,
    },
    sub_code: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject_Details',
    },
    semester: {
      type: Number,
      required: true,
      min: 1,
      max: 8,
    },
    grade: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 1,
    },
    attempts: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    timestamps: true,
  }
);

export const Student_Grades = mongoose.model(
  'Student_Grades',
  StudentGradesSchema
);
