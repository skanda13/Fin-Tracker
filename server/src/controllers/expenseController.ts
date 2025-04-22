import { Request, Response } from 'express';
import Expense from '../models/Expense';

// @desc    Get all expenses for a user
// @route   GET /api/expenses
// @access  Private
export const getExpenses = async (req: Request, res: Response) => {
  try {
    const expenses = await Expense.find({ userId: req.user._id });
    res.status(200).json(expenses);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching expenses', error: error.message });
  }
};

// @desc    Get single expense by ID
// @route   GET /api/expenses/:id
// @access  Private
export const getExpenseById = async (req: Request, res: Response) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.status(200).json(expense);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching expense', error: error.message });
  }
};

// @desc    Create a new expense
// @route   POST /api/expenses
// @access  Private
export const createExpense = async (req: Request, res: Response) => {
  try {
    const { name, amount, date, category, notes } = req.body;

    if (!name || !amount || !date) {
      return res.status(400).json({ message: 'Name, amount, and date are required' });
    }

    const expense = new Expense({
      name,
      amount,
      date,
      category,
      notes,
      userId: req.user._id
    });

    const savedExpense = await expense.save();
    res.status(201).json(savedExpense);
  } catch (error: any) {
    res.status(500).json({ message: 'Error creating expense', error: error.message });
  }
};

// @desc    Update an expense
// @route   PUT /api/expenses/:id
// @access  Private
export const updateExpense = async (req: Request, res: Response) => {
  try {
    const { name, amount, date, category, notes } = req.body;

    const expense = await Expense.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    expense.name = name || expense.name;
    expense.amount = amount || expense.amount;
    expense.date = date || expense.date;
    expense.category = category || expense.category;
    expense.notes = notes || expense.notes;

    const updatedExpense = await expense.save();
    res.status(200).json(updatedExpense);
  } catch (error: any) {
    res.status(500).json({ message: 'Error updating expense', error: error.message });
  }
};

// @desc    Delete an expense
// @route   DELETE /api/expenses/:id
// @access  Private
export const deleteExpense = async (req: Request, res: Response) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    await expense.deleteOne();
    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: 'Error deleting expense', error: error.message });
  }
}; 