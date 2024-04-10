import { Router } from 'express'

import { CartProductController } from '../controllers/cartProduct.controller.js'
import { validateRolToken, validateToken } from '../middleware/validateToken.js'

const cartProductController = new CartProductController()
export const cartProductRouter = Router()

cartProductRouter.get('/api/cartProduct', validateToken, validateRolToken(['client']), cartProductController.getAllCartProduct)
cartProductRouter.post('/api/cartProduct', validateToken, validateRolToken(['client']), cartProductController.createCartProduct)
cartProductRouter.get('/api/cartProduct/:CartId/:ProductId', validateToken, validateRolToken(['client']), cartProductController.getCartProduct)
cartProductRouter.put('/api/cartProduct/:CartId/:ProductId', validateToken, validateRolToken(['client']), cartProductController.updateCartProduct)
cartProductRouter.delete('/api/cartProduct/:CartId/:ProductId', validateToken, validateRolToken(['client']), cartProductController.deleteCartProduct)
cartProductRouter.delete('/api/cartProduct/:CartId', validateToken, validateRolToken(['client']), cartProductController.clearCartProduct)
cartProductRouter.get('/api/cartProduct/bestSellers', cartProductController.getBestSellers)
