import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const adminSchema = new mongoose.Schema(
  {
    adminEmail: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      lowercase: true,
    },
    adminPassword: {
      type: String,
      required: [true, "password is required"],
      min: [8, "Password must contain atleast 8 characters"],
    },
  },
  { timestamps: true }
);

adminSchema.pre("save", async function (next) {
    if (!this.isModified("adminPassword")) return next();
  
    this.adminPassword = await bcrypt.hash(this.adminPassword, 10);
    next();
  });
  
  adminSchema.methods.isPasswordCorrect = async function (adminPassword) {
    return await bcrypt.compare(adminPassword, this.adminPassword);
  };
  
  adminSchema.methods.generateAccessToken = function () {
    return jwt.sign(
      {
        _id: this._id,
        adminEmail: this.adminEmail,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );
  };

  const Admin = mongoose.model('Admin', adminSchema);

  export default Admin;
