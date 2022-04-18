import { Router } from "express";
import itemsController from "../controllers/itemsController.js";
import { upload } from "../middleware/multer.js";

export const itemsRouter = new Router()

itemsRouter.get("/", itemsController.getItems)
itemsRouter.post("/", upload.single("img"), itemsController.create)
itemsRouter.delete("/:id", itemsController.delete)
itemsRouter.get("/:id", itemsController.getOne)
itemsRouter.get("/similar/:categ", itemsController.getSimilar)