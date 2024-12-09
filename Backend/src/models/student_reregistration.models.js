import mongoose from 'mongoose';

const StudentReregistrationSchema = new mongoose.Schema(
  {
    usn: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student_Details',
    },
    subcode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject_Details',
    },
    semester: {
      // the current semester in which the student is reregistering the subject
      type: Number,
      required: true,
      min: 1,
      max: 8,
    },
    transaction_id_r: {
      type: String,
      required: true,
      maxlength: 30,
    },
  },
  {
    timestamps: true,
  }
);

export const Student_Reregistration = mongoose.model(
  'Student_Reregistration',
  StudentReregistrationSchema
);
