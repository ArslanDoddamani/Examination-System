import mongoose from 'mongoose';

const ChallengeValuationSchema = new mongoose.Schema(
  {
    usn: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student_Details',
    },
    sub_code: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject_Details',
    },
    amount_c: {
      type: Number,
      required: true,
      min: 0,
    },
    transaction_id_c: {
      type: String,
      required: true,
      maxlength: 30,
    },
    old_grade: {
      type: String,
      required: true,
      maxlength: 1,
    },
  },
  {
    timestamps: true,
  }
);

export const Challenge_Valuation = mongoose.model(
  'Challenge_Valuation',
  ChallengeValuationSchema
);
