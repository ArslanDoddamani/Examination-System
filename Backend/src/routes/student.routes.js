import { Router } from "express";
import { loginStudent, logoutStudent, registerStudent } from "../controllers/student/auth.controllers.js";


const studentRouter = Router();

studentRouter.route("/register").post( registerStudent )
studentRouter.route("/login").get( loginStudent )
studentRouter.route("/logout").get(logoutStudent)

export default studentRouter;
