import { OrderDetail } from '../models/orderDetails.model.js'

export class OrderDetailController {
  getAllOrderDetails = async (req, res) => {
    try {
      const orderdetails = await OrderDetail.findAll({})
      res.json(orderdetails)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  createorderDetails = async (req, res) => {
    try {
      const { OrderId, ProductId } = req.body
      const orderDetails = await OrderDetail.findOne({ where: { OrderId, ProductId } })
      console.log(orderDetails)
      if (!orderDetails) {
        const newordenDetails = await OrderDetail.create(req.body)
        return res.status(201).json(newordenDetails)
      }
      return res.status(400).json({ msg: 'ProductCategory already exists' })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  getOrderDetails = async (req, res) => {
    try {
      const { ProductId, OrderId } = req.body
      const orderdetails = await OrderDetail.findOne({
        where: {
          ProductId, OrderId
        }
      })
      if (orderdetails) {
        res.json(orderdetails)
      } else {
        res.status(404).json({ err: 'order not found' })
      }
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  deleteOrderDetails = async (req, res) => {
    try {
      const { OrderId, ProductId } = await req.body
      const orderdetails = await OrderDetail.destroy({
        where: {
          OrderId, ProductId
        }
      })
      if (orderdetails) {
        res.json({ msg: 'order deleted' })
      } else {
        res.status(404).json({ err: 'order not found' })
      }
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
}
