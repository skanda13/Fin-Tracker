import { Request, Response } from 'express';
import Income from '../models/Income';
import mongoose from 'mongoose';

// @desc    Get all incomes for a user
// @route   GET /api/incomes
// @access  Private
export const getIncomes = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    
    const incomes = await Income.find({ userId }).sort({ date: -1 });
    
    res.status(200).json(incomes);
  } catch (error) {
    console.error('Error fetching incomes:', error);
    res.status(500).json({ message: 'Server error', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

// @desc    Get single income by ID
// @route   GET /api/incomes/:id
// @access  Private
export const getIncomeById = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    
    const income = await Income.findOne({ 
      _id: req.params.id,
      userId 
    });
    
    if (!income) {
      return res.status(404).json({ message: 'Income not found' });
    }
    
    res.status(200).json(income);
  } catch (error) {
    console.error('Error fetching income:', error);
    res.status(500).json({ message: 'Server error', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

// @desc    Create a new income
// @route   POST /api/incomes
// @access  Private
export const createIncome = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    
    const { source, amount, date, category, notes } = req.body;
    
    const income = await Income.create({
      source,
      amount,
      date: date || new Date(),
      category,
      notes,
      userId
    });
    
    res.status(201).json(income);
  } catch (error) {
    console.error('Error creating income:', error);
    res.status(500).json({ message: 'Server error', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

// @desc    Update an income
// @route   PUT /api/incomes/:id
// @access  Private
export const updateIncome = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    
    const { source, amount, date, category, notes } = req.body;
    
    const income = await Income.findOne({ 
      _id: req.params.id,
      userId
    });
    
    if (!income) {
      return res.status(404).json({ message: 'Income not found' });
    }
    
    income.source = source || income.source;
    income.amount = amount || income.amount;
    income.date = date ? new Date(date) : income.date;
    income.category = category || income.category;
    income.notes = notes !== undefined ? notes : income.notes;
    
    await income.save();
    
    res.status(200).json(income);
  } catch (error) {
    console.error('Error updating income:', error);
    res.status(500).json({ message: 'Server error', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

// @desc    Delete an income
// @route   DELETE /api/incomes/:id
// @access  Private
export const deleteIncome = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    
    const income = await Income.findOneAndDelete({ 
      _id: req.params.id,
      userId
    });
    
    if (!income) {
      return res.status(404).json({ message: 'Income not found' });
    }
    
    res.status(200).json({ message: 'Income removed' });
  } catch (error) {
    console.error('Error deleting income:', error);
    res.status(500).json({ message: 'Server error', error: error instanceof Error ? error.message : 'Unknown error' });
  }
}; 