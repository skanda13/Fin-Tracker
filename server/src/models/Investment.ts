import mongoose, { Document } from "mongoose";

export interface IInvestment extends Document {
  name: string;
  amount: number;
  date: Date;
  type: string;
  returns: string;
  notes?: string;
  userId: mongoose.Schema.Types.ObjectId;
}

const investmentSchema = new mongoose.Schema<IInvestment>(
  {
    name: {
      type: String,
      required: [true, "Investment name is required"],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount cannot be negative"],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    type: {
      type: String,
      required: [true, "Type is required"],
      enum: ["Equity", "Debt", "Real Estate", "Gold", "Cryptocurrency", "Fixed Deposit", "Bonds", "Other"],
      default: "Equity",
    },
    returns: {
      type: String,
      required: [true, "Return rate is required"],
    },
    notes: {
      type: String,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Investment = mongoose.model<IInvestment>("Investment", investmentSchema);

export default Investment; 