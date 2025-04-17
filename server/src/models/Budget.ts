import mongoose from 'mongoose';

export interface IBudget {
  category: string;
  month: string;
  budgetAmount: number;
  actualAmount: number;
  notes?: string;
  userId: mongoose.Schema.Types.ObjectId;
}

const budgetSchema = new mongoose.Schema<IBudget>(
  {
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Housing', 'Food', 'Transportation', 'Entertainment', 'Utilities', 'Healthcare', 'Personal', 'Education', 'Savings', 'Other'],
      default: 'Other',
    },
    month: {
      type: String,
      required: [true, 'Month is required'],
      validate: {
        validator: function(month: string) {
          // Format should be "Month YYYY"
          return /^(January|February|March|April|May|June|July|August|September|October|November|December) \d{4}$/.test(month);
        },
        message: "Month must be in the format 'Month YYYY', e.g., 'January 2023'"
      }
    },
    budgetAmount: {
      type: Number,
      required: [true, 'Budget amount is required'],
      min: [0, 'Budget amount cannot be negative'],
    },
    actualAmount: {
      type: Number,
      default: 0,
      min: [0, 'Actual amount cannot be negative'],
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

// Create a compound index to ensure no duplicate budgets for the same category and month per user
budgetSchema.index({ category: 1, month: 1, userId: 1 }, { unique: true });

const Budget = mongoose.model<IBudget>('Budget', budgetSchema);

export default Budget; 