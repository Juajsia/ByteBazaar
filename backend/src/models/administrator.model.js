import { sequelize } from "../database/connection.js";
import { Person } from "./person.model.js";

export const Administrator = sequelize.define("Administrator");

Person.hasOne(Administrator, {
  foreignKey: "personId",
  sourceKey: "id",
});

Administrator.belongsTo(Person, {
  foreignKey: "personId",
  targetKey: "id",
});
