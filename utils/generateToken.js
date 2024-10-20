"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRefreshToken = exports.createJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Function to create JWT
const createJWT = (payload) => {
    return jsonwebtoken_1.default.sign({
        userId: payload.userId,
        email: payload.email,
        firstName: payload.firstName,
    }, process.env.JWT_SECRET || 'jwtSecret', { expiresIn: '5h' });
};
exports.createJWT = createJWT;
// Function to create Refresh Token
const createRefreshToken = (payload) => {
    return jsonwebtoken_1.default.sign({
        userId: payload.userId,
        email: payload.email,
        firstName: payload.firstName,
    }, process.env.JWT_SECRET || 'jwtSecret', { expiresIn: '2d' });
};
exports.createRefreshToken = createRefreshToken;
