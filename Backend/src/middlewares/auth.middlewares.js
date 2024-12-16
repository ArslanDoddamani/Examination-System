import Admin from "../models/admin.models.js";
import Faculty from "../models/faculty.models.js";
import Student from "../models/student.models.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";


export const verifyStudent = asyncHandler(async(req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        
        // console.log(token);
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const student = await Student.findById(decodedToken?._id).select("-password")
    
        if (!student) {
            throw new ApiError(401, "Invalid access Token")
        }
    
        req.student = student;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
    
})

export const verifyFaculty = asyncHandler(async(req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        
        // console.log(token);
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const student = await Faculty.findById(decodedToken?._id).select("-password")
    
        if (!student) {
            throw new ApiError(401, "Invalid access Token")
        }
    
        req.student = student;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
    
})

export const verifyAdmin = asyncHandler(async(req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        
        // console.log(token);
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const student = await Admin.findById(decodedToken?._id).select("-password")
    
        if (!student) {
            throw new ApiError(401, "Invalid access Token")
        }
    
        req.student = student;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
})