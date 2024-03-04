import { DataTypes } from 'sequelize'
import { sequelize } from '../database/connection.js'
import { Person } from './person.model.js'

export const Administrator = sequelize.define('Administrator', {
  personId: {
    type: DataTypes.BIGINT,
    primaryKey: true
  }
})

Person.hasOne(Administrator, {
  foreignKey: 'personId',
  sourceKey: 'id'
})

Administrator.belongsTo(Person, {
  foreignKey: 'personId',
  targetKey: 'id'
})
