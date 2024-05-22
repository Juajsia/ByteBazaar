import { Router } from 'express'

import { validateRolToken, validateToken } from '../middleware/validateToken.js'
import { ReportsController } from '../controllers/reports.controller.js'

const reportsController = new ReportsController()
export const reportsRouter = Router()

reportsRouter.get('/api/reports/sales/:timeLapse', validateToken, validateRolToken(['administrator']), reportsController.getSales)
reportsRouter.get('/api/reports/bestSellers', validateToken, validateRolToken(['administrator']), reportsController.getBestSellers)
reportsRouter.get('/api/reports/categories', validateToken, validateRolToken(['administrator']), reportsController.getNumProductsByCategory)
reportsRouter.get('/api/reports/registeredUsers', validateToken, validateRolToken(['administrator']), reportsController.getRegisteredUsers)
