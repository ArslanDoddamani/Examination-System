import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema(
  {
    usn: {
      type: String,
      required: [true, 'USN is required'],
      unique: true,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      unique: true,
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
    },
    sem: {
      type: Number,
      min: 1,
      max: 8,
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'password is required'],
      min: [8, 'Password must contain atleast 8 characters'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      unique: true,
      minlength: 10,
      maxlength: 10,
    },
  },
  { timestamps: true }
);

export const Student_Details = mongoose.model('Student_Details', StudentSchema);
