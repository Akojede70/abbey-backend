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
exports.unfollowUser = exports.followUser = exports.getUserById = exports.getAllUsers = void 0;
const http_status_codes_1 = require("http-status-codes");
const registration_1 = __importDefault(require("../models/registration"));
const bad_request_1 = __importDefault(require("../errors/bad-request"));
const async_1 = __importDefault(require("../middleware/async"));
const not_found_1 = __importDefault(require("../errors/not-found"));
const follow_1 = __importDefault(require("../models/follow"));
exports.getAllUsers = (0, async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield registration_1.default.findAll({
        attributes: ['id', 'lastName', 'firstName', 'email', 'bio']
    });
    if (!users || users.length === 0) {
        throw new not_found_1.default('No users found');
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({
        message: 'Users retrieved successfully',
        users
    });
}));
exports.getUserById = (0, async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // Find the user by ID
    const user = yield registration_1.default.findByPk(id, {
        attributes: ['id', 'lastName', 'firstName', 'email', 'bio']
    });
    // Handle case where user is not found
    if (!user) {
        throw new not_found_1.default(`User with ID ${id} not found`);
    }
    // Fetch followers and following information
    const [followers, following] = yield Promise.all([
        follow_1.default.findAll({
            where: { followingId: id }, // Users that follow this user
            include: [
                {
                    model: registration_1.default,
                    as: 'FollowerUser',
                    attributes: ['id', 'firstName', 'lastName', 'email', 'bio'],
                },
            ],
        }),
        follow_1.default.findAll({
            where: { followerId: id },
            include: [
                {
                    model: registration_1.default,
                    as: 'FollowingUser', // Alias for the following user
                    attributes: ['id', 'firstName', 'lastName', 'email', 'bio'],
                },
            ],
        }),
    ]);
    const followersCount = followers.length; // Count of followers
    const followingCount = following.length; // Count of following users
    // Prepare the response
    res.status(http_status_codes_1.StatusCodes.OK).json({
        message: 'User retrieved successfully',
        user,
        followersCount,
        followersList: followers.map(f => f.FollowerUser), // List of followers
        followingCount,
        followingList: following.map(f => f.FollowingUser), // List of following users
    });
}));
exports.followUser = (0, async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { followerId, followingId } = req.body; // Extract from request body
    // Check if the follow record already exists
    const existingFollow = yield follow_1.default.findOne({
        where: {
            followerId,
            followingId,
        },
    });
    if (existingFollow) {
        throw new bad_request_1.default('You are already following this user.');
    }
    // Create a new follow record
    const newFollow = yield follow_1.default.create({ followerId, followingId });
    res.status(http_status_codes_1.StatusCodes.CREATED).json({
        message: 'Successfully followed the user',
        follow: newFollow,
    });
}));
exports.unfollowUser = (0, async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { followerId, followingId } = req.body; // Extract from request body
    // Check if the follow record exists
    const existingFollow = yield follow_1.default.findOne({
        where: {
            followerId,
            followingId,
        },
    });
    if (!existingFollow) {
        throw new not_found_1.default('You are not following this user.');
    }
    // Delete the follow record
    yield existingFollow.destroy();
    res.status(http_status_codes_1.StatusCodes.OK).json({
        message: 'Successfully unfollowed the user',
    });
}));
exports.default = {
    getAllUsers: exports.getAllUsers,
    getUserById: exports.getUserById,
    unfollowUser: exports.unfollowUser,
    followUser: exports.followUser,
};
