"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../db/database");
const registration_1 = __importDefault(require("./registration"));
class Follow extends sequelize_1.Model {
}
// Initialize the Follow model
Follow.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    followerId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: registration_1.default,
            key: 'id',
        },
    },
    followingId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: registration_1.default,
            key: 'id',
        },
    },
}, {
    sequelize: database_1.sequelize,
    modelName: 'Follow',
});
// Set up associations
Follow.belongsTo(registration_1.default, { foreignKey: 'followerId', as: 'FollowerUser' });
Follow.belongsTo(registration_1.default, { foreignKey: 'followingId', as: 'FollowingUser' });
exports.default = Follow;
