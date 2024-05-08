import { Router } from 'express'

import { ClientController } from '../controllers/client.controller.js'
import { validateRolToken, validateToken } from '../middleware/validateToken.js'

const clientController = new ClientController()
export const clientRouters = Router()

clientRouters.get('/api/client', clientController.getAllClients)
clientRouters.post('/api/client', clientController.createClient)
clientRouters.get('/api/client/:id', clientController.getClient)
clientRouters.put('/api/client/:id', clientController.updateClient)
clientRouters.delete('/api/client/:id', validateToken, validateRolToken(['administrator']), clientController.deleteClient)
clientRouters.get('/api/client/check/:id', clientController.checkIdExistence)
