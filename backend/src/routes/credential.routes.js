import { Router } from 'express'

import { Credentialcontroller } from '../controllers/credential.controller.js'
const credentialcontroller = new Credentialcontroller()
export const credentialRouters = Router()

credentialRouters.get('/api/credential', credentialcontroller.getAllCredentials)
// credentialRouters.post('/api/credential', credentialcontroller.createClient)
credentialRouters.get('/api/credential/:id', credentialcontroller.getCredential)
credentialRouters.put('/api/credential/:id', credentialcontroller.updateCredential)
credentialRouters.delete('/api/credential/:id', credentialcontroller.deleteCredential)

credentialRouters.post('/api/login', credentialcontroller.login)
