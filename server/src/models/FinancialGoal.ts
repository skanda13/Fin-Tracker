import mongoose from 'mongoose';

export interface IFinancialGoal {
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  notes?: string;
  userId: mongoose.Schema.Types.ObjectId;
}

const financialGoalSchema = new mongoose.Schema<IFinancialGoal>(
  {
    name: {
      type: String,
      required: [true, 'Goal name is required'],
      trim: true,
    },
    targetAmount: {
      type: Number,
      required: [true, 'Target amount is required'],
      min: [0, 'Target amount cannot be negative'],
    },
    currentAmount: {
      type: Number,
      default: 0,
      min: [0, 'Current amount cannot be negative'],
    },
    deadline: {
      type: Date,
      required: [true, 'Deadline is required'],
    },
    notes: {
      type: String,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const FinancialGoal = mongoose.model<IFinancialGoal>('FinancialGoal', financialGoalSchema);

export default FinancialGoal; 