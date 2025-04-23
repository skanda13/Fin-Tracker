import mongoose, { Document, Schema } from 'mongoose';

export interface IGoal extends Document {
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  notes?: string;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const goalSchema = new Schema<IGoal>(
  {
    name: {
      type: String,
      required: [true, 'Goal name is required'],
      trim: true
    },
    targetAmount: {
      type: Number,
      required: [true, 'Target amount is required'],
      min: [0, 'Target amount cannot be negative']
    },
    currentAmount: {
      type: Number,
      default: 0,
      min: [0, 'Current amount cannot be negative']
    },
    deadline: {
      type: Date,
      required: [true, 'Deadline is required']
    },
    notes: {
      type: String,
      trim: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IGoal>('Goal', goalSchema); 