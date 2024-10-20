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
const sequelize_1 = require("sequelize");
const database_1 = require("../db/database");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserRegistration extends sequelize_1.Model {
}
UserRegistration.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Please provide your last name' },
            len: {
                args: [1, 20],
                msg: 'Last name must be less than or equal to 20 characters',
            },
            isAlpha: {
                msg: 'Please provide a valid last name with letters only',
            },
        },
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Please provide your first name' },
            len: {
                args: [1, 20],
                msg: 'First name must be less than or equal to 20 characters',
            },
            isAlpha: {
                msg: 'Please provide a valid first name with letters only',
            },
        },
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: { msg: 'Please provide an email' },
            isEmail: { msg: 'Please provide a valid email address' },
        },
    },
    bio: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Please provide a bio' },
        },
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Please provide a password' },
            len: {
                args: [8, 20],
                msg: 'Password must be at least 8 characters long',
            },
            is: {
                args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
                msg: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
            },
        },
    },
}, {
    sequelize: database_1.sequelize,
    tableName: 'registrations',
    timestamps: true,
});
UserRegistration.beforeCreate((user) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcrypt_1.default.genSalt(10);
    user.password = yield bcrypt_1.default.hash(user.password, salt);
}));
exports.default = UserRegistration;
