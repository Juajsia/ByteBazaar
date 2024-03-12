import { Cart } from '../models/cart.model.js'
import { Product } from '../models/product.model.js'

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
        return res.status(404).json({ err: 'Product does not exist' })
      }
      cart.set(req.body)
      await cart.save()
      res.status(202).json(cart)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
}
