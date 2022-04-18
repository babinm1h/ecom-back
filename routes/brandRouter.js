import { Router } from "express";
import brandController from "../controllers/brandController.js";


export const brandRouter = new Router()

brandRouter.get("/", brandController.getAll)
brandRouter.post("/", brandController.create)
brandRouter.post("/:id", brandController.delete)