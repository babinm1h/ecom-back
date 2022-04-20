import { Router } from 'express'
import reviewsController from '../controllers/reviewsController.js'
import { checkAuth } from '../middleware/checkAuth.js'

export const reviewsRouter = new Router()


reviewsRouter.post("/:id", checkAuth, reviewsController.create)
reviewsRouter.delete("/:id", checkAuth, reviewsController.delete)