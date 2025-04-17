import mongoose from 'mongoose';

export interface IExpense {
  description: string;
  amount: number;
  date: Date;
  category: string;
  paymentMethod?: string;
  notes?: string;
  userId: mongoose.Schema.Types.ObjectId;
}

const expenseSchema = new mongoose.Schema<IExpense>(
  {
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [0, 'Amount cannot be negative'],
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
      default: Date.now,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Housing', 'Food', 'Transportation', 'Entertainment', 'Utilities', 'Healthcare', 'Personal', 'Education', 'Savings', 'Other'],
      default: 'Other',
    },
    paymentMethod: {
      type: String,
      enum: ['Cash', 'Credit Card', 'Debit Card', 'UPI', 'Bank Transfer', 'Other'],
      default: 'Other',
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

const Expense = mongoose.model<IExpense>('Expense', expenseSchema);

export default Expense; 