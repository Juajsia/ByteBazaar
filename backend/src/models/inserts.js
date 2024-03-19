import bcrypt from 'bcrypt'

import { Administrator } from './administrator.model.js'
import { Person } from './person.model.js'
import { SalesAgent } from './salesAgent.model.js'
import { Credential } from './Credential.model.js'
import { Client } from './client.model.js'

export async function inserts () {
  const newAdmin = {
    id: 12345,
    firstName: 'Byte',
    lastName1: 'Bazaar',
    lastName2: 'Admin'
  }

  const newSalesAgent = {
    id: 54321,
    firstName: 'Byte',
    secondName: 'Bazaar',
    lastName1: 'Sales',
    lastName2: 'Agent'
  }

  const newClients = [{
    id: 11111,
    firstName: 'Isac',
    lastName1: 'Cortes',
    lastName2: 'Buitrago'
  }, {
    id: 22222,
    firstName: 'Juan',
    secondName: 'Pablo',
    lastName1: 'Adams',
    lastName2: 'Parra'
  }, {
    id: 33333,
    firstName: 'Juan',
    secondName: 'José',
    lastName1: 'Estrada',
    lastName2: 'Vélez'
  }]

  const password = await bcrypt.hash('P@ssw0rd', 12)
  const newCredentials = [{
    personId: newAdmin.id,
    email: 'admin@bytebazaar.com',
    password
  }, {
    personId: newSalesAgent.id,
    email: 'salesagent@bytebazaar.com',
    password
  }, {
    personId: newClients[0].id,
    email: 'isacortes@bytebazaar.com',
    password
  }, {
    personId: newClients[1].id,
    email: 'Juanadams@bytebazaar.com',
    password
  }, {
    personId: newClients[2].id,
    email: 'juan@bytebazaar.com',
    password
  }]

  const newPeople = [...newClients]
  newPeople.push(newAdmin, newSalesAgent)

  await Person.bulkCreate(newPeople)
  await Credential.bulkCreate(newCredentials)

  await Administrator.create({ personId: newAdmin.id })

  await SalesAgent.create({ personId: newSalesAgent.id })

  const clientsIds = newClients.map(client => {
    const { id } = client
    return { personId: id }
  })

  console.log(clientsIds)
  await Client.bulkCreate(clientsIds)
}
