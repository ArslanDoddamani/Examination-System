import Student from "../../models/student.models.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

const generateAccessTokens = async (studentId) => {
  try {
    const student = await Student.findById(studentId)
    const accessToken = student.generateAccessToken();
    return accessToken;
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access token"
    );
  }
};

const loginStudent = asyncHandler(async (req, res) => {
  const { usn, email, password } = req.body;

  if (
    !((usn && usn.trim() !== "") || (email && email.trim() !== "")) ||
    password.trim() === ""
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const query = {};
  if (usn) query.usn = usn;
  if (email) query.email = email;

  const student = await Student.findOne(query);

  if (!student) {
    throw new ApiError(404, "Invalid email or usn");
  }

  const isPasswordValid = await student.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Incorrect password");
  }

  const accessToken = await generateAccessTokens(student._id);

  const loggedInStudent = await Student.findById(student._id).select(
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
          student: loggedInStudent,
          accessToken,
        },
        "Student logged In Successfully"
      )
    );
});

export default loginStudent;
