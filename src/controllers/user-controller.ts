import { StatusCodes } from "http-status-codes";
import UserRegistration from "../models/registration";
import { NextFunction, Request, Response } from 'express';
import asyncWrapper from "../middleware/async";
import NotFoundError from "../errors/not-found";
import Follow from '../models/follow';
import { Op } from "sequelize";

export const getAllUsers = asyncWrapper(async (req: Request, res: Response) => {
    const users = await UserRegistration.findAll({
      attributes: ['id', 'lastName', 'firstName', 'email', 'bio'], 
      order: [[ "createdAt", "DESC"]]
    });
    
    if (!users || users.length === 0) {
      throw new NotFoundError('No users found');
    }
  
    res.status(StatusCodes.OK).json({
      message: 'Users retrieved successfully',
      users
    });
  });

  export const getUserById = asyncWrapper(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await UserRegistration.findByPk(id, {
        attributes: ['id', 'lastName', 'firstName', 'email', 'bio']
    });

    
    if (!user) {
        throw new NotFoundError(`User with ID ${id} not found`);
    }

    const [followers, following] = await Promise.all([
        Follow.findAll({
            where: { followingId: id }, // Users that follow this user
            include: [
                {
                    model: UserRegistration,
                    as: 'FollowerUser', 
                    attributes: ['id', 'firstName', 'lastName', 'email', 'bio'],
                },
            ],
        }),
        Follow.findAll({
            where: { followerId: id }, 
            include: [
                {
                    model: UserRegistration,
                    as: 'FollowingUser',
                    attributes: ['id', 'firstName', 'lastName', 'email', 'bio'],
                },
            ],
        }),
    ]);

    const followersCount = followers.length; // Count of followers
    const followingCount = following.length; // Count of following users

    // Prepare the response
    res.status(StatusCodes.OK).json({
        message: 'User retrieved successfully',
        user,
        followersCount,
        followersList: followers.map(f => f.FollowerUser), // List of followers
        followingCount,
        followingList: following.map(f => f.FollowingUser), // List of following users
    });
});

export const followUser = asyncWrapper(async (req: Request, res: Response) => {
  const { followerId, followingId } = req.body; // Extract from request body
  const newFollow = await Follow.create({ followerId, followingId });

  res.status(StatusCodes.CREATED).json({
    message: 'Successfully followed the user',
    follow: newFollow,
  });
});


export const unfollowUser = asyncWrapper(async (req: Request, res: Response) => {
  const { followerId, followingId } = req.body; 

  // Check if the follow record exists
  const existingFollow = await Follow.findOne({
    where: {
      followerId,
      followingId,
    },
  });

  if (!existingFollow) {
    throw new NotFoundError('You are not following this user.');
  }

  // Delete the follow record
  await existingFollow.destroy();

  res.status(StatusCodes.OK).json({
    message: 'Successfully unfollowed the user',
  });
});

export const searchUsers = asyncWrapper(async (req: Request, res: Response) => {
  const { query } = req.query;

  if (!query || typeof query !== "string") {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Search query is required',
    });
    return;
  }

  const searchQuery = String(query);
  console.log('Query:', searchQuery, 'Type:', typeof searchQuery);

  const users = await UserRegistration.findAll({
    attributes: ['id', 'lastName', 'firstName', 'email', 'bio'],
    where: {
      [Op.or]: [
        { firstName: { [Op.iLike]: `%${searchQuery}%` } },
        { lastName: { [Op.iLike]: `%${searchQuery}%` } },
        { email: { [Op.iLike]: `%${searchQuery}%` } },
      ],
    },
    order: [['createdAt', 'DESC']],
  });

  if (!users || users.length === 0) {
    throw new NotFoundError('No users found matching the search criteria');
  }

  res.status(StatusCodes.OK).json({
    message: 'Search results',
    users,
  });
});

  export default {
    getAllUsers,
    getUserById,
    unfollowUser,
    followUser,
    searchUsers,
  };