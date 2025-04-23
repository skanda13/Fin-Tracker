import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

interface JwtPayload {
  id: string;
}

// Extend the Request interface to include a user property
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      console.log('No token found in request');
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as JwtPayload;
      console.log('Token decoded:', decoded);

      // Get user from token
      const user = await User.findById(decoded.id).select('-password') as IUser;
      if (!user) {
        console.log('No user found with decoded ID:', decoded.id);
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      console.log('User authenticated:', user._id);
      req.user = user;
      next();
    } catch (error) {
      console.error('Error verifying token:', error);
      res.status(401).json({ message: 'Not authorized, invalid token' });
    }
  } catch (error) {
    console.error('Error in auth middleware:', error);
    res.status(500).json({ message: 'Server error in auth middleware' });
  }
}; 