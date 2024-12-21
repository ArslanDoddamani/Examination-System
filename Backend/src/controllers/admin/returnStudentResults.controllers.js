import asyncHandler from "../../utils/asyncHandler.js";
import Student from "../../models/student.models.js";
import { StudentGrades } from "../../models/studentGrades.models.js";
import Subject from "../../models/subject.models.js";

export const getStudentResults = asyncHandler(async (req, res) => {
  try {
    // Fetch all results from the `StudentGrades` collection
    const results = await StudentGrades.find({})
      .populate({
        path: "usn", // Populate `usn` with fields from `Student`
        select: "usn fullName department sem cgpa sgpa",
      })
      .populate({
        path: "subCode", // Populate `subCode` with fields from `Subject`
        select: "subCode subName subSem subDept credits subType",
      })
      .lean(); // Convert documents to plain JavaScript objects

    // Check if no results are found
    if (!results || results.length === 0) {
      return res.status(404).json({ message: "No results found" });
    }

    // Format the results for a structured frontend display
    const formattedResults = results.map((result) => ({
      usn: result.usn?.usn,
      fullName: result.usn?.fullName,
      department: result.usn?.department,
      semester: result.usn?.sem,
      cgpa: result.usn?.cgpa,
      sgpa: result.usn?.sgpa,
      subject: {
        subCode: result.subCode?.subCode,
        subName: result.subCode?.subName,
        subSem: result.subCode?.subSem,
        subDept: result.subCode?.subDept,
        credits: result.subCode?.credits,
        subType: result.subCode?.subType,
      },
      grade: result.grade,
      attempts: result.attempts,
    }));

    // Respond with the formatted results
    return res.status(200).json({ success: true, data: formattedResults });
  } catch (error) {
    // Handle unexpected errors
    return res.status(500).json({
      message: "Error fetching student results",
      error: error.message,
    });
  }
});
