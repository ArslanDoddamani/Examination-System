import Student from "../../models/student.models.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";


const logoutStudent = asyncHandler(async (req, res) => {
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "Student logged Out"))
})

export default logoutStudent;