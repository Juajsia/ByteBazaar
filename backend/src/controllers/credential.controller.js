import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { Credential } from '../models/Credential.model.js'
import { Person } from '../models/person.model.js'
import { Client } from '../models/client.model.js'
import { Administrator } from '../models/administrator.model.js'
import { SalesAgent } from '../models/salesAgent.model.js'
import { Cart } from '../models/cart.model.js'
import { Op } from 'sequelize'

export class Credentialcontroller {
  getAllCredentials = async (req, res) => {
    try {
      const cred = await Credential.findAll({
        include: Person
      })
      res.json(cred)
    } catch (error) {
      return res.status(500).json({ mesaage: error.message })
    }
  }

  createCredential = async ({ personId, email, password }) => {
    try {
      const cryptedPassword = await bcrypt.hash(password, 12)
      const newCred = await Credential.create({ personId, email, password: cryptedPassword })
      return newCred
    } catch (error) {
      return { message: error.message }
    }
  }

  getCredential = async (req, res) => {
    try {
      const { id } = req.params
      const cred = await Credential.findByPk(id)
      if (cred) {
        res.json(cred)
      } else {
        res.status(404).json({ err: 'Credential not found' })
      }
    } catch (error) {
      return res.status(500).json({ mesaage: error.message })
    }
  }

  deleteCredential = async (req, res) => {
    try {
      const { id } = req.params
      await Person.destroy({
        where: {
          id
        }
      })
      res.json({ msg: 'Credential deleted' })
    } catch (error) {
      return res.status(500).json({ mesaage: error.message })
    }
  }

  updateCredential = async (req, res) => {
    try {
      const { id } = req.params
      const { email, password } = req.body
      const cred = await Credential.findByPk(id)
      if (cred) {
        if (email) {
          cred.email = email
        }
        if (password) {
          cred.password = await bcrypt.hash(password, 12)
        }
        await cred.save()
        return res.status(202).json(cred)
      }
      return res.status(404).json({ err: 'Credential not found' })
    } catch (error) {
      return res.status(500).json({ mesaage: error.message })
    }
  }

  login = async (req, res) => {
    try {
      const { email, password } = req.body
      const cred = await Credential.findOne({
        where: {
          email: {
            [Op.iLike]: email
          }
        }
      })
      if (!cred) {
        return res.status(400).json({ err: 'email is not registered' })
      }

      const eq = await bcrypt.compare(password, cred.password)
      if (!eq) {
        return res.status(401).json({ err: 'password incorrect' })
      }
      const rol = await getRol({ id: cred.personId })
      const token = createToken({ data: { email: cred.email, rol } })
      const cart = await Cart.findOne({ where: { clientId: cred.personId } })
      let cartId = null
      if (cart) {
        cartId = cart.id
      }
      if (rol === 'client') {
        return res.json({ token, rol, cartId, cid: cred.personId })
      }
      return res.json({ token, rol, cartId })
    } catch (error) {
      return res.status(500).json({ mesaage: error.message })
    }
  }
}

async function getRol ({ id }) {
  const client = await Client.findByPk(id)
  if (client) {
    return 'client'
  }
  const admin = await Administrator.findByPk(id)
  if (admin) {
    return 'administrator'
  }
  const salesAgent = await SalesAgent.findByPk(id)
  if (salesAgent) {
    return 'salesAgent'
  }
}

function createToken ({ data }) {
  const payLoad = {
    email: data.email,
    rol: data.rol
  }
  return jwt.sign(payLoad, process.env.SECRET_KEY)
}
