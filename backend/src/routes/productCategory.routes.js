import { Router } from 'express'

import { ProductCategoryController } from '../controllers/productCategory.controller.js'
const productCategoryController = new ProductCategoryController()
export const productCategoryRouters = Router()

productCategoryRouters.get('/api/productCategory', productCategoryController.getAllProductCategories)
productCategoryRouters.post('/api/productCategory', productCategoryController.createProductCategory)
productCategoryRouters.get('/api/productCategory/:id', productCategoryController.getProductCategory)
productCategoryRouters.delete('/api/productCategory', productCategoryController.deleteProductCategory)
