import { sequelize } from '../database/connection.js'
import { Product } from './product.model.js'
import { Wishlist } from './wishlist.model.js'

export const WishlistProduct = sequelize.define('WishlistProduct', {})

Wishlist.belongsToMany(Product, {
  through: WishlistProduct
})

Product.belongsToMany(Wishlist, {
  through: WishlistProduct
})
