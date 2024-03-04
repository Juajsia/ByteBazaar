import { DataTypes } from "sequelize";
import { sequelize } from "../database/connection.js";

export const Product = sequelize.define("Product", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    stock: {
        type: DataTypes.INTEGER,
        validate: {
            min: 0,
        }
    },
    price: {
        type: DataTypes.FLOAT,
        validate: {
            min: 0,
        }
    },
    description: {
        type: DataTypes.TEXT,
    },
    specs: {
        type: DataTypes.TEXT,
    },
    image: {
        type: DataTypes.STRING,
        validate: {
            isUrl: true,
        }
    },
    status: {
        type: DataTypes.BOOLEAN,
    },
    provider: {
        type: DataTypes.STRING,
    },
});
