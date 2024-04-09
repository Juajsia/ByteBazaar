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
          const catFormatted = element.charAt(0).toUpperCase() + element.slice(1)
          const cat = await Category.findOne({ where: { name: catFormatted } })

          if (cat) {
            cats.push((await Category.findOne({ where: { name: catFormatted } })).id)
          }
        })
        await Promise.all(promise)

        if (categories.length !== cats.length) {
          return res.status(400).json({ msg: 'Some Category does not exist' })
        }

        let newProduct = await Product.create(req.body)
        cats.forEach(async (element) => {
          await ProductCategory.create({ CategoryId: element, ProductId: newProduct.id })
        })

        const catsObject = { categories }
        newProduct = { ...newProduct.dataValues, ...catsObject }

        return res.status(201).json(newProduct)
      }

      return res.status(400).json({ msg: 'Product already exists' })
    } catch (error) {
      return res.status(500).json({ message: error.message, error })
    }
  }

  getProduct = async (req, res) => {
    try {
      const { name } = req.params
      const nameFormatted = name.toLowerCase()
      const product = await Product.findOne({
        where: { name: nameFormatted },
        include: Category
      })
      if (product) {
        const cats = product.Categories
        const catsNames = []
        cats.forEach(cat => {
          catsNames.push(cat.name)
        })

        const { Categories, ...otherProperties } = product.dataValues
        const catsNamesObject = { categories: catsNames }
        const prodAndCats = { ...otherProperties, ...catsNamesObject }

        res.json(prodAndCats)
      } else {
        res.status(404).json({ err: 'product not found' })
      }
    } catch (error) {
      return res.status(500).json({ message: error.message, error })
    }
  }

  deleteProduct = async (req, res) => {
    try {
      const { name } = req.params
      const product = await Product.findOne({ where: { name } })
      product.set({ ...product, status: false })
      await product.save()
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
      const { categories: newCats, ...otherProperties } = req.body
      await ProductCategory.destroy({ where: { ProductId: id } })
      newCats.forEach(async cat => {
        const { dataValues: getCat } = await Category.findOne({ where: { name: cat } })
        await ProductCategory.create({ ProductId: id, CategoryId: getCat.id })
      })
      product.set(otherProperties)
      await product.save()
      res.status(202).json(req.body)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  capitalizeWords (str) {
    return str.toLowerCase().replace(/(^|\s)\S/g, function (firstLetter) {
      return firstLetter.toUpperCase()
    })
  }
}
