import { Order } from '../models/order.model.js'
import { Product } from '../models/product.model.js'
// import { OrderDetail } from '../models/orderDetails.model.js'

export class OrderController {
  getAllOrder = async (req, res) => {
    try {
      const orders = await Order.findAll({
        include: {
          model: Product
        }
      })
      res.json(orders)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  getOrder = async (req, res) => {
    try {
      const { id } = req.params
      const order = await Order.findByPk(id)
      if (order) {
        res.json(order)
      } else {
        res.status(404).json({ err: 'order not found' })
      }
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  deleteOrder = async (req, res) => {
    try {
      const { id } = await req.params
      const order = await Order.destroy({
        where: {
          id
        }
      })
      if (order) {
        res.json({ msg: 'order deleted' })
      } else {
        res.status(404).json({ err: 'order not found' })
      }
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  updateOrder = async (req, res) => {
    try {
      const { id } = req.params
      const order = await Order.findByPk(id)
      if (!order) {
        return res.status(404).json({ err: 'Order does not exist' })
      }
      order.set(req.body)
      await order.save()
      res.status(202).json(order)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
}
