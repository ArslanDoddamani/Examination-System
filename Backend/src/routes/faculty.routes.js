import { Router } from "express";
import { loginFaculty, logoutFaculty, registerFaculty } from "../controllers/faculty/auth.controllers.js";



const facultyRouter = Router();

facultyRouter.route("/register").post( registerFaculty )
facultyRouter.route("/login").get( loginFaculty )
facultyRouter.route("/logout").get(logoutFaculty)

export default facultyRouter;
