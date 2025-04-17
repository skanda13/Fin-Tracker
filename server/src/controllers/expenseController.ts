import { Request, Response } from 'express';
import Expense from '../models/Expense';
import mongoose from 'mongoose';

// @desc    Get all expenses for a user
// @route   GET /api/expenses
// @access  Private
export const getExpenses = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    
    const expenses = await Expense.find({ userId }).sort({ date: -1 });
    
    res.status(200).json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ message: 'Server error', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

// @desc    Get single expense by ID
// @route   GET /api/expenses/:id
// @access  Private
export const getExpenseById = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    
    const expense = await Expense.findOne({ 
      _id: req.params.id,
      userId 
    });
    
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    
    res.status(200).json(expense);
  } catch (error) {
    console.error('Error fetching expense:', error);
    res.status(500).json({ message: 'Server error', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

// @desc    Create a new expense
// @route   POST /api/expenses
// @access  Private
export const createExpense = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    
    const { description, amount, date, category, paymentMethod, notes } = req.body;
    
    const expense = await Expense.create({
      description,
      amount,
      date: date || new Date(),
      category,
      paymentMethod,
      notes,
      userId
    });
    
    res.status(201).json(expense);
  } catch (error) {
    console.error('Error creating expense:', error);
    res.status(500).json({ message: 'Server error', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

// @desc    Update an expense
// @route   PUT /api/expenses/:id
// @access  Private
export const updateExpense = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    
    const { description, amount, date, category, paymentMethod, notes } = req.body;
    
    const expense = await Expense.findOne({ 
      _id: req.params.id,
      userId
    });
    
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    
    expense.description = description || expense.description;
    expense.amount = amount || expense.amount;
    expense.date = date ? new Date(date) : expense.date;
    expense.category = category || expense.category;
    expense.paymentMethod = paymentMethod || expense.paymentMethod;
    expense.notes = notes !== undefined ? notes : expense.notes;
    
    await expense.save();
    
    res.status(200).json(expense);
  } catch (error) {
    console.error('Error updating expense:', error);
    res.status(500).json({ message: 'Server error', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

// @desc    Delete an expense
// @route   DELETE /api/expenses/:id
// @access  Private
export const deleteExpense = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    
    const expense = await Expense.findOneAndDelete({ 
      _id: req.params.id,
      userId
    });
    
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    
    res.status(200).json({ message: 'Expense removed' });
  } catch (error) {
    console.error('Error deleting expense:', error);
    res.status(500).json({ message: 'Server error', error: error instanceof Error ? error.message : 'Unknown error' });
  }
}; 