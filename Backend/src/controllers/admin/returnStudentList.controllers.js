import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import Student from "../../models/student.models.js";

const getAllStudentsWithUSN = asyncHandler(async (req, res) => {
  const students = await Student.find().sort({ usn: 1 });

  if (!students.length) {
    return res.status(404).json(new ApiResponse(404, null, "No students found"));
  }

  return res.status(200).json(
    new ApiResponse(200, students, "Students retrieved successfully")
  );
});


export default getAllStudentsWithUSN;