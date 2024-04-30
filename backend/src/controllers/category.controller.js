import { Op } from 'sequelize'
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
      const { name, description } = req.body
      const category = await Category.findOne({ where: { name: { [Op.iLike]: name } } })
      if (!category) {
        const newCategory = await Category.create({ name, description })
        return res.status(201).json(newCategory)
      }
      return res.status(400).json({ message: 'Category already exists', text: 'You should create a new category because this one already exists', forUser: true })
    } catch (error) {
      return res.status(500).json({ message: error.message, forUser: false })
    }
  }

  getCategory = async (req, res) => {
    try {
      const { id } = req.params
      const category = await Category.findByPk(id, {
        include: {
          model: Product
        }
      })
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
        req.params = { name, id: category.id }
        this.getCategory(req, res)
      } else {
        res.status(404).json({ err: 'category name not found' })
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
