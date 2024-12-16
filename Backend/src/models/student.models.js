import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const studentSchema = new mongoose.Schema(
  {
    usn: {
      type: String,
      unique: true,
      sparse: true,
    },

    fullName: {
      type: String,
      required: [true, "Name is required"],
    },

    department: {
      type: String,
      required: [true, "Department is required"],
    },

    sem: {
      type: Number,
      min: 1,
      max: 8,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      min: [8, "Password must contain atleast 8 characters"],
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      minlength: 10,
      maxlength: 10,
    },
  },
  { timestamps: true }
);

studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

studentSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

studentSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      usn: this.usn,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

const Student = mongoose.model("Student", studentSchema);

export default Student;
