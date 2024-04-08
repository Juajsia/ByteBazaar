import { sequelize } from './database/connection.js'
import './models/imports.models.js'
import { inserts } from './models/inserts.js'

try {
  await sequelize.sync({ force: true })
  await inserts()
} catch (error) {
  console.error('Error connecting to the database', error)
}
