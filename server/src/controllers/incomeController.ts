import { Request, Response } from 'express';
import Income from '../models/Income';

// Get all incomes for the authenticated user
export const getIncomes = async (req: Request, res: Response) => {
  try {
    const incomes = await Income.find({ userId: req.user._id });
    res.status(200).json(incomes);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching incomes', error: error.message });
  }
};

// Get a single income by ID
export const getIncomeById = async (req: Request, res: Response) => {
  try {
    const income = await Income.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!income) {
      return res.status(404).json({ message: 'Income not found' });
    }

    res.status(200).json(income);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching income', error: error.message });
  }
};

// Create a new income
export const createIncome = async (req: Request, res: Response) => {
  try {
    const { name, amount, date, category, notes } = req.body;

    if (!name || !amount || !date) {
      return res.status(400).json({ message: 'Name, amount, and date are required' });
    }

    const income = new Income({
      name,
      amount,
      date,
      category,
      notes,
      userId: req.user._id
    });

    const savedIncome = await income.save();
    res.status(201).json(savedIncome);
  } catch (error: any) {
    res.status(500).json({ message: 'Error creating income', error: error.message });
  }
};

// Update an income
export const updateIncome = async (req: Request, res: Response) => {
  try {
    const { name, amount, date, category, notes } = req.body;

    const income = await Income.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!income) {
      return res.status(404).json({ message: 'Income not found' });
    }

    income.name = name || income.name;
    income.amount = amount || income.amount;
    income.date = date || income.date;
    income.category = category || income.category;
    income.notes = notes || income.notes;

    const updatedIncome = await income.save();
    res.status(200).json(updatedIncome);
  } catch (error: any) {
    res.status(500).json({ message: 'Error updating income', error: error.message });
  }
};

// Delete an income
export const deleteIncome = async (req: Request, res: Response) => {
  try {
    const income = await Income.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!income) {
      return res.status(404).json({ message: 'Income not found' });
    }

    await income.deleteOne();
    res.status(200).json({ message: 'Income deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: 'Error deleting income', error: error.message });
  }
}; 