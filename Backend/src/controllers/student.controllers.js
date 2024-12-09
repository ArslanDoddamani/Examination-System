import asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/ApiError.js"
import Student from "../models/student.models.js"
import ApiResponse from "../utils/ApiResponse.js"

const registerStudent = asyncHandler(async (req, res) => {
    
    const { fullName, department, sem, email, password, phone} = req.body;

    console.log(fullName+" "+ department);
    

    if(
        [ fullName, department, sem, email, password, phone ].some((field) => 
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

export default registerStudent;