import { Wishlist } from '../models/wishlist.model.js'
import { Product } from '../models/product.model.js'

export class WishlistController {
  getAllWishlist = async (req, res) => {
    try {
      const wishlist = await Wishlist.findAll({
        include: {
          model: Product
        }
      })
      res.json(wishlist)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  createWishlist = async (req, res) => {
    try {
      const { clientId } = req.body
      const wishlist = await Wishlist.findOne({ where: { clientId } })
      if (!wishlist) {
        const newWishlist = await Wishlist.create({
          clientId
        })
        return res.status(201).json({ newWishlist })
      }
      return res.status(400).json({ msg: 'Wishlist already exists' })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  getWishlist = async (req, res) => {
    try {
      const { id } = req.params
      const wishlist = await Wishlist.findByPk(id, {
        include: {
          model: Product
        }
      })
      if (wishlist) {
        res.json(wishlist)
      } else {
        res.status(404).json({ err: 'Wishlist not found' })
      }
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  deleteWishlist = async (req, res) => {
    try {
      const { id } = req.params
      await Wishlist.destroy({
        where: {
          id
        }
      })
      res.json({ msg: 'wishlist deleted' })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  updateWishlist = async (req, res) => {
    try {
      const { id } = req.params
      const wishlist = await Wishlist.findByPk(id)
      if (!wishlist) {
        return res.status(404).json({ err: 'wishlist does not exist' })
      }
      wishlist.set(req.body)
      await wishlist.save()
      res.status(202).json(wishlist)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
}
