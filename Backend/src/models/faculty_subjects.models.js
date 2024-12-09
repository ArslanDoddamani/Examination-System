import mongoose from 'mongoose';

const FacultySubjectSchema = new mongoose.Schema(
  {
    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject_Details',
    },
    F_subcode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject_Details',
    },

    reregistration: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Faculty_Subjects = mongoose.model(
  'Faculty_Subjects',
  FacultySubjectSchema
);
