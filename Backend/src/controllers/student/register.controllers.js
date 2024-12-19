import asyncHandler from "../../utils/asyncHandler.js"
import ApiError from "../../utils/ApiError.js"
import Student from "../../models/student.models.js"
import ApiResponse from "../../utils/ApiResponse.js"

const registerStudent = asyncHandler(async (req, res) => {
    
    const { fullName, department, sem, email, password, phone} = req.body;
    
    if(
        [ fullName, department, email, password, phone ].some((field) => 
            field?.trim() === "")
    ){
        throw new ApiError(400, "All fields are required");
    }

    const existedStudent = await Student.findOne({email})

    if(existedStudent){
        throw new ApiError(409, "Student with email already exists");
    }

    const student = await Student.create({
        fullName,
        department,
        sem,
        email,
        password,
        phone
    })

    const createdStudent = await Student.findById(student._id).select(
        "-password"
    )

    if(!createdStudent){
        throw new ApiError(500, "Something went wrong while creating the student");
    }

    return res.status(201).json(
        new ApiResponse(200, createdStudent, "student registered successfully")
    )
});
/*const getStudentsOrderedByUSN = asyncHandler(async (req, res) => {
    const students = await Student.aggregate([
      {
        $addFields: {
          lastThreeUSN: { $substr: ["$usn", -3, 3] }, 
        },
      },
      { $sort: { lastThreeUSN: 1 } }, 
    ]);
  
    if (!students.length) {
      throw new ApiError(404, "No students found");
    }
  
    return res.status(200).json(new ApiResponse(200, students, "Students sorted successfully by USN"));
  });*/
  
export { registerStudent };

