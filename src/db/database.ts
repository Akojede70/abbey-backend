import { Sequelize } from "sequelize";
import dotenv from "dotenv"; 
dotenv.config();

const mysqlClient = new Sequelize(process.env.DB_DATABASE!, process.env.DB_USER!, process.env.DB_PASSWORD!, {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: parseInt(process.env.DB_PORT!),
    logging: false,
    pool: {
        max: 10, 
        min: 2,
        acquire: 3000,
        idle: 0 // no idle time until the application is closed
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
