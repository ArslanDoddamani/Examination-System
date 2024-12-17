import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import Faculty from "../../models/faculty.models.js";

export const registerFaculty = asyncHandler(async (req, res) => {
  const {
    facultyName,
    facultyDept,
    facultyEmail,
    facultyPassword,
    facultyPhone,
  } = req.body;

  if (
    [
      facultyName,
      facultyDept,
      facultyEmail,
      facultyPassword,
      facultyPhone,
    ].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedFaculty = await Faculty.findOne({ facultyEmail });

  if (existedFaculty) {
    throw new ApiError(409, "Faculty with email already exists");
  }

  const faculty = await Faculty.create({
    facultyName,
    facultyDept,
    facultyEmail,
    facultyPassword,
    facultyPhone,
  });

  const createdFaculty = await Faculty.findById(faculty._id).select(
    "-password"
  );

  if (!createdFaculty) {
    throw new ApiError(500, "Something went wrong while creating the faculty");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(200, createdFaculty, "faculty registered successfully")
    );
});

const generateAccessTokens = async (facultyId) => {
  try {
    const faculty = await Faculty.findById(facultyId);
    const accessToken = faculty.generateAccessToken();
    return accessToken;
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access token"
    );
  }
};

export const loginFaculty = asyncHandler(async (req, res) => {
  const { facultyEmail, facultyPassword } = req.body;

  if (!(facultyEmail && facultyEmail.trim() !== "")) {
    throw new ApiError(400, "email is required");
  }

  const faculty = await Faculty.findOne({ facultyEmail });

  if (!faculty) {
    throw new ApiError(404, "Invalid email");
  }

  const isPasswordValid = await faculty.isPasswordCorrect(facultyPassword);

  if (!isPasswordValid) {
    throw new ApiError(401, "Incorrect password");
  }

  const accessToken = await generateAccessTokens(faculty._id);

  const loggedInFaculty = await Faculty.findById(faculty._id).select(
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
          student: loggedInFaculty,
          accessToken,
        },
        "Faculty logged In Successfully"
      )
    );
});

export const logoutFaculty = asyncHandler(async ( _, res) => {
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "Faculty logged Out"));
});
