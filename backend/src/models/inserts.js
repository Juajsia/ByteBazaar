import bcrypt from 'bcrypt'

import { Administrator } from './administrator.model.js'
import { Person } from './person.model.js'
import { SalesAgent } from './salesAgent.model.js'
import { Credential } from './Credential.model.js'
import { Client } from './client.model.js'
import { Cart } from './cart.model.js'
import { Category } from './category.model.js'

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

  let clientsIds = newClients.map(client => {
    const { id } = client
    return { personId: id }
  })
  await Client.bulkCreate(clientsIds)

  clientsIds = clientsIds.map(client => {
    const { personId } = client
    return { clientId: personId }
  })
  await Cart.bulkCreate(clientsIds)

  const categories = [
    {
      name: 'Productivity',
      description: 'take your productivity to the maximum with these applications'
    },
    {
      name: 'Entertainment',
      description: 'your movies, TV and music, whenever and wherever you want'
    },
    {
      name: 'Personalization',
      description: 'Create things your way, don\'t let anyone stop you'
    },
    {
      name: 'Healthy',
      description: 'take care of your health with these wonderful applications'
    },
    {
      name: 'Education',
      description: 'Let you be the limit, don\'t stop learning with these applications'
    },
    {
      name: 'Time Management',
      description: 'Don\'t let your time run out! install now'
    }
  ]

  await Category.bulkCreate(categories)
}
