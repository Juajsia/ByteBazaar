import { Router } from 'express'

import { OrderController } from '../controllers/order.controller.js'
const orderController = new OrderController()
export const orderRouters = Router()

orderRouters.get('/api/order', orderController.getAllOrder)
orderRouters.post('/api/order')
orderRouters.get('/api/order/:id', orderController.getOrder)
orderRouters.put('/api/order/:id', orderController.updateOrder)
orderRouters.delete('/api/order/:id', orderController.deleteOrder)
