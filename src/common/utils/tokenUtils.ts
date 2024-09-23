import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; 

export const generateToken = (payload: object, expiresIn: string = '1h'): string => {
  console.log(payload)
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

export const verifyToken = (token: string): object => {
  try {
    return jwt.verify(token, JWT_SECRET) as object;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

export const decodeToken = (token: string): object | null => {
  try {
    return jwt.decode(token) as object;
  } catch (error) {
    return null;
  }
};
