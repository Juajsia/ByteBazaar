import { DataTypes } from "sequelize";
import { sequelize } from "../database/connection.js";
import { Order } from "./order.model.js";
import { Product } from "./product.model.js";

export const OrderDetail = sequelize.define("OrderDetail", {
    quantity: {
        type: DataTypes.INTEGER,
        validate: {
            min: 0,
        },
        allowNull: false,
    },
});

Order.belongsToMany(Product, {
    through: OrderDetail,
});

Product.belongsToMany(Order, {
    through: OrderDetail,
});
