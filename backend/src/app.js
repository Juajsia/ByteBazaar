import express from 'express'
import 'dotenv/config'

import { clientRouters } from './routes/client.routes.js'
import { productRouters } from './routes/product.routes.js'
import { categoryRouters } from './routes/category.routes.js'
import { productCategoryRouters } from './routes/productCategory.routes.js'
import { credentialRouters } from './routes/credential.routes.js'

const app = express()
app.use(express.json())

app.use(clientRouters)
app.use(productRouters)
app.use(categoryRouters)
app.use(productCategoryRouters)
app.use(credentialRouters)
export default app
