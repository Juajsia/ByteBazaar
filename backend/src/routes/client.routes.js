import { Router } from 'express'

import { ClientController } from '../controllers/client.controller.js'
const clientController = new ClientController()
export const clientRouters = Router()

clientRouters.get('/api/client', clientController.getAllClients)
clientRouters.post('/api/client', clientController.createClient)
clientRouters.get('/api/client/:id', clientController.getClient)
clientRouters.put('/api/client/:id', clientController.updateClient)
clientRouters.delete('/api/client/:id', clientController.deleteClient)
