import { DataTypes } from 'sequelize'
import { sequelize } from '../database/connection.js'

export const Person = sequelize.define('Person', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    validate: {
      isNumeric: true
    }
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/i
    }
  },
  secondName: {
    type: DataTypes.STRING,
    validate: {
      is: /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]*$/i
    }
  },

  lastName1: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/i
    }
  },
  lastName2: {
    type: DataTypes.STRING,
    validate: {
      is: /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/i
    }
  }
})
