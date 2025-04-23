import { Request, Response } from 'express';
import Expense from '../models/Expense';

// @desc    Get all expenses for a user
// @route   GET /api/expenses
// @access  Private
export const getExpenses = async (req: Request, res: Response) => {
  try {
    console.log('Fetching expenses for user:', req.user._id);
    const expenses = await Expense.find({ userId: req.user._id }).sort({ date: -1 });
    console.log('Found expenses:', expenses.length);
    res.status(200).json(expenses);
  } catch (error: any) {
    console.error('Error in getExpenses:', error);
    res.status(500).json({ message: 'Error fetching expenses', error: error.message });
  }
};

// @desc    Get single expense by ID
// @route   GET /api/expenses/:id
// @access  Private
export const getExpenseById = async (req: Request, res: Response) => {
  try {
    console.log('Fetching expense by ID:', req.params.id, 'for user:', req.user._id);
    const expense = await Expense.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!expense) {
      console.log('Expense not found');
      return res.status(404).json({ message: 'Expense not found' });
    }

    console.log('Found expense:', expense);
    res.status(200).json(expense);
  } catch (error: any) {
    console.error('Error in getExpenseById:', error);
    res.status(500).json({ message: 'Error fetching expense', error: error.message });
  }
};

// @desc    Create a new expense
// @route   POST /api/expenses
// @access  Private
export const createExpense = async (req: Request, res: Response) => {
  try {
    console.log('Creating expense with data:', req.body);
    const { source, name, amount, date, category, notes } = req.body;

    // Use source if name is not provided
    const expenseName = name || source;

    if (!expenseName || !amount || !date) {
      console.log('Missing required fields:', { name: expenseName, amount, date });
      return res.status(400).json({ 
        message: 'Name/Source, amount, and date are required',
        received: { name: expenseName, amount, date }
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

    const expense = new Expense({
      name: expenseName,
      amount: numericAmount,
      date: validDate,
      category,
      notes,
      userId: req.user._id
    });

    console.log('Attempting to save expense:', expense);
    const savedExpense = await expense.save();
    console.log('Expense saved successfully:', savedExpense);
    res.status(201).json(savedExpense);
  } catch (error: any) {
    console.error('Error in createExpense:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: Object.values(error.errors).map((err: any) => err.message)
      });
    }
    res.status(500).json({ message: 'Error creating expense', error: error.message });
  }
};

// @desc    Update an expense
// @route   PUT /api/expenses/:id
// @access  Private
export const updateExpense = async (req: Request, res: Response) => {
  try {
    console.log('Updating expense:', req.params.id, 'with data:', req.body);
    const { source, name, amount, date, category, notes } = req.body;

    const expense = await Expense.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!expense) {
      console.log('Expense not found');
      return res.status(404).json({ message: 'Expense not found' });
    }

    // Only update fields that are provided
    if (name || source) expense.name = name || source;
    if (amount !== undefined) {
      const numericAmount = Number(amount);
      if (isNaN(numericAmount) || numericAmount < 0) {
        return res.status(400).json({ message: 'Amount must be a positive number' });
      }
      expense.amount = numericAmount;
    }
    if (date) {
      const validDate = new Date(date);
      if (isNaN(validDate.getTime())) {
        return res.status(400).json({ message: 'Invalid date format' });
      }
      expense.date = validDate;
    }
    if (category !== undefined) expense.category = category;
    if (notes !== undefined) expense.notes = notes;

    console.log('Saving updated expense:', expense);
    const updatedExpense = await expense.save();
    console.log('Expense updated successfully:', updatedExpense);
    res.status(200).json(updatedExpense);
  } catch (error: any) {
    console.error('Error in updateExpense:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: Object.values(error.errors).map((err: any) => err.message)
      });
    }
    res.status(500).json({ message: 'Error updating expense', error: error.message });
  }
};

// @desc    Delete an expense
// @route   DELETE /api/expenses/:id
// @access  Private
export const deleteExpense = async (req: Request, res: Response) => {
  try {
    console.log('Deleting expense:', req.params.id, 'for user:', req.user._id);
    const expense = await Expense.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!expense) {
      console.log('Expense not found');
      return res.status(404).json({ message: 'Expense not found' });
    }

    await expense.deleteOne();
    console.log('Expense deleted successfully');
    res.status(200).json({ message: 'Expense deleted successfully', id: req.params.id });
  } catch (error: any) {
    console.error('Error in deleteExpense:', error);
    res.status(500).json({ message: 'Error deleting expense', error: error.message });
  }
}; 