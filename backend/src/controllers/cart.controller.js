import { Cart } from '../models/cart.model.js'
import { Product } from '../models/product.model.js'
import { CartProduct } from '../models/cartProduct.model.js'

export class CartController {
  getAllcart = async (req, res) => {
    try {
      const cart = await Cart.findAll({
        include: {
          model: Product
        }
      })
      res.json(cart)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  createCart = async (req, res) => {
    try {
      const { clientId } = req.body
      const cart = await Cart.findOne({ where: { clientId } })
      if (!cart) {
        const newCart = await Cart.create({
          clientId
        })
        return res.status(201).json({ newCart })
      }
      return res.status(400).json({ msg: 'Cart already exists' })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  getCart = async (req, res) => {
    try {
      const { id } = req.params
      const cart = await Cart.findByPk(id)
      if (cart) {
        res.json(cart)
      } else {
        res.status(404).json({ err: 'product not found' })
      }
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  deleteCart = async (req, res) => {
    try {
      const { id } = req.params
      await Cart.destroy({
        where: {
          id
        }
      })
      res.json({ msg: 'cart deleted' })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  updateCart = async (req, res) => {
    try {
      const { id } = req.params
      const cart = await Cart.findByPk(id)
      if (!cart) {
        return res.status(404).json({ err: 'cart does not exist' })
      }
      cart.set(req.body)
      await cart.save()
      res.status(202).json(cart)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
}
