import { CartProduct } from '../models/cartProduct.model.js'

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
      console.log(cartProduct)
      if (!cartProduct) {
        const newCartProduct = await CartProduct.create(req.body)
        return res.status(201).json(newCartProduct)
      }
      return res.status(400).json({ msg: 'CartProduct already exists' })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  getCartProduct = async (req, res) => {
    try {
      const { CartId, ProductId } = req.body
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
      const { CartId, ProductId } = req.body
      await CartProduct.destroy({ where: { CartId, ProductId } })
      res.json({ msg: 'CartProduct deleted' })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
}
