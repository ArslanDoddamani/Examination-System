import Subject from "../../models/subject.models.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const subjectRegister = asyncHandler(async (req, res) => {
  const { sem } = req.student;

  if (!sem) {
    throw new ApiError(
      500,
      "Something went wrong while registration of subjects"
    );
  }

  const subjects = await Subject.find({ subSem: sem });

  if (!subjects) {
    throw new ApiError(
      500,
      "Something went wrong while registration of subjects "
    );
  }

  return res
    .status(201)
    .json(new ApiResponse(200, subjects, "subjects registered successfully"));
});

