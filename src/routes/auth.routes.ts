import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../validations";
import { registerSchema, loginSchema, updateUserSchema } from "../validations/auth.validation";
import * as authController from "../controllers/auth.controller";

const router = Router();

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
router.get("/profile", authenticate, authController.getProfile);
router.put("/profile", authenticate, validate(updateUserSchema), authController.updateProfile);
router.post("/change-password", authenticate, authController.changePassword);

export default router;
