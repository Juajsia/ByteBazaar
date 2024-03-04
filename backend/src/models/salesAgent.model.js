import { DataTypes } from 'sequelize'
import { sequelize } from '../database/connection.js'
import { Person } from './person.model.js'

export const SalesAgent = sequelize.define('SalesAgent', {
  personId: {
    type: DataTypes.BIGINT,
    primaryKey: true
  }
})

Person.hasOne(SalesAgent, {
  foreignKey: 'personId',
  sourceKey: 'id'
})

SalesAgent.belongsTo(Person, {
  foreignKey: 'personId',
  targetKey: 'id'
})
