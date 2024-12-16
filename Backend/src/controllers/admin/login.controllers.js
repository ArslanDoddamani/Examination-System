import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import Admin from "../../models/admin.models.js";

const generateAccessTokens = async (adminId) => {
    try {
      const admin = await Admin.findById(adminId)
      const accessToken = admin.generateAccessToken();
      return accessToken;
    } catch (error) {
      throw new ApiError(
        500,
        "Something went wrong while generating access token"
      );
    }
  };


const loginAdmin = asyncHandler(async(req, res) =>{
    const { adminEmail, adminPassword } = req.body;

    if (!adminEmail) {
        throw new ApiError(400, "email is required")
    }


  const admin = await Admin.findOne({adminEmail});

  if (!admin) {
    throw new ApiError(404, "Invalid email");
  }

  const isPasswordValid = await admin.isPasswordCorrect(adminPassword);

  if (!isPasswordValid) {
    throw new ApiError(401, "Incorrect password");
  }

  const accessToken = await generateAccessTokens(admin._id);

  const loggedInAdmin = await Admin.findById(admin._id).select(
    "-password"
  );

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

export default loginAdmin;