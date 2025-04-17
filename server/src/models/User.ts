import mongoose from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password: string;
  settings?: {
    currency: string;
    theme: string;
    dateFormat: string;
  };
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function(email: string) {
          return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
        },
        message: 'Please enter a valid email address'
      }
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password should be at least 6 characters'],
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
    timestamps: true,
  }
);

const User = mongoose.model<IUser>('User', userSchema);

export default User; 