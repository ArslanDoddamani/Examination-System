import Student from "../../models/student.models.js";
import Subject from "../../models/subject.models.js";
import { StudentGrades } from "../../models/studentGrades.models.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const addStudentGrade = asyncHandler(async (req, res) => {
  const { usn, subCode, semester, grade, attempts } = req.body;

  // Validate the input fields
  if (!usn || !subCode || !semester || !grade || !attempts) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Fetch the ObjectId for the student using the USN
    const student = await Student.findOne({ usn });
    if (!student) {
      return res
        .status(404)
        .json({ message: `Student not found with the USN: ${usn}` });
    }

    // Fetch the ObjectId for the subject using the subject code
    const subject = await Subject.findOne({ subCode });
    if (!subject) {
      return res
        .status(404)
        .json({ message: `Subject not found with the code: ${subCode}` });
    }

    // Create the grade entry
    const newGrade = new StudentGrades({
      usn: student._id, // Use ObjectId from the student
      subCode: subject._id, // Use ObjectId from the subject
      semester,
      grade,
      attempts,
    });

    // Save the grade entry to the database
    await newGrade.save();

    res.status(201).json({
      message: "Grade added successfully",
      data: newGrade,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding grade",
      error: error.message,
    });
  }
});
