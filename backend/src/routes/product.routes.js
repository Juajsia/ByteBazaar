import { Router } from 'express'

import { ProductController } from '../controllers/product.controller.js'
const productController = new ProductController()
export const productRouters = Router()

productRouters.get('/api/product', productController.getAllProducts)
productRouters.post('/api/product', productController.createProduct)
productRouters.get('/api/product/:name', productController.getProduct)
productRouters.put('/api/product/:id', productController.updateProduct)
productRouters.delete('/api/product/:name', productController.deleteProduct)
