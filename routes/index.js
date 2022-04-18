import { Router } from "express";
import { authRouter } from "./authRouter.js";
import { brandRouter } from "./brandRouter.js";
import { cartRouter } from "./cartRouter.js";
import { itemsRouter } from "./itemsRouter.js";
import { ordersRouter } from "./ordersRouter.js";
import { stripeRouter } from "./stripeRouter.js";

export const router = new Router()


router.use("/auth", authRouter)
router.use("/cart", cartRouter)
router.use("/orders", ordersRouter)
router.use("/items", itemsRouter)
router.use("/stripe", stripeRouter)
router.use('/brands',brandRouter)