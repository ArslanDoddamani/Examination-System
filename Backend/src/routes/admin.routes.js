import { Router } from "express";
import { addSubject } from "../controllers/admin/subject.controllers.js";
import registerAdmin from "../controllers/admin/register.controllers.js";
import loginAdmin from "../controllers/admin/login.controllers.js";
import logoutAdmin from "../controllers/admin/logout.controllers.js";
import { verifyAdmin } from "../middlewares/auth.middlewares.js";


const adminRouter = Router();

adminRouter.route("/subject").post(verifyAdmin, addSubject )
// adminRouter.route("/register").post( registerAdmin )
adminRouter.route("/login").get( loginAdmin )
adminRouter.route("/logout").get( logoutAdmin )

export default adminRouter;