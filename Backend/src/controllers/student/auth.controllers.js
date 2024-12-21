import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import Student from "../../models/student.models.js";
import ApiResponse from "../../utils/ApiResponse.js";

export const registerStudent = asyncHandler(async (req, res) => {
  const { fullName, department, email, password, phone, dob } = req.body;

  if (
    [fullName, department, email, password, phone, dob].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedStudent = await Student.findOne({ email });

  if (existedStudent) {
    throw new ApiError(409, "Student with email already exists");
  }

  const student = await Student.create({
    fullName,
    department,
    sem: 1,
    email,
    password,
    phone,
    dob
  });

  const createdStudent = await Student.findById(student._id).select(
    "-password"
  );

  if (!createdStudent) {
    throw new ApiError(500, "Something went wrong while creating the student");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(200, createdStudent, "student registered successfully")
    );
});

const generateAccessTokens = async (studentId) => {
  try {
    const student = await Student.findById(studentId);
    const accessToken = student.generateAccessToken();
    return accessToken;
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access token"
    );
  }
};

export const loginStudent = asyncHandler(async (req, res) => {
  
  const { usn, password } = req.body;
  

  if (!usn || usn.trim() === "" || password.trim() === "") {
    throw new ApiError(400, "All fields are required");
  }

  const student = await Student.findOne({ usn });

  if (!student) {
    throw new ApiError(404, "Invalid usn");
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
    secure: false, // Set to true if using HTTPS in production
    sameSite: "lax", // Allows cookies in cross-origin requests with credentials
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
          userType: "student",
        },
        "Student logged In Successfully"
      )
    );
});


/*const getStudentsOrderedByUSN = asyncHandler(async (req, res) => {
  console.log(req.body)
  const students = await Student.aggregate([
    {
      $addFields: {
        lastThreeUSN: {
          $cond: {
            if: {
              $and: [
                { $ne: [{ $type: "$usn" }, "missing"] },  
                { $gte: [{ $strLenCP: { $ifNull: ["$usn", ""] } }, 3] }  
              ]
            },
            then: { $substrBytes: ["$usn", -3, 3] },  
            else: "$usn" 
          }
        }
      }
    },
    { $sort: { lastThreeUSN: -1 } } 
  ]);

  if (!students.length) {
    throw new ApiError(404, "No students found");
  }

  return res.status(200).json(new ApiResponse(200, students, "Students sorted successfully by last three characters of USN"));
});*/

export const logoutStudent = asyncHandler(async ( _, res) => {
  const options = {
    httpOnly: true,
    secure: false, // Set to true if using HTTPS in production
    sameSite: "lax", // Allows cookies in cross-origin requests with credentials
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "Student logged Out"));
});

