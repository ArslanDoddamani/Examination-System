import { Router } from "express";
import {
  loginStudent,
  logoutStudent,
  registerStudent,
} from "../controllers/student/auth.controllers.js";
import { studentProfile } from "../controllers/student/student.controllers.js";
import { verifyStudent } from "../middlewares/auth.middlewares.js";
import { subjectRegister } from "../controllers/student/subject.controllers.js";
import { regularSubjectPayment } from "../controllers/student/payment.controllers.js";

const studentRouter = Router();

studentRouter.route("/register").post(registerStudent);
studentRouter.route("/login").get(loginStudent);
studentRouter.route("/logout").get(logoutStudent);
studentRouter.route("/profile").get(verifyStudent, studentProfile);
studentRouter.route("/registration/regular").get(verifyStudent, subjectRegister);
studentRouter.route("/payment").post(verifyStudent, regularSubjectPayment);

export default studentRouter;
