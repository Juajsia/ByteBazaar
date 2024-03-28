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
    allowNull: false,
    unique: true,
    validate: {
      is: /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/i
    }
  },
  stock: {
    type: DataTypes.INTEGER,
    validate: {
      isInt: true,
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
    allowNull: false,
    defaultValue: true,
    validate: {
      isBoolean: function (val) {
        return (typeof (val) === 'boolean')
      }
    }
  },
  provider: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/i
    }
  }
})
