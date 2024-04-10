import { Router } from 'express'

import { CategoryController } from '../controllers/category.controller.js'
import { validateRolToken, validateToken } from '../middleware/validateToken.js'

const categoryController = new CategoryController()
export const categoryRouters = Router()

categoryRouters.get('/api/category', categoryController.getAllCategories)
categoryRouters.post('/api/category', validateToken, validateRolToken(['administrator']), categoryController.createCategory)
categoryRouters.get('/api/category/:id', categoryController.getCategory)
categoryRouters.put('/api/category/:id', validateToken, validateRolToken(['administrator']), categoryController.updateCategory)
categoryRouters.delete('/api/category/:id', validateToken, validateRolToken(['administrator']), categoryController.deleteCategory)
categoryRouters.get('/api/category/byName/:name', categoryController.getCategoryByName)
