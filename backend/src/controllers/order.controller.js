import { Order } from '../models/order.model.js'
import { Product } from '../models/product.model.js'
import { OrderDetail } from '../models/orderDetails.model.js'

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

  createOrder = async (req, res) => {
    try {
      const { products } = req.body
      const items = []
      const promise = products.map(async (element) => {
        const item = await Product.findOne({ where: { id: element.productId } })
        if (item.stock < element.quantity) {
          items.push({ msg: 'product: ' + item.name + ' does not have enough stock' })
        }
      })
      await Promise.all(promise)
      if (items.length > 0) {
        return res.status(400).json(items)
      }
      const { clientId } = req.body
      console.log(clientId)
      const newOrder = await Order.create({ clientId })
      console.log(newOrder)
      products.forEach(async (element) => {
        await OrderDetail.create({ ProductId: element.productId, OrderId: newOrder.id, quantity: element.quantity })
        const { stock } = await Product.findOne({ where: { id: element.productId } })
        const newstock = stock - element.quantity
        await Product.update({ stock: newstock }, { where: { id: element.productId } })
      })

      return res.status(201).json({ newOrder, products })
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
}
