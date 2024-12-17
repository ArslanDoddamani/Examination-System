import Subject  from "../../models/subject.models.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js"

export const addSubject = asyncHandler( async(req, res) => {
    const { subCode, subName, subSem, subDept, credits, subType } = req.body;

    if(
        [ subCode, subName, subDept, credits, subType ].some((field) => 
         field?.trim() === "")
    ){
        throw new ApiError(400, "All fields are required");
    }

    const existedSubject = await Subject.findOne({subCode})

    if(existedSubject){
        throw new ApiError(409, "Subject is already exists");
    }

    const subject = await Subject.create({
        subCode, 
        subName, 
        subSem, 
        subDept, 
        credits, 
        subType
    });

    const createdSubject = await Subject.findById(subject._id);

    if(!createdSubject){
        throw new ApiError(500, "Something went wrong while creating the subject");
    }

    return res.status(201).json(
        new ApiResponse(200, createdSubject, "subject created successfully")
    )
});