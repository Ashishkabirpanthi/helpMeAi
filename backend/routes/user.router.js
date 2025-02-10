import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import {body} from "express-validator"

const router = Router();

router.post("/register",body('email').isEmail().withMessage('Not a valid e-mail address'),body('password').isLength({ min: 3 }).withMessage('password must be atleast 3 character'), userController.createUserController);

export default router;