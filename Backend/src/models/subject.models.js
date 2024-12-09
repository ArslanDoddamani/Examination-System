import mongoose from 'mongoose';
const SubjectSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, 'Subject code is required'],
      uppercase: true,
      unique: true,
      minlength: 9,
      maxlength: 9,
    },
    sub_name: {
      type: String,
      required: [true, 'Subject name is required'],
    },
    semester: {
      type: Number,
      required: [true, 'Semester is required'],
      min: [1, 'Semester should be a value between 1 and 8'],
      max: [8, 'Semester should be a value between 1 and 8'],
    },
    Dept: {
      type: String,
      required: [true, 'Department name is required'],
      uppercase: true,
      minlength: 3,
      maxlength: 3,
    },
    faculty: {
      type: String,
      required: [true, 'Faculty name is required'],
    },
    credits: {
      type: Number,
      required: [true, 'Number of credits is required'],
    },
    sub_type: {
      type: String,
      required: [true, 'Subject type is required'],
    },
  },
  { timestamps: true }
);

export const Subject_Details = mongoose.model('Subject_Details', SubjectSchema);
