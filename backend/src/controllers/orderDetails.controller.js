import { sequelize } from '../database/connection.js'
import { OrderDetail } from '../models/orderDetails.model.js'
import { Product } from '../models/product.model.js'

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
        const neworderDetails = await OrderDetail.create(req.body)
        return res.status(201).json(neworderDetails)
      }
      return res.status(400).json({ msg: 'ProductCategory already exists' })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  getOrderDetails = async (req, res) => {
    try {
      const { ProductId, OrderId } = req.params
      const orderdetails = await OrderDetail.findOne({
        where: {
          ProductId, OrderId
        }
      })
      if (orderdetails) {
        res.json(orderdetails)
      } else {
        res.status(404).json({ err: 'order Detail not found' })
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
        res.json({ msg: 'order detail deleted' })
      } else {
        res.status(404).json({ err: 'order detail not found' })
      }
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  getBestSellers = async (req, res) => {
    try {
      let limit = ''
      const { top } = req.query
      if (top === 'y') {
        limit = 'limit 6'
      }
      const query = `SELECT ordersnum, "ProductId", name, description, image, price, provider, specs, status, stock
      FROM public."BestSellers" 
      ${limit};`
      const bestSellers = await sequelize.query(query, { model: Product, mapToModel: true })
      if (bestSellers) {
        res.status(200).json(bestSellers)
      } else {
        res.status(404).json({ err: 'Best sellers query did not retrieve any record' })
      }
    } catch (error) {
      return res.status(500).json({ message: error.message, error })
    }
  }
}
