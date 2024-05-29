import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";

const router = Router();

router.get("/", authController.user);
router.post("/login", authController.login);
router.post("/signup", authController.signup);
router.post("/logout", authController.logout);

export default router;
