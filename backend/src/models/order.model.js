import { DataTypes } from 'sequelize'
import { sequelize } from '../database/connection.js'
import { Client } from './client.model.js'

export const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  total: {
    type: DataTypes.FLOAT
  },
  isReturned: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    validate: {
      isBoolean: function (val) {
        return (typeof (val) === 'boolean')
      }
    }
  }
})

Client.hasMany(Order, {
  foreignKey: 'clientId',
  sourceKey: 'personId'
})

Order.belongsTo(Client, {
  foreignKey: 'clientId',
  targetKey: 'personId'
})
