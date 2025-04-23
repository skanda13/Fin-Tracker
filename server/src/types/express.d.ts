import { Request } from 'express';
import { Document, Types } from 'mongoose';

interface IUser extends Document {
  _id: Types.ObjectId;
  email: string;
  name: string;
  password: string;
  settings?: {
    currency: string;
    theme: string;
    dateFormat: string;
  };
}

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
} 