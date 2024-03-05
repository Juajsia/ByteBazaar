import { DataTypes } from 'sequelize'
import { sequelize } from '../database/connection.js'
import { Client } from './client.model.js'

export const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
})

Client.hasMany(Order)

Order.belongsTo(Client)
