import { Request, Response } from 'express';
import Income from '../models/Income';

// Get all incomes for the authenticated user
export const getIncomes = async (req: Request, res: Response) => {
  try {
    console.log('Fetching incomes for user:', req.user._id);
    const incomes = await Income.find({ userId: req.user._id }).sort({ date: -1 });
    console.log('Found incomes:', incomes.length);
    res.status(200).json(incomes);
  } catch (error: any) {
    console.error('Error in getIncomes:', error);
    res.status(500).json({ message: 'Error fetching incomes', error: error.message });
  }
};

// Get a single income by ID
export const getIncomeById = async (req: Request, res: Response) => {
  try {
    console.log('Fetching income by ID:', req.params.id, 'for user:', req.user._id);
    const income = await Income.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!income) {
      console.log('Income not found');
      return res.status(404).json({ message: 'Income not found' });
    }

    console.log('Found income:', income);
    res.status(200).json(income);
  } catch (error: any) {
    console.error('Error in getIncomeById:', error);
    res.status(500).json({ message: 'Error fetching income', error: error.message });
  }
};

// Create a new income
export const createIncome = async (req: Request, res: Response) => {
  try {
    console.log('Creating income with data:', req.body);
    const { name, amount, date, category, notes } = req.body;

    if (!name || !amount || !date) {
      console.log('Missing required fields:', { name, amount, date });
      return res.status(400).json({ 
        message: 'Name, amount, and date are required',
        received: { name, amount, date }
      });
    }

    // Validate amount is a number and positive
    const numericAmount = Number(amount);
    if (isNaN(numericAmount) || numericAmount < 0) {
      console.log('Invalid amount:', amount);
      return res.status(400).json({ 
        message: 'Amount must be a positive number',
        received: amount
      });
    }

    // Validate date is a valid date
    const validDate = new Date(date);
    if (isNaN(validDate.getTime())) {
      console.log('Invalid date:', date);
      return res.status(400).json({ 
        message: 'Invalid date format',
        received: date
      });
    }

    const income = new Income({
      name,
      amount: numericAmount,
      date: validDate,
      category,
      notes,
      userId: req.user._id
    });

    console.log('Attempting to save income:', income);
    const savedIncome = await income.save();
    console.log('Income saved successfully:', savedIncome);
    res.status(201).json(savedIncome);
  } catch (error: any) {
    console.error('Error in createIncome:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: Object.values(error.errors).map((err: any) => err.message)
      });
    }
    res.status(500).json({ message: 'Error creating income', error: error.message });
  }
};

// Update an income
export const updateIncome = async (req: Request, res: Response) => {
  try {
    console.log('Updating income:', req.params.id, 'with data:', req.body);
    const { name, amount, date, category, notes } = req.body;

    const income = await Income.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!income) {
      console.log('Income not found');
      return res.status(404).json({ message: 'Income not found' });
    }

    // Only update fields that are provided
    if (name) income.name = name;
    if (amount !== undefined) {
      const numericAmount = Number(amount);
      if (isNaN(numericAmount) || numericAmount < 0) {
        return res.status(400).json({ message: 'Amount must be a positive number' });
      }
      income.amount = numericAmount;
    }
    if (date) {
      const validDate = new Date(date);
      if (isNaN(validDate.getTime())) {
        return res.status(400).json({ message: 'Invalid date format' });
      }
      income.date = validDate;
    }
    if (category !== undefined) income.category = category;
    if (notes !== undefined) income.notes = notes;

    console.log('Saving updated income:', income);
    const updatedIncome = await income.save();
    console.log('Income updated successfully:', updatedIncome);
    res.status(200).json(updatedIncome);
  } catch (error: any) {
    console.error('Error in updateIncome:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: Object.values(error.errors).map((err: any) => err.message)
      });
    }
    res.status(500).json({ message: 'Error updating income', error: error.message });
  }
};

// Delete an income
export const deleteIncome = async (req: Request, res: Response) => {
  try {
    console.log('Deleting income:', req.params.id, 'for user:', req.user._id);
    const income = await Income.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!income) {
      console.log('Income not found');
      return res.status(404).json({ message: 'Income not found' });
    }

    await income.deleteOne();
    console.log('Income deleted successfully');
    res.status(200).json({ message: 'Income deleted successfully', id: req.params.id });
  } catch (error: any) {
    console.error('Error in deleteIncome:', error);
    res.status(500).json({ message: 'Error deleting income', error: error.message });
  }
}; 