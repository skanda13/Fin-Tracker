import { Request } from 'express';
import { Document } from 'mongoose';

interface IUser extends Document {
  _id: string;
  email: string;
  name: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
} 