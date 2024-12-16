import { Router } from "express";
import registerStudent from "../controllers/student/register.controllers.js";
import loginStudent from "../controllers/student/login.controllers.js";
import logoutStudent from "../controllers/student/logout.controllers.js";

const studentRouter = Router();

studentRouter.route("/register").post( registerStudent )
studentRouter.route("/login").get( loginStudent )
studentRouter.route("/logout").get(logoutStudent)

export default studentRouter;
