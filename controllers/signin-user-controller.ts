// controller/userController.ts
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Follow from '../models/follow';
import asyncWrapper from '../middleware/async';
import UserRegistration from '../models/registration';


export const getUserConnections = asyncWrapper(async (req: Request, res: Response) => {
    const { userId } = req.params; 
    const [following, followers] = await Promise.all([
      Follow.findAll({
        where: { followerId: userId },
        include: [
          {
            model: UserRegistration,
            as: 'FollowingUser',
            attributes: ['id', 'firstName', 'lastName', 'email', 'bio'],
          },
        ],
      }),
      Follow.findAll({
        where: { followingId: userId },
        include: [
          {
            model: UserRegistration,
            as: 'FollowerUser',
            attributes: ['id', 'firstName', 'lastName', 'email', 'bio'],
          },
        ],
      }),
    ]);
  
    const followingCount = following.length;
    const followersCount = followers.length;
  
    res.status(StatusCodes.OK).json({
      followingCount,
      followingList: following.map(f => f.FollowingUser),
      followersCount,
      followersList: followers.map(f => f.FollowerUser), 
    });
  });

export default {
  getUserConnections,
};
