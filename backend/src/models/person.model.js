import { DataTypes } from 'sequelize'
import { sequelize } from '../database/connection.js'

export const Person = sequelize.define('Person', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING,
    validate: {
      isAlpha: true
    },
    allowNull: false
  },
  secondName: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isAlpha: true
    }
  },

  lastName1: {
    type: DataTypes.STRING,
    validate: {
      isAlpha: true
    },
    allowNull: false
  },
  lastName2: {
    type: DataTypes.STRING,
    validate: {
      isAlpha: true
    },
    allowNull: false
  }
})
