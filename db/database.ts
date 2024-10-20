import { Sequelize } from "sequelize";
import dotenv from "dotenv"; 

dotenv.config();


const sequelize = new Sequelize(
  process.env.DB_DATABASE!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD,
  {
    dialect: "postgres",
    host: process.env.HOST,
    port: Number (process.env.DB_PORT),
    logging: false,
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
    console.log("Connected to the postgres Server with Sequelize");
  } catch (error: any) {
    console.error("Error connecting to server with Sequelize:", ); 
  }
};

export { sequelize, connectDB }; 
