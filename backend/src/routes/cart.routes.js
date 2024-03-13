import { Router } from 'express'

import { CartController } from '../controllers/cart.controller.js'
const cartController = new CartController()
export const cartRouter = Router()

cartRouter.get('/api/cart', cartController.getAllcart)
cartRouter.post('/api/cart', cartController.createCart)
cartRouter.get('/api/cart/:id', cartController.getCart)
cartRouter.put('/api/cart/:id', cartController.updateCart)
cartRouter.delete('/api/cart/:id', cartController.deleteCart)
