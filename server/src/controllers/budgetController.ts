import { Request, Response } from 'express';
import Budget from '../models/Budget';
import mongoose from 'mongoose';

// @desc    Get all budgets for a user
// @route   GET /api/budgets
// @access  Private
export const getBudgets = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    
    // Filter by month if provided
    const month = req.query.month as string;
    const filter: any = { userId };
    
    if (month) {
      filter.month = month;
    }
    
    const budgets = await Budget.find(filter).sort({ category: 1 });
    
    res.status(200).json(budgets);
  } catch (error) {
    console.error('Error fetching budgets:', error);
    res.status(500).json({ message: 'Server error', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

// @desc    Get single budget by ID
// @route   GET /api/budgets/:id
// @access  Private
export const getBudgetById = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    
    const budget = await Budget.findOne({ 
      _id: req.params.id,
      userId 
    });
    
    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }
    
    res.status(200).json(budget);
  } catch (error) {
    console.error('Error fetching budget:', error);
    res.status(500).json({ message: 'Server error', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

// @desc    Create a new budget
// @route   POST /api/budgets
// @access  Private
export const createBudget = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    
    const { category, month, budgetAmount, actualAmount, notes } = req.body;
    
    // Check if a budget for this category and month already exists
    const existingBudget = await Budget.findOne({
      category,
      month,
      userId
    });
    
    if (existingBudget) {
      return res.status(400).json({ message: 'A budget for this category and month already exists' });
    }
    
    const budget = await Budget.create({
      category,
      month,
      budgetAmount,
      actualAmount: actualAmount || 0,
      notes,
      userId
    });
    
    res.status(201).json(budget);
  } catch (error) {
    console.error('Error creating budget:', error);
    res.status(500).json({ message: 'Server error', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

// @desc    Update a budget
// @route   PUT /api/budgets/:id
// @access  Private
export const updateBudget = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    
    const { category, month, budgetAmount, actualAmount, notes } = req.body;
    
    const budget = await Budget.findOne({ 
      _id: req.params.id,
      userId
    });
    
    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }
    
    // If changing category or month, check for existing budget
    if ((category && category !== budget.category) || (month && month !== budget.month)) {
      const existingBudget = await Budget.findOne({
        category: category || budget.category,
        month: month || budget.month,
        userId,
        _id: { $ne: budget._id }
      });
      
      if (existingBudget) {
        return res.status(400).json({ message: 'A budget for this category and month already exists' });
      }
    }
    
    budget.category = category || budget.category;
    budget.month = month || budget.month;
    budget.budgetAmount = budgetAmount !== undefined ? budgetAmount : budget.budgetAmount;
    budget.actualAmount = actualAmount !== undefined ? actualAmount : budget.actualAmount;
    budget.notes = notes !== undefined ? notes : budget.notes;
    
    await budget.save();
    
    res.status(200).json(budget);
  } catch (error) {
    console.error('Error updating budget:', error);
    res.status(500).json({ message: 'Server error', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

// @desc    Update actual amount in a budget
// @route   PATCH /api/budgets/:id/actual
// @access  Private
export const updateActualAmount = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    
    const { actualAmount } = req.body;
    
    if (actualAmount === undefined) {
      return res.status(400).json({ message: 'Actual amount is required' });
    }
    
    const budget = await Budget.findOne({ 
      _id: req.params.id,
      userId
    });
    
    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }
    
    budget.actualAmount = actualAmount;
    await budget.save();
    
    res.status(200).json(budget);
  } catch (error) {
    console.error('Error updating budget actual amount:', error);
    res.status(500).json({ message: 'Server error', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

// @desc    Delete a budget
// @route   DELETE /api/budgets/:id
// @access  Private
export const deleteBudget = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    
    const budget = await Budget.findOneAndDelete({ 
      _id: req.params.id,
      userId
    });
    
    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }
    
    res.status(200).json({ message: 'Budget removed' });
  } catch (error) {
    console.error('Error deleting budget:', error);
    res.status(500).json({ message: 'Server error', error: error instanceof Error ? error.message : 'Unknown error' });
  }
}; 