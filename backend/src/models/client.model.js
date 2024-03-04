import { DataTypes } from 'sequelize'
import { sequelize } from '../database/connection.js'
import { Person } from './person.model.js'

export const Client = sequelize.define('Client', {
  personId: {
    type: DataTypes.BIGINT,
    primaryKey: true
  }
})

Person.hasOne(Client, {
  foreignKey: 'personId',
  sourceKey: 'id'
})

Client.belongsTo(Person, {
  foreignKey: 'personId',
  targetKey: 'id'
})
