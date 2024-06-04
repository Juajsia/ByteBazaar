import { DataTypes } from 'sequelize'
import { sequelize } from '../database/connection.js'
import { Client } from './client.model.js'
import { Product } from './product.model.js'

export const Review = sequelize.define('Review', {
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: true,
      min: 1
    }
  },
  comment: {
    type: DataTypes.TEXT
  },
  ProductId: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: 'id'
    }
  },
  ClientId: {
    type: DataTypes.INTEGER,
    references: {
      model: Client,
      key: 'personId'
    }
  }
})

// Define associations
Client.belongsToMany(Product, {
  through: Review,
  foreignKey: 'ClientId',
  sourceKey: 'personId'
})

Product.belongsToMany(Client, {
  through: Review,
  foreignKey: 'ProductId',
  sourceKey: 'id'
})

Review.belongsTo(Client, { foreignKey: 'ClientId' })
Review.belongsTo(Product, { foreignKey: 'ProductId' })
Client.hasMany(Review, { foreignKey: 'ClientId' })
Product.hasMany(Review, { foreignKey: 'ProductId' })

Review.addHook('afterCreate', async (review, options) => {
  await sequelize.transaction(async (t) => {
    await Product.increment('totalReviews', {
      where: { id: review.ProductId },
      transaction: t
    })

    const product = await Product.findByPk(review.ProductId, { transaction: t })
    const newScore = (product.score * (product.totalReviews - 1) + review.score) / product.totalReviews
    await product.update({ score: newScore }, { transaction: t })
  })
})

Review.addHook('beforeUpdate', async (review, options) => {
  await sequelize.transaction(async (t) => {
    const oldReview = await Review.findOne({
      where: {
        ClientId: review.ClientId,
        ProductId: review.ProductId
      }
    })
    const product = await Product.findByPk(review.ProductId, { transaction: t })
    const newScore = ((product.score * product.totalReviews - oldReview.score) + review.score) / product.totalReviews
    await product.update({ score: newScore }, { transaction: t })
  })
})

Review.addHook('afterDestroy', async (review, options) => {
  await sequelize.transaction(async (t) => {
    await Product.decrement('totalReviews', {
      where: { id: review.ProductId },
      transaction: t
    })
    const product = await Product.findByPk(review.ProductId, { transaction: t })
    if (product.totalReviews === 0) { // Avoid division by zero
      await product.update({ score: 0 }, { transaction: t })
    } else {
      const newScore = ((product.score * (product.totalReviews + 1)) - review.score) / product.totalReviews
      await product.update({ score: newScore }, { transaction: t })
    }
  })
})
