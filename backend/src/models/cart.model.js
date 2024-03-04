import { DataTypes } from 'sequelize'
import { sequelize } from '../database/connection.js'
import { Client } from './client.model.js'

export const Cart = sequelize.define('Cart', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
})

Client.hasOne(Cart, {
  foreignKey: 'clientId',
  sourceKey: 'personId'
})

Cart.belongsTo(Client, {
  foreignKey: 'clientId',
  targetKey: 'personId'
})
