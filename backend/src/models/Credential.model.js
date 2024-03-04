import { DataTypes } from "sequelize";
import { sequelize } from "../database/connection.js";
import { Person } from "./person.model.js";

export const Credential = sequelize.define("Credential", {
  email: {
    type: DataTypes.email,
    primaryKey: true,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Person.hasOne(Credential, {
  foreignKey: "personId",
  sourceKey: "id",
});

Credential.belongsTo(Person, {
  foreignKey: "personId",
  targetKey: "id",
});
