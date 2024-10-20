"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user-controller");
const router = express_1.default.Router();
router.get('/users', user_controller_1.getAllUsers);
router.get('/users/:id', user_controller_1.getUserById);
router.post('/users/follow', user_controller_1.followUser);
router.delete('/users/unfollow', user_controller_1.unfollowUser);
exports.default = router;
