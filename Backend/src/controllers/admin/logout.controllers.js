import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";


const logoutAdmin = asyncHandler(async(req, res)=> {
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "Admin logged Out"))
})

export default logoutAdmin