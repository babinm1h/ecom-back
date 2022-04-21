import { Router } from "express";
import ordersController from "../controllers/ordersController.js";
import { checkAuth } from "../middleware/checkAuth.js";

export const ordersRouter = new Router()

ordersRouter.get("/", checkAuth, ordersController.getOrders)
ordersRouter.delete("/:id",checkAuth, ordersController.delete)