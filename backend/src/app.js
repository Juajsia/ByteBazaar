import express from 'express'

import { clientRouters } from './routes/client.routes.js'

const app = express()
app.use(express.json())

app.use(clientRouters)
export default app
