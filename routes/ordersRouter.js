import { Router } from "express";
import ordersController from "../controllers/ordersController.js";

export const ordersRouter = new Router()

ordersRouter.get("/", ordersController.getOrders)
ordersRouter.post('/', ordersController.create)
ordersRouter.delete("/:id", ordersController.delete)