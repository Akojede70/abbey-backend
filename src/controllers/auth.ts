import { StatusCodes } from "http-status-codes";
import UserRegistration from "../models/registration";
import { Request, Response } from 'express';
import BadRequestError from "../errors/bad-request";
import asyncWrapper from "../middleware/async";
import bcrypt from 'bcrypt';
import { createJWT, createRefreshToken} from "../utils/generateToken"

export const register =  asyncWrapper (async (req: Request, res: Response) => {
  
  const { lastName, firstName, email, bio, password } = req.body;
  // Validate required fields
  const requiredFields = ['lastName', 'firstName', 'email', 'bio', 'password']
  requiredFields.forEach(field => {
    if (!req.body[field]) {
      throw new BadRequestError(`${field} is required`);
    }
  });

  const existingUser = await UserRegistration.findOne({ where: { email } });
  if (existingUser) {
    throw new BadRequestError('Email already in use');
  }

  const user = await UserRegistration.create({  lastName, firstName, email, bio, password });
  
  const accessToken = createJWT({
    firstName, 
    lastName, 
    email, 
    userId: user.id,
  });
  const refreshToken = createRefreshToken({
    firstName, lastName, email, userId: user.id,
  });

  res.status(StatusCodes.CREATED).json({
    message: "Registration  Successful",
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
});

export const login = asyncWrapper (async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const requiredFields = ['email', 'password'];
  requiredFields.forEach(field => {
    if (!req.body[field]) {
      throw new BadRequestError(`${field} is required`);
    }
  });

  
  const user = await UserRegistration.findOne({ where: { email } });
  if (!user) {
    throw new BadRequestError("Invalid credentials");
  }


  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new BadRequestError("Invalid credentials");
  }

  const accessToken = createJWT({
    firstName: user.firstName, 
    lastName: user.lastName, 
    email: user.email, 
    userId: user.id,
  });
  const refreshToken = createRefreshToken({
    firstName: user.firstName, lastName: user.lastName, email: user.email, userId: user.id,
  });

  res.status(StatusCodes.OK).json({
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
});

export default {
  register: asyncWrapper(register),
  login: asyncWrapper(login),
};