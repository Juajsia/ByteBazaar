import { ProductCategory } from '../models/productCategory.model.js'

export class ProductCategoryController {
  getAllProductCategories = async (req, res) => {
    try {
      const productCategories = await ProductCategory.findAll()
      res.json(productCategories)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  createProductCategory = async (req, res) => {
    try {
      const { CategoryId, ProductId } = req.body
      const productCategory = await ProductCategory.findOne({ where: { CategoryId, ProductId } })
      console.log(productCategory)
      if (!productCategory) {
        const newProductCategory = await ProductCategory.create(req.body)
        return res.status(201).json(newProductCategory)
      }
      return res.status(400).json({ msg: 'ProductCategory already exists' })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  getProductCategory = async (req, res) => {
    try {
      const { CategoryId, ProductId } = req.body
      const productCategory = await ProductCategory.findOne({ where: { CategoryId, ProductId } })
      if (productCategory) {
        res.json(productCategory)
      } else {
        res.status(404).json({ err: 'productCategory not found' })
      }
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  deleteProductCategory = async (req, res) => {
    try {
      const { CategoryId, ProductId } = req.body
      await ProductCategory.destroy({ where: { CategoryId, ProductId } })
      res.json({ msg: 'ProductCategory deleted' })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
}
