import BadRequestError from '../errors/bad-request';
import express, { Request, Response, NextFunction } from 'express'; 
import { StatusCodes } from "http-status-codes";

interface CustomError extends Error {
    statusCode?: number;
  }
  
  // Error handler middleware
  const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction): void => {
    // Handle BadRequestError (or any other specific custom errors)
    if (err instanceof BadRequestError) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: err.message })
      return;
    }
  
    // Generic server error for other types of errors
    const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    const message = err.message || 'Something went wrong. Please try again later.';
  
    res.status(statusCode).json({ message });
  };

  export default errorHandler