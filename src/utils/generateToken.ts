import jwt from 'jsonwebtoken';

interface TokenPayload {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
}

// Function to create JWT
export const createJWT = (payload: TokenPayload): string => {
  console.log('JWT Payload:', payload);
  return jwt.sign(
    {
      userId: payload.userId,
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
    },
    process.env.JWT_SECRET || 'jwtSecret',
    
    { expiresIn: '5h' }
    
  );
};

// Function to create Refresh Token
export const createRefreshToken = (payload: TokenPayload): string => {
  return jwt.sign(
    {
      userId: payload.userId,
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
    },
    process.env.JWT_SECRET || 'jwtSecret',
    { expiresIn: '2d' }
  );
};
