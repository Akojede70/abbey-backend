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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const http_status_codes_1 = require("http-status-codes");
const registration_1 = __importDefault(require("../models/registration"));
const bad_request_1 = __importDefault(require("../errors/bad-request"));
const async_1 = __importDefault(require("../middleware/async"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateToken_1 = require("../utils/generateToken");
exports.register = (0, async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { lastName, firstName, email, bio, password } = req.body;
    // Validate required fields
    const requiredFields = ['lastName', 'firstName', 'email', 'bio', 'password'];
    requiredFields.forEach(field => {
        if (!req.body[field]) {
            throw new bad_request_1.default(`${field} is required`);
        }
    });
    const existingUser = yield registration_1.default.findOne({ where: { email } });
    if (existingUser) {
        throw new bad_request_1.default('Email already in use');
    }
    const user = yield registration_1.default.create({ lastName, firstName, email, bio, password });
    const accessToken = (0, generateToken_1.createJWT)({
        firstName, email, userId: user.id,
    });
    const refreshToken = (0, generateToken_1.createRefreshToken)({
        firstName, email, userId: user.id,
    });
    res.status(http_status_codes_1.StatusCodes.CREATED).json({
        message: "Registration Successful",
        user: {
            id: user.id,
            lastName: user.lastName,
            firstName: user.firstName,
            email: user.email,
            bio: user.bio,
            accessToken,
            refreshToken,
        },
    });
}));
exports.login = (0, async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const requiredFields = ['email', 'password'];
    requiredFields.forEach(field => {
        if (!req.body[field]) {
            throw new bad_request_1.default(`${field} is required`);
        }
    });
    const user = yield registration_1.default.findOne({ where: { email } });
    if (!user) {
        throw new bad_request_1.default("Invalid credentials");
    }
    const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        throw new bad_request_1.default("Invalid credentials");
    }
    const accessToken = (0, generateToken_1.createJWT)({
        firstName: user.firstName, email: user.email, userId: user.id,
    });
    const refreshToken = (0, generateToken_1.createRefreshToken)({
        firstName: user.firstName, email: user.email, userId: user.id,
    });
    res.status(http_status_codes_1.StatusCodes.OK).json({
        message: "Login Successful",
        user: {
            id: user.id,
            lastName: user.lastName,
            firstName: user.firstName,
            email: user.email,
            bio: user.bio,
            accessToken,
            refreshToken,
        },
    });
}));
exports.default = {
    register: (0, async_1.default)(exports.register),
    login: (0, async_1.default)(exports.login),
};
