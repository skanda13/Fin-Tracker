import mongoose, { Document, Schema, Types } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  settings?: {
    currency: string;
    theme: string;
    dateFormat: string;
  };
  createdAt: Date;
  updatedAt: Date;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Please add a name']
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: [6, 'Password must be at least 6 characters']
    },
    settings: {
      currency: {
        type: String,
        default: '₹',
      },
      theme: {
        type: String,
        enum: ['light', 'dark'],
        default: 'light',
      },
      dateFormat: {
        type: String,
        enum: ['DD-MM-YYYY', 'MM-DD-YYYY', 'YYYY-MM-DD'],
        default: 'DD-MM-YYYY',
      },
    },
  },
  {
    timestamps: true
  }
);

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model<IUser>('User', userSchema);

export default User; 