import { QueryTypes } from 'sequelize'
import { sequelize } from '../database/connection.js'
import { Review } from '../models/review.model.js'
import { Client } from '../models/client.model.js'
import { Person } from '../models/person.model.js'

export class ReviewController {
  getAllReview = async (req, res) => {
    try {
      const review = await Review.findAll({
        include: [{
          model: Client,
          include: [{
            model: Person,
            attributes: { exclude: ['createdAt', 'updatedAt'] }
          }],
          attributes: { exclude: ['personId'] }
        }],
        attributes: { exclude: ['ClientId'] }
      })
      res.status(200).json(review)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  createReview = async (req, res) => {
    try {
      const { ClientId, ProductId } = req.body
      const review = await Review.findOne({ where: { ClientId, ProductId } })
      if (!review) {
        const newReview = await Review.create(req.body, {
          include: [{
            model: Client,
            include: [{
              model: Person,
              attributes: { exclude: ['createdAt', 'updatedAt'] }
            }],
            attributes: { exclude: ['personId'] }
          }],
          attributes: { exclude: ['ClientId'] }
        })
        return res.status(201).json(newReview)
      }
      return res.status(400).json({ message: 'You already have a review about this product', text: 'You can edit or delete your current review', forUser: true })
    } catch (error) {
      return res.status(500).json({ message: error.message, forUser: false })
    }
  }

  getReview = async (req, res) => {
    try {
      const { ClientId, ProductId } = req.params
      const review = await Review.findOne({
        where: { ClientId, ProductId },
        include: [{
          model: Client,
          include: [{
            model: Person,
            attributes: { exclude: ['createdAt', 'updatedAt'] }
          }],
          attributes: { exclude: ['personId'] }
        }],
        attributes: { exclude: ['ClientId'] }
      })
      res.status(200).json(review)
    } catch (error) {
      return res.status(500).json({ message: error.message, forUser: false })
    }
  }

  getReviewsByProd = async (req, res) => {
    try {
      const { ProductId } = req.params
      const reviews = await Review.findAll({
        where: { ProductId },
        include: [{
          model: Client,
          include: [{
            model: Person,
            attributes: { exclude: ['createdAt', 'updatedAt'] }
          }],
          attributes: { exclude: ['personId'] }
        }],
        attributes: { exclude: ['ClientId'] }
      })
      res.status(200).json(reviews)
    } catch (error) {
      return res.status(500).json({ message: error.message, forUser: false })
    }
  }

  deleteReview = async (req, res) => {
    const transaction = await sequelize.transaction()
    try {
      const { ClientId, ProductId } = req.params
      const review = await Review.findOne({ where: { ClientId, ProductId }, transaction })
      if (!review) {
        await transaction.rollback()
        return res.status(404).json({ message: 'Error deleting review', text: 'You do not have a review to delete', forUser: true })
      }
      await review.destroy({ transaction })
      await transaction.commit()
      return res.status(200).json({ message: 'Your review was deleted' })
    } catch (error) {
      await transaction.rollback()
      return res.status(500).json({ message: error.message, forUser: false })
    }
  }

  updateReview = async (req, res) => {
    try {
      const { ClientId, ProductId } = req.params
      const review = await Review.findOne({
        where: { ClientId, ProductId },
        include: [{
          model: Client,
          include: [{
            model: Person,
            attributes: { exclude: ['createdAt', 'updatedAt'] }
          }],
          attributes: { exclude: ['personId'] }
        }],
        attributes: { exclude: ['ClientId'] }
      })
      if (!review) {
        return res.status(404).json({ message: 'Error updating review', text: 'You do not have a review to update', forUser: true })
      }
      review.set(req.body)
      await review.save()
      res.status(202).json(review)
    } catch (error) {
      return res.status(500).json({ message: error.message, forUser: false })
    }
  }

  getScoreCounting = async (req, res) => {
    try {
      const { ProductId } = req.params
      const scores = await sequelize.query(
        'SELECT * FROM get_review_scores(:ProductId)',
        {
          replacements: { ProductId: Number(ProductId) },
          type: QueryTypes.SELECT
        }
      )
      if (scores.length < 5) {
        return res.status(200).json(this.fillMissingScores(scores))
      }
      return res.status(200).json(scores)
    } catch (error) {
      return res.status(500).json({ message: error.message, forUser: false })
    }
  }

  fillMissingScores (arr) {
    const requiredNames = [1, 2, 3, 4, 5]
    const scoreMap = new Map(arr.map(item => [item.name, item]))
    for (const name of requiredNames) {
      if (!scoreMap.has(name)) {
        scoreMap.set(name, { name, value: 0 })
      }
    }
    return Array.from(scoreMap.values()).sort((a, b) => b.name - a.name)
  }
}
