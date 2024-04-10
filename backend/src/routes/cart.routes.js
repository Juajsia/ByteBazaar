import { Router } from 'express'

import { CartController } from '../controllers/cart.controller.js'
import { validateRolToken, validateToken } from '../middleware/validateToken.js'

const cartController = new CartController()
export const cartRouter = Router()

cartRouter.get('/api/cart', validateToken, validateRolToken(['client']), cartController.getAllcart)
cartRouter.post('/api/cart', validateToken, validateRolToken(['client']), cartController.createCart)
cartRouter.get('/api/cart/:id', validateToken, validateRolToken(['client']), cartController.getCart)
cartRouter.put('/api/cart/:id', validateToken, validateRolToken(['client']), cartController.updateCart)
cartRouter.delete('/api/cart/:id', validateToken, validateRolToken(['client']), cartController.deleteCart)
