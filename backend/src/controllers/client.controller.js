import { Client } from '../models/client.model.js'
import { Person } from '../models/person.model.js'
import { Credentialcontroller } from './credential.controller.js'
import { Cart } from '../models/cart.model.js'
import { Credential } from '../models/Credential.model.js'

export class ClientController {
  getAllClients = async (req, res) => {
    try {
      const clients = await Client.findAll({
        include: Person
      })
      res.json(clients)
    } catch (error) {
      return res.status(500).json({ mesaage: error.message })
    }
  }

  createClient = async (req, res) => {
    try {
      const { id, firstName, secondName, lastName1, lastName2, email, password } = req.body
      const doc = id
      const person = await Person.findByPk(doc)
      const cred = await Credential.findOne({ where: { email } })
      if (!person && !cred) {
        const newPerson = await Person.create({
          id: doc,
          firstName,
          secondName,
          lastName1,
          lastName2
        })
        const credentialcontroller = new Credentialcontroller()
        const newCred = await credentialcontroller.createCredential({ personId: doc, email, password })
        let newCart
        if (newCred.message) {
          await Person.destroy({ where: { id: doc } })
        } else {
          await Client.create({ personId: doc })
          newCart = await Cart.create({ clientId: doc })
        }
        return res.status(201).json({ newPerson, newCred, newCart })
      }
      return res.status(400).json({ message: 'Account already exists', text: 'Go to Login page to access with this account', forUser: true })
    } catch (error) {
      return res.status(500).json({ message: error.message, forUser: false })
    }
  }

  getClient = async (req, res) => {
    try {
      const { id } = req.params
      const client = await Person.findByPk(id)
      if (client) {
        res.json(client)
      } else {
        res.status(404).json({ err: 'client not found' })
      }
    } catch (error) {
      return res.status(500).json({ mesaage: error.message })
    }
  }

  checkIdExistence = async (req, res) => {
    try {
      const { id } = req.params
      const client = await Client.findByPk(id)
      if (client) {
        res.json({ id })
      } else {
        res.json({ id: null })
      }
    } catch (error) {
      return res.status(500).json({ mesaage: error.message })
    }
  }

  deleteClient = async (req, res) => {
    try {
      const { id } = req.params
      await Person.destroy({
        where: {
          id
        }
      })
      res.json({ msg: 'Client deleted' })
    } catch (error) {
      return res.status(500).json({ mesaage: error.message })
    }
  }

  updateClient = async (req, res) => {
    try {
      const { id } = req.params
      const client = await Person.findByPk(id)
      client.set(req.body)
      await client.save()
      res.status(202).json(client)
    } catch (error) {
      return res.status(500).json({ mesaage: error.message })
    }
  }
}
