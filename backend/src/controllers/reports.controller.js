import { sequelize } from '../database/connection.js'

export class ReportsController {
  getSales = async (req, res) => {
    try {
      const { timeLapse } = req.params
      const filteredOrders = await sequelize.query(`SELECT name, value FROM public."${timeLapse}Orders";`)
      if (filteredOrders) {
        const salesData = [{
          name: 'Sales',
          series: filteredOrders[0]
        }]
        const additionalSalesData = await this.getAditionalSalesData(this.getInterval(timeLapse))
        return res.status(200).json({ salesData, additionalSalesData })
      }
      return res.status(404).json({ message: 'cannot get monthly orders', forUser: false })
    } catch (error) {
      return res.status(500).json({ message: error.message, forUser: false })
    }
  }

  getInterval (timeLapse) {
    switch (timeLapse) {
      case 'yearly':
        return '13 years'
      case 'monthly':
        return '1 year'
      case 'daily':
        return '13 days'
      case 'hourly':
        return '13 hours'
    }
  }

  async getAditionalSalesData (intervalVal) {
    try {
      const avgOrderValue = await sequelize.query(
        'CALL get_avg_order_value(:avg_order_value, :interval_val);',
        {
          replacements: { avg_order_value: 0, interval_val: intervalVal },
          type: sequelize.QueryTypes.RAW
        }
      )
      const avgProdsNum = await sequelize.query(
        'CALL get_avg_num_products_per_order(:avg_num_products_per_order, :interval_val);',
        {
          replacements: { avg_num_products_per_order: 0, interval_val: intervalVal },
          type: sequelize.QueryTypes.RAW
        }
      )
      const avgOrdersNum = await sequelize.query(
        'CALL get_avg_num_orders_per_client(:avg_num_orders_per_client, :interval_val);',
        {
          replacements: { avg_num_orders_per_client: 0, interval_val: intervalVal },
          type: sequelize.QueryTypes.RAW
        }
      )
      return { ...avgOrderValue[0][0], ...avgProdsNum[0][0], ...avgOrdersNum[0][0] }
    } catch (error) {
      return {}
    }
  }

  getBestSellers = async (req, res) => {
    try {
      const bestSellers = await sequelize.query(`SELECT ordersnum, "ProductId", name, description, image, price, provider, specs, status, stock
      FROM public."BestSellers" 
      limit 6;`)
      if (bestSellers) {
        const reportData = bestSellers[0].map((element) => {
          return { name: element.name, value: element.ordersnum }
        })
        return res.status(200).json(reportData)
      }
      return res.status(404).json({ err: 'Best sellers query did not retrieve any record' })
    } catch (error) {
      return res.status(500).json({ message: error.message, error })
    }
  }

  getNumProductsByCategory = async (req, res) => {
    try {
      const numProdsByCats = await sequelize.query(`SELECT name, value
      FROM public."NumProductsByCategory";`)
      if (numProdsByCats) {
        return res.status(200).json(numProdsByCats[0])
      }
      res.status(404).json({ err: 'Number of Products by category query did not retrieve any record' })
    } catch (error) {
      return res.status(500).json({ message: error.message, forUser: false })
    }
  }

  getRegisteredUsers = async (req, res) => {
    try {
      const registeredUsers = await sequelize.query(`SELECT name, value
      FROM public."registeredUsers";`)
      if (registeredUsers) {
        return res.status(200).json(registeredUsers[0])
      }
      res.status(404).json({ err: 'Registered Users query did not retrieve any record' })
    } catch (error) {
      return res.status(500).json({ message: error.message, forUser: false })
    }
  }
}
