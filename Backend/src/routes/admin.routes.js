import { Router } from "express";
import { addSubject } from "../controllers/admin/subject.controllers.js";
import { verifyAdmin } from "../middlewares/auth.middlewares.js";
import assignUSN from "../controllers/admin/usnAssign.controllers.js";
import getAllStudentsWithUSN from "../controllers/admin/returnStudentList.controllers.js";
import { loginAdmin, logoutAdmin, registerAdmin } from "../controllers/admin/auth.controllers.js";

const adminRouter = Router();

adminRouter.route("/subject").post(verifyAdmin, addSubject )
adminRouter.route("/register").post( registerAdmin )
adminRouter.route("/login").get( loginAdmin )
adminRouter.route("/logout").get( logoutAdmin )
adminRouter.route("/assignUSN").post(assignUSN)
adminRouter.route("/students").get(getAllStudentsWithUSN)

export default adminRouter;