import { Router } from 'express'

import { OrderDetailController } from '../controllers/orderDetails.controller.js'
const orderDetailscontroller = new OrderDetailController()
export const orderDetailsRouter = Router()

orderDetailsRouter.get('/api/orderDetails', orderDetailscontroller.getAllOrderDetails)
orderDetailsRouter.post('/api/orderDetails', orderDetailscontroller.createorderDetails)
orderDetailsRouter.get('/api/orderDetails/:id', orderDetailscontroller.getOrderDetails)
orderDetailsRouter.delete('/api/orderDetails/:id', orderDetailscontroller.deleteOrderDetails)
