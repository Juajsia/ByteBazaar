import { Product } from '../models/product.model.js'
import { Category } from '../models/category.model.js'
import { ProductCategory } from '../models/productCategory.model.js'

import { Op } from 'sequelize'

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
      const { name } = req.body
      const product = await Product.findOne({ where: { name: { [Op.iLike]: name } } })
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
          return res.status(400).json({ message: 'Some Category does not exist' })
        }

        let newProduct = await Product.create(req.body)
        cats.forEach(async (element) => {
          await ProductCategory.create({ CategoryId: element, ProductId: newProduct.id })
        })

        const catsObject = { categories }
        newProduct = { ...newProduct.dataValues, ...catsObject }

        return res.status(201).json(newProduct)
      }

      return res.status(400).json({ message: 'Product already exists', text: 'This product is already in the catalog', forUser: true })
    } catch (error) {
      return res.status(500).json({ message: error.message, forUser: false })
    }
  }

  getProduct = async (req, res) => {
    try {
      const { name } = req.params
      const product = await Product.findOne({
        where: { name: { [Op.iLike]: name } },
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

  desableProduct = async (req, res) => {
    try {
      const { name } = req.params
      const product = await Product.findOne({ where: { name } })
      product.set({ ...product, status: false })
      await product.save()
      res.json({ msg: 'Product desabled' })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  enableProduct = async (req, res) => {
    try {
      const { name } = req.params
      const product = await Product.findOne({ where: { name } })
      product.set({ ...product, status: true })
      await product.save()
      res.json({ msg: 'Product enabled' })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  deleteProduct = async (req, res) => {
    try {
      const { id } = req.params
      const delProd = await Product.destroy({ where: { id } })
      if (!delProd) {
        return res.status(404).json({ message: 'Product does not exist', text: 'The product you are trying to delete does not exists', forUser: true })
      }
      res.json({ msg: 'Product deleted' })
    } catch (error) {
      return res.status(500).json({ message: error.message, forUser: false })
    }
  }

  updateProduct = async (req, res) => {
    try {
      const { id } = req.params
      const product = await Product.findByPk(id)
      if (!product) {
        return res.status(404).json({ message: 'Product does not exist', text: 'The product you are trying to update does not exists', forUser: true })
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
      return res.status(500).json({ message: error.message, forUser: false })
    }
  }

  capitalizeWords (str) {
    return str.toLowerCase().replace(/(^|\s)\S/g, function (firstLetter) {
      return firstLetter.toUpperCase()
    })
  }
}
