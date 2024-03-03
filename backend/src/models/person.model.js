import { DataTypes } from "sequelize";
import { sequelize } from "../database/connection.js";

export const Person = sequelize.define("Person", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  fistName: {
    type: DataTypes.STRING,
  },
  secondName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lastName1: {
    type: DataTypes.STRING,
  },
  lastName2: {
    type: DataTypes.STRING,
  },
});
