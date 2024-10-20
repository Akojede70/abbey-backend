// import { Sequelize } from "sequelize";
// import dotenv from "dotenv"; 

// dotenv.config();


// const sequelize = new Sequelize(
//   process.env.DB_DATABASE!,
//   process.env.DB_USER!,
//   process.env.DB_PASSWORD,
//   {
//     dialect: "postgres",
//     host: process.env.HOST,
//     port: Number (process.env.DB_PORT),
//     logging: false,
//     // logging: console.log,
//     pool: {
//       max: 100,
//       min: 0,
//       acquire: 1000000,
//       idle: 100000,
//       evict: 2000,
//     },
//   }
// );

// const connectDB = async () => {
//   try {
//     await sequelize.authenticate();
//     await sequelize.sync();
//     console.log("Connected to the postgres Server with Sequelize");
//   } catch (error: any) {
//     console.error("Error connecting to server with Sequelize:", ); 
//   }
// };

// export { sequelize, connectDB }; 

import { Sequelize } from "sequelize";
// import { env } from "../config"
import dotenv from "dotenv"; 
dotenv.config();


// DB_DATABASE = postgres
// DB_USER = postgres
// DB_PASSWORD = 147369
// DB_HOST = https://abbey-backend-1.onrender.com
// DB_PORT = 5432
const mysqlClient = new Sequelize(process.env.DB_DATABASE!, process.env.DB_USER!, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: parseInt(process.env.DB_PORT!),
    logging: false,
    pool: {
        max: 2,
        min: 0,
        acquire: 3000,
        idle: 0
    },
    define: {
        freezeTableName: true
    }
});

mysqlClient
    .sync({ alter: true })
    .then(() => {
        console.log("postgres database connected successfully!");
    })
    .catch((err) => console.error(err));

export default mysqlClient;
