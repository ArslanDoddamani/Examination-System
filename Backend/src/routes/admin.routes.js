import { Router } from "express";
import { addSubject } from "../controllers/admin/subject.controllers.js";
import { verifyAdmin } from "../middlewares/auth.middlewares.js";
import { loginAdmin, logoutAdmin, registerAdmin } from "../controllers/admin/auth.controllers.js";


const adminRouter = Router();

adminRouter.route("/subject").post(verifyAdmin, addSubject )
adminRouter.route("/register").post( registerAdmin )
adminRouter.route("/login").get( loginAdmin )
adminRouter.route("/logout").get( logoutAdmin )

export default adminRouter;