import { Router } from "express";
import registerFaculty from "../controllers/faculty/register.controllers.js";
import loginFaculty from "../controllers/faculty/login.controllers.js";
import logoutFaculty from "../controllers/faculty/logout.controllets.js";


const facultyRouter = Router();

facultyRouter.route("/register").post( registerFaculty )
facultyRouter.route("/login").get( loginFaculty )
facultyRouter.route("/logout").get(logoutFaculty)

export default facultyRouter;
