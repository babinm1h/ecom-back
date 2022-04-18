import { Router } from "express";
import authController from "../controllers/authController.js";
import passport from "passport"
import { checkAuth } from "../middleware/checkAuth.js";

export const authRouter = new Router()

authRouter.post('/registr', authController.registr)
authRouter.get("/check", checkAuth, authController.check)
authRouter.get("/logout", authController.logout)
authRouter.post("/login", passport.authenticate("local"), authController.login)