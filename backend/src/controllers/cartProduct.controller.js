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
      if (!cartProduct) {
        const newCartProduct = await CartProduct.create(req.body)
        return res.status(201).json(newCartProduct)
      }
      return res.status(400).json({ message: 'This product is already added to your cart', text: 'go to your cart to see your added products', forUser: true })
    } catch (error) {
      return res.status(500).json({ message: error.message, forUser: false })
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
      const cartProduct = await CartProduct.destroy({ where: { CartId, ProductId } })
      if (cartProduct) {
        return res.status(200).json({ message: 'Cart Item deleted' })
      }
      return res.status(404).json({ message: 'Error deleting cart item', text: 'The item you are trying to delete does not exists in your cart', forUser: true })
    } catch (error) {
      return res.status(500).json({ message: error.message, forUser: false })
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
        return res.status(404).json({ message: 'Error updating cart item', text: 'The item you are trying to update does not exists in your cart', forUser: true })
      }
      cartProduct.set(req.body)
      await cartProduct.save()
      res.status(202).json(cartProduct)
    } catch (error) {
      return res.status(500).json({ message: error.message, forUser: false })
    }
  }
}
