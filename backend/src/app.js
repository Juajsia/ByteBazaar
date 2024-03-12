import express from 'express'
import 'dotenv/config'
import cors from 'cors'

import { clientRouters } from './routes/client.routes.js'
import { productRouters } from './routes/product.routes.js'
import { categoryRouters } from './routes/category.routes.js'
import { productCategoryRouters } from './routes/productCategory.routes.js'
import { credentialRouters } from './routes/credential.routes.js'
import { orderRouters } from './routes/order.routes.js'
import { orderDetailsRouter } from './routes/orderDetails.routes.js'
import { cartRouter } from './routes/cart.routes.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use(clientRouters)
app.use(productRouters)
app.use(categoryRouters)
app.use(productCategoryRouters)
app.use(credentialRouters)
app.use(orderRouters)
app.use(orderDetailsRouter)
app.use(cartRouter)

export default app
