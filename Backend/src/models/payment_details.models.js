import mongoose from 'mongoose';

const PaymentDetailsSchema = new mongoose.Schema(
  {
    usn: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student_Details',
    },
    subject_code: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject_Details',
    },
    transaction_id: {
      type: String,
      required: true,
      maxlength: 30,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    type_p: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student_Grades',
    },
  },
  {
    timestamps: true,
  }
);

export const Payment_Details = mongoose.model(
  'Payment_Details',
  PaymentDetailsSchema
);
