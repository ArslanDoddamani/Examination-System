import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import Student from "../../models/student.models.js";

const assignUSN = asyncHandler(async (req, res) => {

  const students = await Student.find().sort({ fullName: 1 });

  if (!students.length) {
    throw new ApiError(404, "No students found to assign USNs");
  }


  const baseUSN = "2BA21CS";
  let usnCounter = 1;

  
  const bulkUpdates = students.map((student) => {
    const paddedCounter = usnCounter.toString().padStart(3, "0"); 
    const newUSN = `${baseUSN}${paddedCounter}`;
    usnCounter++;

    return {
      updateOne: {
        filter: { _id: student._id },
        update: { usn: newUSN },
      },
    };
  });

  
  const bulkResult = await Student.bulkWrite(bulkUpdates);

  return res.status(200).json(
    new ApiResponse(
      200,
      { matchedCount: bulkResult.matchedCount, modifiedCount: bulkResult.modifiedCount },
      "USNs assigned successfully"
    )
  );
});

export default assignUSN;
