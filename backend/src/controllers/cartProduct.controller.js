import { sequelize } from '../database/connection.js'
import { CartProduct } from '../models/cartProduct.model.js'
import { Product } from '../models/product.model.js'

export class CartProductController {
  getAllCartProduct = async (req, res) => {
    try {
      const cartProduct = await CartProduct.findAll()
      res.json(cartProduct)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  createCartProduct = async (req, res) => {
    try {
      const { CartId, ProductId } = req.body
      const cartProduct = await CartProduct.findOne({ where: { CartId, ProductId } })
      if (!cartProduct) {
        const newCartProduct = await CartProduct.create(req.body)
        return res.status(201).json(newCartProduct)
      }
      return res.status(400).json({ msg: 'Product already added to cart' })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  getCartProduct = async (req, res) => {
    try {
      const { CartId, ProductId } = req.params
      const cartProduct = await CartProduct.findOne({ where: { CartId, ProductId } })
      if (cartProduct) {
        res.json(cartProduct)
      } else {
        res.status(404).json({ err: 'CartProduct not found' })
      }
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  deleteCartProduct = async (req, res) => {
    try {
      const { CartId, ProductId } = req.params
      await CartProduct.destroy({ where: { CartId, ProductId } })
      res.json({ msg: 'Cart Item deleted' })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  clearCartProduct = async (req, res) => {
    try {
      const { CartId } = req.params
      await CartProduct.destroy({ where: { CartId } })
      res.json({ msg: 'Cart now is clear' })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  updateCartProduct = async (req, res) => {
    try {
      const { CartId, ProductId } = req.params
      const cartProduct = await CartProduct.findOne({ where: { CartId, ProductId } })
      if (!cartProduct) {
        return res.status(404).json({ err: 'Cart Item does not exist' })
      }
      cartProduct.set(req.body)
      await cartProduct.save()
      res.status(202).json(cartProduct)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  getBestSellers = async (req, res) => {
    try {
      const query = `SELECT count(od."ProductId") OrdersNum, od."ProductId", p."name", p."description", p.image, p.price, p.provider, p.specs, p.status, p.stock
      FROM public."OrderDetails" od
      Inner join "Products" p 
      on od."ProductId" = p.id
      Group by od."ProductId", p."name", p."description", p.image, p.price, p.provider, p.specs, p.status, p.stock
      Order by OrdersNUm desc;`
      const bestSellers = await sequelize.query(query, { model: Product, mapToModel: true })
      if (bestSellers) {
        res.json(bestSellers)
      } else {
        res.status(404).json({ err: 'Best sellers query did not retrieve any record' })
      }
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
}
