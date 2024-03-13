import { DataTypes } from 'sequelize'
import { sequelize } from '../database/connection.js'
import { Product } from './product.model.js'
import { Cart } from './cart.model.js'

export const CartProduct = sequelize.define('CartProduct', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      isInt: true,
      min: 1
    }
  }
})

Cart.belongsToMany(Product, {
  through: CartProduct
})

Product.belongsToMany(Cart, {
  through: CartProduct
})
