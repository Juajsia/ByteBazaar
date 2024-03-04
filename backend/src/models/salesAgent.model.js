import { sequelize } from "../database/connection.js";
import { Person } from "./person.model.js";

export const SalesAgent = sequelize.define("SalesAgent");

Person.hasOne(SalesAgent, {
  foreignKey: "personId",
  sourceKey: "id",
});

SalesAgent.belongsTo(Person, {
  foreignKey: "personId",
  targetKey: "id",
});
