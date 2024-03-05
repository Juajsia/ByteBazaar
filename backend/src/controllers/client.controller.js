import { Client } from '../models/client.model.js'
import { Person } from '../models/person.model.js'

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
      const { id, firstName, secondName, lastName1, lastName2 } = req.body
      const person = await Person.findByPk(id)
      if (!person) {
        const newPerson = await Person.create({
          id,
          firstName,
          secondName,
          lastName1,
          lastName2
        })
        await Client.create({ personId: id })
        return res.status(201).json(newPerson)
      }
      return res.status(400).json({ msg: 'Client already exists' })
    } catch (error) {
      return res.status(500).json({ mesaage: error.message })
    }
  }

  getClient = async (req, res) => {
    try {
      const { id } = req.params
      const client = await Client.findByPk(id)
      if (client) {
        res.json(client)
      } else {
        res.status(404).json({ err: 'client not found' })
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
