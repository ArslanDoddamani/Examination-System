import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import Admin from "../../models/admin.models.js";

const registerAdmin = asyncHandler(async (req, res) => {
  const {
    adminEmail, adminPassword
  } = req.body;

  if (!(adminEmail && adminEmail.trim() !== "")){
    throw new ApiError(400, "All fields are required");
  }

  const existedAdmin = await Admin.findOne({ adminEmail });

  if (existedAdmin) {
    throw new ApiError(409, "Admin with email already exists");
  }

  const admin = await Admin.create({
    adminEmail, adminPassword
  });

  const createdAdmin = await Admin.findById(admin._id).select(
    "-password"
  );

  if (!createdAdmin) {
    throw new ApiError(500, "Something went wrong while creating the admin");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(200, createdAdmin, "faculty registered successfully")
    );
});

export default registerAdmin;
