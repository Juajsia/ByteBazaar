import { Router } from 'express'

import { WishlistProductController } from '../controllers/wishlistProduct.controller.js'
import { validateRolToken, validateToken } from '../middleware/validateToken.js'

const wishlistProductController = new WishlistProductController()
export const wishlistProductRouter = Router()

wishlistProductRouter.get('/api/wishlistProduct', validateToken, validateRolToken(['client']), wishlistProductController.getAllWishlistProduct)
wishlistProductRouter.post('/api/wishlistProduct', validateToken, validateRolToken(['client']), wishlistProductController.createWishlistProduct)
wishlistProductRouter.get('/api/wishlistProduct/:WishlistId/:ProductId', validateToken, validateRolToken(['client']), wishlistProductController.getWishlistProduct)
wishlistProductRouter.delete('/api/wishlistProduct/:WishlistId/:ProductId', validateToken, validateRolToken(['client']), wishlistProductController.deleteWishlistProduct)
