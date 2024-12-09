import mongoose from 'mongoose';

const FacultySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      unique: true,
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
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

export const Faculty_Details = mongoose.model('Faculty_Details', FacultySchema);
