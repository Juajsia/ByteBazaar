import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("bytebazaarDB", "ByteBazaar", "1234", {
  host: "localhost",
  dialect: "postgres",
});
