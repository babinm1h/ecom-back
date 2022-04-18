import { Router } from "express";
import stripeController from "../controllers/stripeController.js";

export const stripeRouter = new Router()

stripeRouter.post("/", stripeController.stripe)