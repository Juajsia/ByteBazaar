import { DataTypes } from "sequelize";
import { sequelize } from "../database/connection.js";
import { Category } from "./category.model.js";
import { Product } from "./product.model.js";

export const ProductCategory = sequelize.define("ProductCategory");

Category.belongsToMany(Product, {
  through: ProductCategory,
});

Product.belongsToMany(Category, {
  through: ProductCategory,
});
