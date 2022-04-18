import { Router } from "express";
import cartController from "../controllers/cartController.js";

export const cartRouter = new Router()

cartRouter.post("/", cartController.create)
cartRouter.delete("/:id", cartController.delete)
cartRouter.get("/",cartController.getCart)