import { Router } from 'express'

import { CartProductController } from '../controllers/cartProduct.controller.js'
const cartProductController = new CartProductController()
export const cartProductRouter = Router()

cartProductRouter.get('./api/cartProduct', cartProductController.getAllCartProduct)
cartProductRouter.post('./api/cartProduct', cartProductController.createCartProduct)
cartProductRouter.get('./api/cartProduct/:id', cartProductController.getCartProduct)
cartProductRouter.delete('./api/cartProduct/:id', cartProductController.deleteCartProduct)
