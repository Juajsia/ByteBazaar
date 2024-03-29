import bcrypt from 'bcrypt'

import { Administrator } from './administrator.model.js'
import { Person } from './person.model.js'
import { SalesAgent } from './salesAgent.model.js'
import { Credential } from './Credential.model.js'
import { Client } from './client.model.js'
import { Cart } from './cart.model.js'
import { Category } from './category.model.js'
import { ProductController } from '../controllers/product.controller.js'

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
      name: 'Computer',
      description: 'Desktop applications'
    },
    {
      name: 'Smartphone',
      description: 'Mobile applications'
    },
    {
      name: 'Tablet',
      description: 'Apps supported on tablet'
    },
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
      name: 'Health',
      description: 'take care of your health with these wonderful applications'
    },
    {
      name: 'Education',
      description: 'Let you be the limit, don\'t stop learning with these applications'
    },
    {
      name: 'Time Management',
      description: 'Don\'t let your time run out! install now'
    },
    {
      name: 'Design',
      description: 'install and shape your ideas'
    }
  ]

  await Category.bulkCreate(categories)

  const products = [
    {
      name: 'Microsoft Office',
      stock: 6,
      price: 119.99,
      description: 'Microsoft Office is a suite of applications designed to help with productivity and completing common tasks on a computer. You can create and edit documents containing text and images, work with data in spreadsheets and databases, and create presentations and posters.',
      specs: '- Applications:\n\tMicrosoft Office typically includes several applications, such as:\n\t- Microsoft Word: A word processing program used for creating documents.\n\t- Microsoft Excel: A spreadsheet program for organizing, analyzing, and visualizing data.\n\t- Microsoft PowerPoint: A presentation program for creating slideshows.\n\t- Microsoft Outlook: An email client and personal information manager.\n\t- Microsoft Access: A database management system.\n\t- Microsoft OneNote: A note- taking application.\n\t- Microsoft Publisher: A desktop publishing program.\n\t- Microsoft Teams: Collaboration software for teams, including chat, video meetings, and file sharing.\n\t- Microsoft OneDrive: Cloud storage service for storing and sharing files.\n- Compatibility:\n\tMicrosoft Office is compatible with various operating systems, including Windows, macOS, iOS, and Android.\n- Integration:\n\tMicrosoft Office applications often integrate with each other, allowing users to easily transfer data and content between different programs. For example, you can embed an Excel spreadsheet in a Word document or import data from Outlook into Excel.\n- Cloud Integration:\n\tMicrosoft Office offers cloud integration through services like OneDrive and SharePoint, allowing users to access their files and collaborate with others from any device with an internet connection.\n- Customization:\n\tUsers can often customize the appearance and functionality of Microsoft Office applications to suit their preferences and workflow.',
      image: 'https://seeklogo.com/images/M/microsoft-office-logo-8B0EF31E09-seeklogo.com.png',
      status: true,
      provider: 'Microsoft',
      categories: [
        'Computer',
        'Smartphone',
        'Tablet',
        'Productivity',
        'Time Management',
        'Personalization'
      ]
    },
    {
      name: 'Adobe Photoshop',
      stock: 10,
      price: 69.99,
      description: 'With Adobe Photoshop you can design, create, and edit photos as your imagination commands.',
      specs: 'wwwwwwwwwwwww: fvjohdg\n\n-jjjjjjjjjjjjj: odfvhidfb\n\n-ttttttttt: ofhvijv',
      image: 'https://w7.pngwing.com/pngs/301/722/png-transparent-adobe-logo-logos-photoshop-logos-and-brands-icon-thumbnail.png',
      status: true,
      provider: 'Adobe',
      categories: [
        'Computer',
        'Design',
        'Personalization'
      ]
    }
  ]

  const productController = new ProductController()
  products.forEach(prod => {
    productController.createProduct({ body: prod }, {
      status (code) {
        console.log('Status:', code)
        return this
      },
      json (data) {
        console.log('Response:', data)
      }
    })
  })
}
