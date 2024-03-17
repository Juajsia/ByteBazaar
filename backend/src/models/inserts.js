import bcrypt from 'bcrypt'

import { Administrator } from './administrator.model.js'
import { Person } from './person.model.js'
import { SalesAgent } from './salesAgent.model.js'
import { Credential } from './Credential.model.js'

export async function inserts () {
  const newAdmin = await Person.create({
    id: 12345,
    firstName: 'Byte',
    lastName1: 'Bazaar',
    lastName2: 'Admin'
  })

  await Administrator.create({ personId: newAdmin.id })
  const adminPassword = await bcrypt.hash('P@ssw0rd', 12)
  await Credential.create({
    personId: newAdmin.id,
    email: 'admin@bytebazaar.com',
    password: adminPassword
  })

  const newSalesAgent = await Person.create({
    id: 54321,
    firstName: 'Byte',
    secondName: 'Bazaar',
    lastName1: 'Sales',
    lastName2: 'Agent'
  })

  await SalesAgent.create({ personId: newSalesAgent.id })
  const salesAgentPassword = await bcrypt.hash('P@ssw0rd', 12)
  await Credential.create({
    personId: newSalesAgent.id,
    email: 'salesagent@bytebazaar.com',
    password: salesAgentPassword
  })
}
