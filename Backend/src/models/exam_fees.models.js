import mongoose from 'mongoose';

const ExamFeesSchema = new mongoose.Schema(
  {
    usn: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student_Details',
    },
    year: {
      type: Number,
      required: true,
      min: 2000,
    },
    amount_e: {
      type: Number,
      required: true,
      min: 0,
    },
    transaction_id_e: {
      type: String,
      required: true,
      maxlength: 30,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

export const Exam_Fees = mongoose.model('Exam_Fees', ExamFeesSchema);
