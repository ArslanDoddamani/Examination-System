import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";


export const studentProfile = asyncHandler( async(req, res) => {
    const student = req.student;
    if(!student){
        throw new ApiError(500, "Something went wrong while retrieving the details")
    }
    
    return res.status(200).json(
        new ApiResponse(
          200,
          {
            student: student,
          },
          "Sent the student details successfully"
        )
      );
});



