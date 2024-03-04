import { sequelize } from "../database/connection.js";
import { Person } from "./person.model.js";

export const Client = sequelize.define("Client");

Person.hasOne(Client, {
  foreignKey: "personId",
  sourceKey: "id",
});

Client.belongsTo(Person, {
  foreignKey: "personId",
  targetKey: "id",
});
