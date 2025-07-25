import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import {body} from "express-validator";
import * as authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register",body('email').isEmail()
.withMessage('Not a valid e-mail address'),body('password')
.isLength({ min: 3 }).withMessage('password must be atleast 3 character'),
userController.createUserController);
router.post("/login",body('email').isEmail().withMessage('Not a valid e-mail address'),body('password').isLength({ min: 3 }).withMessage('password must be atleast 3 character'), userController.loginController);
router.get("/profile", authMiddleware.authUser, userController.profileController);
router.get("/logout", authMiddleware.authUser,userController.logoutController);
router.get("/all", authMiddleware.authUser,userController.allUserController);

export default router;