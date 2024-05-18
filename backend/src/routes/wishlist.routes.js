import { Router } from 'express'

import { WishlistController } from '../controllers/wishlist.controller.js'
import { validateRolToken, validateToken } from '../middleware/validateToken.js'

const wishlistController = new WishlistController()
export const wishlistRouter = Router()

wishlistRouter.get('/api/wishlist', validateToken, validateRolToken(['client']), wishlistController.getAllWishlist)
wishlistRouter.post('/api/wishlist', validateToken, validateRolToken(['client']), wishlistController.createWishlist)
wishlistRouter.get('/api/wishlist/:id', validateToken, validateRolToken(['client']), wishlistController.getWishlist)
wishlistRouter.put('/api/wishlist/:id', validateToken, validateRolToken(['client']), wishlistController.updateWishlist)
wishlistRouter.delete('/api/wishlist/:id', validateToken, validateRolToken(['client']), wishlistController.deleteWishlist)
