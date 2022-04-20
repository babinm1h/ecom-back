import { Router } from "express";
import cartController from "../controllers/cartController.js";
import { checkAuth } from "../middleware/checkAuth.js"

export const cartRouter = new Router()

cartRouter.post("/:id", checkAuth, cartController.create)
cartRouter.delete("/:id", checkAuth, cartController.delete)
cartRouter.get("/", checkAuth, cartController.getCart)
cartRouter.put('/incr/:id', checkAuth, cartController.incr)
cartRouter.put('/decr/:id', checkAuth, cartController.decr)