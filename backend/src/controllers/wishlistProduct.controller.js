import { WishlistProduct } from '../models/wishlistProduct.model.js'

export class WishlistProductController {
  getAllWishlistProduct = async (req, res) => {
    try {
      const wishlistProduct = await WishlistProduct.findAll()
      res.json(wishlistProduct)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  createWishlistProduct = async (req, res) => {
    try {
      const { WishlistId, ProductId } = req.body
      const wishlistProduct = await WishlistProduct.findOne({ where: { WishlistId, ProductId } })
      if (!wishlistProduct) {
        const newWishlistProduct = await WishlistProduct.create(req.body)
        return res.status(201).json(newWishlistProduct)
      }
      return res.status(400).json({ message: 'This product is already added to your wishlist', text: 'go to your wishlist to see your added products', forUser: true })
    } catch (error) {
      return res.status(500).json({ message: error.message, forUser: false })
    }
  }

  getWishlistProduct = async (req, res) => {
    try {
      const { WishlistId, ProductId } = req.params
      const wishlistProduct = await WishlistProduct.findOne({ where: { WishlistId, ProductId } })
      if (wishlistProduct) {
        res.json(wishlistProduct)
      } else {
        res.status(404).json({ err: 'WishlistProduct record not found' })
      }
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  deleteWishlistProduct = async (req, res) => {
    try {
      const { WishlistId, ProductId } = req.params
      const wishlistProduct = await WishlistProduct.destroy({ where: { WishlistId, ProductId } })
      if (wishlistProduct) {
        return res.status(200).json({ message: 'Wishlist Item deleted' })
      }
      return res.status(404).json({ message: 'Error deleting wishlist item', text: 'The item you are trying to delete does not exists in your wishlist', forUser: true })
    } catch (error) {
      return res.status(500).json({ message: error.message, forUser: false })
    }
  }

  checkWishlistProductExistence = async (req, res) => {
    try {
      const { WishlistId, ProductId } = req.params
      const wishlistProduct = await WishlistProduct.findOne({ where: { WishlistId, ProductId } })
      if (wishlistProduct) {
        res.json(wishlistProduct)
      } else {
        res.status(200).json({ message: 'WishlistProduct record not found' })
      }
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
}
