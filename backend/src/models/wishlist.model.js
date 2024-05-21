import { sequelize } from '../database/connection.js'
import { Client } from './client.model.js'

export const Wishlist = sequelize.define('Wishlist', {})

Client.hasOne(Wishlist, {
  foreignKey: 'clientId',
  sourceKey: 'personId'
})

Wishlist.belongsTo(Client, {
  foreignKey: 'clientId',
  targetKey: 'personId'
})
