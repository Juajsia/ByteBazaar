import { DataTypes } from "sequelize";
import { sequelize } from "../database/connection.js";

export const Person = sequelize.define("Person", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
  },
  fistName: {
    type: DataTypes.STRING,
    validate: {
      isAlpha: true,
    },
  },
  secondName: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isAlpha: true,
    },
  },
  lastName1: {
    type: DataTypes.STRING,
    validate: {
      isAlpha: true,
    },
  },
  lastName2: {
    type: DataTypes.STRING,
    validate: {
      isAlpha: true,
    },
  },
});
