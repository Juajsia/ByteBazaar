import { Router } from 'express'

import { OrderDetailController } from '../controllers/orderDetails.controller.js'
const orderDetailscontroller = new OrderDetailController()
export const orderDetailsRouter = Router()

orderDetailsRouter.get('/api/orderDetails', orderDetailscontroller.getAllOrderDetails)
orderDetailsRouter.post('/api/orderDetails', orderDetailscontroller.createorderDetails)
orderDetailsRouter.get('/api/orderDetails/:ProductId/:OrderId', orderDetailscontroller.getOrderDetails)
orderDetailsRouter.delete('/api/orderDetails/:ProductId/:OrderId', orderDetailscontroller.deleteOrderDetails)
orderDetailsRouter.get('/api/orderDetails/bestSellers', orderDetailscontroller.getBestSellers)
