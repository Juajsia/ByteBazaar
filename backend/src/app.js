import express from 'express'
import 'dotenv/config'

import { clientRouters } from './routes/client.routes.js'
import { credentialRouters } from './routes/credential.routes.js'

const app = express()
app.use(express.json())

app.use(clientRouters)
app.use(credentialRouters)
export default app
