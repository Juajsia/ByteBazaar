import { readFile } from 'node:fs/promises'
import { sequelize } from '../connection.js'

export async function sqlInserts () {
  await sequelize.query(await readFile('backend/src/database/dataInsertion/OrdersInsertion.sql', 'utf-8'))
  await sequelize.query(await readFile('backend/src/database/dataInsertion/OrderDetailsInsertion.sql', 'utf-8'))
  await sequelize.query(await readFile('backend/src/database/dataInsertion/ViewsCreation.sql', 'utf-8'))
  await sequelize.query(await readFile('backend/src/database/dataInsertion/ProceduresCreation.sql', 'utf-8'))
  await sequelize.query(await readFile('backend/src/database/dataInsertion/FunctionsCreation.sql', 'utf-8'))
  await sequelize.query(await readFile('backend/src/database/dataInsertion/ReviewsInsertion.sql', 'utf-8'))
}

sqlInserts()
