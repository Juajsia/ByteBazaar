import { Router } from 'express'

import { OrderController } from '../controllers/order.controller.js'
import { validateRolToken, validateToken } from '../middleware/validateToken.js'

const orderController = new OrderController()
export const orderRouters = Router()

orderRouters.get('/api/order', validateToken, validateRolToken(['client', 'administrator']), orderController.getAllOrder)
orderRouters.post('/api/order', validateToken, validateRolToken(['client']), orderController.createOrder)
orderRouters.get('/api/order/:id', validateToken, validateRolToken(['client']), orderController.getOrder)
orderRouters.delete('/api/order/:id', validateToken, validateRolToken(['client']), orderController.deleteOrder)
orderRouters.get('/api/order/history/:clientId', validateToken, validateRolToken(['client']), orderController.getClientOrders)
orderRouters.put('/api/order/:id', validateToken, validateRolToken(['administrator']), orderController.returnOrder)
