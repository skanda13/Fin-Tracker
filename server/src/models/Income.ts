import mongoose from 'mongoose';

export interface IIncome {
  source: string;
  amount: number;
  date: Date;
  category: string;
  notes?: string;
  userId: mongoose.Schema.Types.ObjectId;
}

const incomeSchema = new mongoose.Schema<IIncome>(
  {
    source: {
      type: String,
      required: [true, 'Income source is required'],
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
      enum: ['Employment', 'Self-employment', 'Investments', 'Rental', 'Other'],
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

const Income = mongoose.model<IIncome>('Income', incomeSchema);

export default Income; 