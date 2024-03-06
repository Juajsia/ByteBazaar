import { Product } from '../models/product.model.js'
import { Category } from '../models/category.model.js'
import { ProductCategory } from '../models/productCategory.model.js'

export class ProductController {
  getAllProducts = async (req, res) => {
    try {
      const products = await Product.findAll({
        include: {
          model: Category
        }
      })
      res.json(products)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  createProduct = async (req, res) => {
    try {
      let { name } = req.body
      name = name.toLowerCase()
      const product = await Product.findOne({ where: { name } })
      if (!product) {
        const { categories } = req.body
        const cats = []
        const promise = categories.map(async (element) => {
          console.log(cats)
          cats.push((await Category.findOne({ where: { name: element } })).id)
        })
        await Promise.all(promise)
        console.log(cats)
        if (categories.length !== cats.length) {
          return res.status(400).json({ msg: 'Some Category does not exist' })
        }

        const newProduct = await Product.create(req.body)
        cats.forEach(async (element) => {
          await ProductCategory.create({ CategoryId: element, ProductId: newProduct.id })
        })

        return res.status(201).json({ newProduct, categories })
      }

      return res.status(400).json({ msg: 'Product already exists' })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  getProduct = async (req, res) => {
    try {
      const { id } = req.params
      const product = await Product.findByPk(id)
      if (product) {
        res.json(product)
      } else {
        res.status(404).json({ err: 'product not found' })
      }
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  deleteProduct = async (req, res) => {
    try {
      const { id } = req.params
      await Product.destroy({
        where: {
          id
        }
      })
      res.json({ msg: 'Product deleted' })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  updateProduct = async (req, res) => {
    try {
      const { id } = req.params
      const product = await Product.findByPk(id)
      if (!product) {
        return res.status(404).json({ err: 'Product does not exist' })
      }
      product.set(req.body)
      await product.save()
      res.status(202).json(product)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
}
