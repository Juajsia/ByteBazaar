import app from './app.js'
import { sequelize } from './database/connection.js'
import './models/imports.models.js'
// eslint-disable-next-line no-unused-vars
import { inserts } from './models/inserts.js'

try {
  // await sequelize.sync({ force: true })
  // await inserts()

  await sequelize.authenticate()
  console.log('Connection has been established successfully')
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log(`app running in port ${PORT}`)
  })
} catch (error) {
  console.error('Error con// necting to the database', error)
}
