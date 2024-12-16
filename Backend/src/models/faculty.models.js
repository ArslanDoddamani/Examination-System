import mongoose from 'mongoose';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const facultySchema = new mongoose.Schema(
  {
    facultyName: {
      type: String,
      required: [true, 'Name is required'],
    },
    facultyDept: {
      type: String,
      required: [true, 'Department is required'],
    },
    facultyEmail: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
      lowercase: true,
    },
    facultyPassword: {
      type: String,
      required: [true, 'password is required'],
      min: [8, 'Password must contain atleast 8 characters'],
    },
    facultyPhone: {
      type: String,
      required: [true, 'Phone number is required'],
      unique: true,
      minlength: 10,
      maxlength: 10,
    },
  },
  { timestamps: true }
);

facultySchema.pre("save", async function (next) {
  if (!this.isModified("facultyPassword")) return next();

  this.facultyPassword = await bcrypt.hash(this.facultyPassword, 10);
  next();
});

facultySchema.methods.isPasswordCorrect = async function (facultyPassword) {
  return await bcrypt.compare(facultyPassword, this.facultyPassword);
};

facultySchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      facultyEmail: this.facultyEmail,
      facultyDept: this.facultyDept,
      facultyName: this.facultyName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

const Faculty = mongoose.model('Faculty', facultySchema);

export default Faculty;
