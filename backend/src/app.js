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
import { cartProductRouter } from './routes/cartProduct.routes.js'
import { wishlistRouter } from './routes/wishlist.routes.js'
import { wishlistProductRouter } from './routes/wishlistProduct.routes.js'
import { reportsRouter } from './routes/reports.routes.js'
import { reviewRouter } from './routes/review.routes.js'
import { router } from './routes/uploadImagen.routes.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

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
app.use(cartProductRouter)
app.use(wishlistRouter)
app.use(wishlistProductRouter)
app.use(reportsRouter)
app.use(reviewRouter)
app.use(router)

export default app
