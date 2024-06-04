import { Router } from 'express'

import { ReviewController } from '../controllers/review.controller.js'
import { validateRolToken, validateToken } from '../middleware/validateToken.js'

const reviewController = new ReviewController()
export const reviewRouter = Router()

reviewRouter.get('/api/review', validateToken, validateRolToken(['administrator', 'salesAgent']), reviewController.getAllReview)
reviewRouter.post('/api/review', validateToken, validateRolToken(['client']), reviewController.createReview)
reviewRouter.get('/api/review/:ClientId/:ProductId', validateToken, validateRolToken(['client', 'administrator', 'salesAgent']), reviewController.getReview)
reviewRouter.get('/api/review/:ProductId', reviewController.getReviewsByProd)
reviewRouter.put('/api/review/:ClientId/:ProductId', validateToken, validateRolToken(['client']), reviewController.updateReview)
reviewRouter.delete('/api/review/:ClientId/:ProductId', validateToken, validateRolToken(['client']), reviewController.deleteReview)
reviewRouter.get('/api/review/score/counting/:ProductId', reviewController.getScoreCounting)
