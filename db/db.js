"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = exports.pool = void 0;
// db.ts
const pg_1 = require("pg");
const sequelize_1 = require("sequelize");
// Create a new pool instance
const pool = new pg_1.Pool({
    user: 'postgres', // PostgreSQL username
    host: '127.0.0.1', // Database host (use your cloud provider's host if applicable)
    database: 'SocialDB', // Database name
    password: '147369', // PostgreSQL password
    port: 3000, // Default PostgreSQL port
    connectionTimeoutMillis: 5000
});
exports.pool = pool;
// Function to test the connection
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield pool.connect();
        console.log('Connected to PostgreSQL');
    }
    catch (err) {
        console.error('Connection error:', err); // Log the full error object
        if (err instanceof sequelize_1.AggregateError) {
            err.errors.forEach((e) => {
                console.error('Detailed error:', e.message);
            });
        }
    }
});
exports.connectDB = connectDB;
