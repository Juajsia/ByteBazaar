import { DataTypes } from 'sequelize'
import { sequelize } from '../database/connection.js'

export const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    validate: {
      isNumeric: true
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isAlphanumeric: true
    }
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isAlphanumeric: true
    }
  }
})
