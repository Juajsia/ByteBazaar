import { DataTypes } from 'sequelize'
import { sequelize } from '../database/connection.js'

export const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0
    },
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      isFloat: true,
      min: 0
    }

  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  specs: {
    type: DataTypes.TEXT
  },
  image: {
    type: DataTypes.STRING,
    validate: {
      isUrl: true
    }
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  provider: {
    type: DataTypes.STRING,
    allowNull: false
  }
})
