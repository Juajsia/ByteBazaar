import { DataTypes } from 'sequelize'
import { sequelize } from '../database/connection.js'
import { Client } from 'pg'

export const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
})

Order.hasOne(Client, {
  foreignKey: 'clientId',
  sourceKey: 'id'
})
