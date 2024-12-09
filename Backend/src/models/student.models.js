import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema(
  {
    usn: {
      type: String,
      unique: true,
    },
    fullName: {
      type: String,
      required: [true, 'Name is required'],
      unique: true,
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
    },
    sem: {
      type: Number,
      min: 1,
      max: 8,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      min: [8, 'Password must contain atleast 8 characters'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      unique: true,
      minlength: 10,
      maxlength: 10,
    },
  },
  { timestamps: true }
);

StudentSchema.pre("save", async function (next) {
  if(!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10)
  next()
})

StudentSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password, this.password)
}

const Student = mongoose.model('Student', StudentSchema);

export default Student;
