import app from "./app.js";
import { sequelize } from "./database/connection.js";

try {
  // await sequelize.sync({ force: true })
  await sequelize.authenticate();
  console.log("Connection has been established successfully");
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`app running in port ${PORT}`);
  });
} catch (error) {
  console.error("Error connecting to the database", error);
}
