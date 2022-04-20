import bodyParser from "body-parser";
import { Router } from "express";
import stripeController from "../controllers/stripeController.js";
import { checkAuth } from "../middleware/checkAuth.js";


export const stripeRouter = new Router()

stripeRouter.post("/create-checkout-session", checkAuth, stripeController.create)
stripeRouter.post("/webhook", stripeController.webhook)