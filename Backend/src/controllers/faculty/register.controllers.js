import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import Faculty from "../../models/faculty.models.js";

const registerFaculty = asyncHandler(async (req, res) => {
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

export default registerFaculty;
