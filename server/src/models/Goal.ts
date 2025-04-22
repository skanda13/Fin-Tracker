import mongoose, { Document, Schema } from 'mongoose';

export interface IGoal extends Document {
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: Date;
  category?: string;
  notes?: string;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const goalSchema = new Schema<IGoal>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name for the goal'],
      trim: true
    },
    targetAmount: {
      type: Number,
      required: [true, 'Please provide a target amount'],
      min: [0, 'Target amount cannot be negative']
    },
    currentAmount: {
      type: Number,
      default: 0,
      min: [0, 'Current amount cannot be negative']
    },
    targetDate: {
      type: Date,
      required: [true, 'Please provide a target date']
    },
    category: {
      type: String,
      trim: true
    },
    notes: {
      type: String,
      trim: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IGoal>('Goal', goalSchema); 