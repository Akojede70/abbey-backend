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
exports.getUserConnections = void 0;
const http_status_codes_1 = require("http-status-codes");
const follow_1 = __importDefault(require("../models/follow"));
const async_1 = __importDefault(require("../middleware/async"));
const registration_1 = __importDefault(require("../models/registration"));
exports.getUserConnections = (0, async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const [following, followers] = yield Promise.all([
        follow_1.default.findAll({
            where: { followerId: userId },
            include: [
                {
                    model: registration_1.default,
                    as: 'FollowingUser',
                    attributes: ['id', 'firstName', 'lastName', 'email', 'bio'],
                },
            ],
        }),
        follow_1.default.findAll({
            where: { followingId: userId },
            include: [
                {
                    model: registration_1.default,
                    as: 'FollowerUser',
                    attributes: ['id', 'firstName', 'lastName', 'email', 'bio'],
                },
            ],
        }),
    ]);
    const followingCount = following.length;
    const followersCount = followers.length;
    res.status(http_status_codes_1.StatusCodes.OK).json({
        followingCount,
        followingList: following.map(f => f.FollowingUser),
        followersCount,
        followersList: followers.map(f => f.FollowerUser),
    });
}));
exports.default = {
    getUserConnections: exports.getUserConnections,
};
