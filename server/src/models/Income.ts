import mongoose, { Document, Schema } from 'mongoose';

export interface IIncome extends Document {
  name: string;
  amount: number;
  date: Date;
  category?: string;
  notes?: string;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const incomeSchema = new Schema<IIncome>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name for the income'],
      trim: true
    },
    amount: {
      type: Number,
      required: [true, 'Please provide an amount'],
      min: [0, 'Amount cannot be negative']
    },
    date: {
      type: Date,
      required: [true, 'Please provide a date']
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

export default mongoose.model<IIncome>('Income', incomeSchema); 