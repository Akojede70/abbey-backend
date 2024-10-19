import { Sequelize } from "sequelize";
import dotenv from "dotenv"; 

dotenv.config();

const sequelize = new Sequelize(
  "mydb",
  process.env.DB_USER!,
  "#Peter70",
  {
    dialect: "mysql",
    host: process.env.HOST,
    port: Number (process.env.DB_PORT),
    pool: {
      max: 100,
      min: 0,
      acquire: 1000000,
      idle: 100000,
      evict: 2000,
    },
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Connected to the MySQL Server with Sequelize");
  } catch (error: any) {
    console.error("Error connecting to server with Sequelize:", error.message); 
  }
};

export { sequelize, connectDB }; 
