import { Router } from 'express'

import { CategoryController } from '../controllers/category.controller.js'
const categoryController = new CategoryController()
export const categoryRouters = Router()

categoryRouters.get('/api/category', categoryController.getAllCategories)
categoryRouters.post('/api/category', categoryController.createCategory)
categoryRouters.get('/api/category/:id', categoryController.getCategory)
categoryRouters.put('/api/category/:id', categoryController.updateCategory)
categoryRouters.delete('/api/category/:id', categoryController.deleteCategory)
categoryRouters.get('/api/category/byName/:name', categoryController.getCategoryByName)
