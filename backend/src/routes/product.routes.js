import { Router } from 'express'

import { ProductController } from '../controllers/product.controller.js'
import { validateRolToken, validateToken } from '../middleware/validateToken.js'

const productController = new ProductController()
export const productRouters = Router()

productRouters.get('/api/product', productController.getAllProducts)
productRouters.post('/api/product', validateToken, validateRolToken(['administrator']), productController.createProduct)
productRouters.get('/api/product/:name', productController.getProduct)
productRouters.put('/api/product/:id', validateToken, validateRolToken(['administrator']), productController.updateProduct)
productRouters.delete('/api/product/:id', validateToken, validateRolToken(['administrator']), productController.deleteProduct)
productRouters.delete('/api/product/desable/:name', validateToken, validateRolToken(['administrator']), productController.desableProduct)
productRouters.put('/api/product/enable/:name', validateToken, validateRolToken(['administrator']), productController.enableProduct)
