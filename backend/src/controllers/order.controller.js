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
      const { Products } = req.body
      const items = []
      const promise = Products.map(async (element) => {
        const item = await Product.findByPk(element.id)
        const quantity = element.CartProduct ? element.CartProduct.quantity : element.quantity
        if (item.stock < quantity) {
          items.push({ msg: 'Product: ' + item.name + ' does not have enough stock' })
        }
      })
      await Promise.all(promise)
      if (items.length > 0) {
        return res.status(400).json({ message: 'Order declined', text: items.pop() + ', This product does not have the requested quantity ', forUser: true })
      }
      const { clientId } = req.body
      const newOrder = await Order.create({ clientId })
      Products.forEach(async (element) => {
        const quantity = element.CartProduct ? element.CartProduct.quantity : element.quantity
        await OrderDetail.create({ ProductId: element.id, OrderId: newOrder.id, quantity })
        const { stock } = await Product.findOne({ where: { id: element.id } })
        const newstock = stock - quantity
        await Product.update({ stock: newstock }, { where: { id: element.id } })
      })

      return res.status(201).json({ newOrder, Products })
    } catch (error) {
      return res.status(500).json({ message: error.message, forUser: false })
    }
  }

  getOrder = async (req, res) => {
    try {
      const { id } = req.params
      const order = await Order.findByPk(id, {
        include: Product
      })
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
