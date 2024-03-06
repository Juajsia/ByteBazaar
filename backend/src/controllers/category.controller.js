import { Category } from '../models/category.model.js'
import { Product } from '../models/product.model.js'
import '../models/productCategory.model.js'

export class CategoryController {
  getAllCategories = async (req, res) => {
    try {
      const categories = await Category.findAll({
        include: {
          model: Product
        }
      })
      res.json(categories)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  createCategory = async (req, res) => {
    try {
      const { id } = req.body
      const category = await Category.findByPk(id)
      if (!category) {
        const newCategory = await Category.create(req.body)
        return res.status(201).json(newCategory)
      }
      return res.status(400).json({ msg: 'Category already exists' })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  getCategory = async (req, res) => {
    try {
      const { id } = req.params
      const category = await Category.findByPk(id)
      if (category) {
        res.json(category)
      } else {
        res.status(404).json({ err: 'category not found' })
      }
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  getCategoryByName = async (req, res) => {
    try {
      const { name } = req.params
      const category = await Category.findOne({ where: { name } })
      if (category) {
        res.json(category)
      } else {
        res.status(404).json({ err: 'category not found' })
      }
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  deleteCategory = async (req, res) => {
    try {
      const { id } = req.params
      await Category.destroy({
        where: {
          id
        }
      })
      res.json({ msg: 'Category deleted' })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  updateCategory = async (req, res) => {
    try {
      const { id } = req.params
      const category = await Category.findByPk(id)
      category.set(req.body)
      await category.save()
      res.status(202).json(category)
    } catch (error) {
      return res.status(500).json({ mesaage: error.message })
    }
  }
}
