import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import Admin from "../../models/admin.models.js";

export const registerAdmin = asyncHandler(async (req, res) => {
  const { adminEmail, adminPassword } = req.body;

  if (!(adminEmail && adminEmail.trim() !== "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existedAdmin = await Admin.findOne({ adminEmail });

  if (existedAdmin) {
    throw new ApiError(409, "Admin with email already exists");
  }

  const admin = await Admin.create({
    adminEmail,
    adminPassword,
  });

  const createdAdmin = await Admin.findById(admin._id).select("-password");

  if (!createdAdmin) {
    throw new ApiError(500, "Something went wrong while creating the admin");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(200, createdAdmin, "faculty registered successfully")
    );
});

const generateAccessTokens = async (adminId) => {
  try {
    const admin = await Admin.findById(adminId);
    const accessToken = admin.generateAccessToken();
    return accessToken;
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access token"
    );
  }
};

export const loginAdmin = asyncHandler(async (req, res) => {
  const { adminEmail, adminPassword } = req.body;

  if (!adminEmail) {
    throw new ApiError(400, "email is required");
  }

  const admin = await Admin.findOne({ adminEmail });

  if (!admin) {
    throw new ApiError(404, "Invalid email");
  }

  const isPasswordValid = await admin.isPasswordCorrect(adminPassword);

  if (!isPasswordValid) {
    throw new ApiError(401, "Incorrect password");
  }

  const accessToken = await generateAccessTokens(admin._id);

  const loggedInAdmin = await Admin.findById(admin._id).select("-password");

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        200,
        {
          student: loggedInAdmin,
          accessToken,
        },
        "Faculty logged In Successfully"
      )
    );
});

export const logoutAdmin = asyncHandler(async (_, res) => {
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "Admin logged Out"));
});
